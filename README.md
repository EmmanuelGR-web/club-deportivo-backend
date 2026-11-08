# Proyecto Club Deportivo

El proyecto consiste en una pagina y aplicacion web para un club deportivo. En la App digital podremos gestionar: socios, pagos, noticias, disciplinas, eventos, personal y mensajería interna.

Este repositorio es el **backend** (API REST). El frontend está en el [repo 2](https://github.com/EmmanuelGR-web/C-DEPORTIVO).

## Integrantes
Estudiante: Emmanuel de Jesus Gonzalez Rojas
Comisión: 9

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| [NestJS 12](https://nestjs.com) | Framework del backend (API REST) |
| [Prisma 7](https://www.prisma.io) | ORM: define las tablas, crea las migraciones y carga los datos de prueba |
| [PostgreSQL](https://www.postgresql.org) en [Supabase](https://supabase.com) | Base de datos relacional |
| [@nestjs/config](https://docs.nestjs.com/techniques/configuration) | Lectura de las variables de entorno |
| [Postman](https://www.postman.com) | Pruebas de los endpoints |

## Cómo correrlo

```bash
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

1. `npm install`: instala las dependencias.
2. `npx prisma generate`: genera el cliente de Prisma en `src/generated/prisma`
3. `npx prisma migrate dev`: crea las tablas en la base a partir de `prisma/schema.prisma`.
4. `npx prisma db seed`: carga 5 registros de prueba en cada tabla (`prisma/seed.ts`).
5. `npm run start:dev`: levanta la API en `http://localhost:4000`.

Para ver los datos cargados: `npx prisma studio`.

## Estructura

```
club-deportivo-backend/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── main.ts
│   ├── config/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── common/
│   │   ├── decorators/
│   │   ├── enums/
│   │   ├── filters/
│   │   ├── guards/
│   │   └── utils/
│   └── modules/
│       ├── app/
│       ├── auth/
│       ├── users/
│       ├── members/
│       ├── payments/
│       ├── news/
│       ├── disciplines/
│       ├── events/
│       ├── staff/
│       ├── messages/
│       ├── audit-logs/
│       ├── files/
│       └── ai/
├── prisma7.config.ts
├── nest-cli.json
├── package.json
└── tsconfig.json
```

Cada módulo se generó con `npx nest g resource modules/<nombre>` y tiene su `controller`, `service` y `module`, además de `dto/` y `entities/`. Todos están registrados en `AppModule`. Los servicios leen y guardan en la base con Prisma, a través de `PrismaService`.

| Carpeta | Contenido |
| --- | --- |
| `prisma/` | Esquema de la base de datos, migraciones y datos de prueba. |
| `src/config/` | Conexión con la base de datos (`PrismaService`, disponible en todos los módulos). |
| `src/common/` | Decoradores, enums, filtros, guards y utilidades compartidos entre módulos. `filters/` traduce los errores de Prisma a respuestas HTTP (409 dato repetido, 404 no existe, 400 relación inválida). |
| `src/modules/app/` | Módulo raíz que une a todos los demás. |
| `src/modules/auth/` | Registro de socios e inicio de sesión. |
| `src/modules/users/` | Cuentas de usuario y roles. |
| `src/modules/members/` | Alta, datos y estado de los socios. |
| `src/modules/payments/` | Cuotas, pagos y comprobantes. |
| `src/modules/news/` | Noticias del club. |
| `src/modules/disciplines/` | Disciplinas deportivas, como información para la página. |
| `src/modules/events/` | Calendario de eventos. |
| `src/modules/staff/` | Personal del club y control de jornadas. |
| `src/modules/messages/` | Mensajería interna entre socios y personal. |
| `src/modules/audit-logs/` | Auditoría de las modificaciones. |
| `src/modules/files/` | Fotos, documentos de identidad y comprobantes. |
| `src/modules/ai/` | Lectura de documentos con Gemini. |

## Base de datos

La base tiene 12 tablas, definidas en [`prisma/schema.prisma`](prisma/schema.prisma) y normalizadas hasta la tercera forma normal (3FN). Todas usan `id` autoincremental como clave primaria y tienen al menos 5 registros de prueba.

| Tabla | Columnas principales | Claves foráneas |
| --- | --- | --- |
| `disciplines` | nombre (único), descripcion, imagen, categorias, dias | — |
| `payment_methods` | nombre (único) | — |
| `news_categories` | nombre (único) | — |
| `users` | nombre, email (único), contrasena, rol, bloqueado, creadoEn | — |
| `members` | numeroSocio (único), dni (único), telefono, direccion, fechaNacimiento, estado, fechaAlta | `userId` → users (único), `paymentMethodId` → payment_methods |
| `payments` | concepto, monto, fecha, estado, recargo, comprobante | `memberId` → members, `paymentMethodId` → payment_methods |
| `news` | titulo, resumen, cuerpo, imagen, fecha | `userId` → users, `newsCategoryId` → news_categories |
| `events` | titulo, descripcion, fecha, lugar | `disciplineId` → disciplines |
| `staff` | cargo, telefono | `userId` → users (único) |
| `messages` | texto, fecha, leido | `remitenteId` → users, `destinatarioId` → users |
| `audit_logs` | accion, tabla, fecha | `userId` → users |
| `files` | nombre, url, tipo, fecha | `userId` → users |

Cómo se cumple la 3FN:

- El nombre y el email de socios y personal se guardan solo en `users`; `members` y `staff` los toman por `userId`. Así un dato no queda repetido en dos tablas.
- Los medios de pago y las categorías de noticias tienen su propia tabla, y las demás tablas guardan solo su `id`.
- La categoría del socio no se guarda: se calcula con la antigüedad desde `fechaAlta` (Bronce hasta 2 años, Plata de 2 a 10 y Oro más de 10). Guardarla sería repetir un dato que ya sale de otro.
- La cuota mensual es la misma para todos los socios ($15.000). Las disciplinas son solo informativas: se muestran en la sección de deportes de la página y no se cobran aparte.

Valores permitidos (enums):

- `rol`: `admin`, `personal`, `socio`
- `estado` del socio: `activo`, `moroso`, `baja`
- `estado` del pago: `pagado`, `pendiente`, `vencido`

Las contraseñas se guardan cifradas con bcrypt y ninguna respuesta de la API las devuelve. Usuarios de prueba del seed: `admin@clubsanmartin.com` / `admin123`, `mdiaz@clubsanmartin.com` / `personal123` y `jperez@gmail.com` / `socio123`.

Reglas al borrar:

- Al borrar un socio se borran sus pagos (`Cascade`).
- No se puede borrar un medio de pago o una categoría de noticias que estén en uso (`Restrict`).
- Al borrar una disciplina se borran sus eventos (`Cascade`).
- No se puede borrar un usuario que tenga ficha de socio o de personal, ni uno que sea autor de noticias (`Restrict`).
- Al borrar un usuario se borran sus mensajes y archivos (`Cascade`), y su registro de cambios queda sin usuario asociado (`SetNull`).

## Endpoints

URL base: `http://localhost:4000`

| Recurso | Ruta |
| --- | --- |
| Usuarios | `/usuarios` |
| Socios | `/socios` |
| Pagos | `/pagos` |
| Noticias | `/noticias` |
| Disciplinas | `/disciplinas` |
| Eventos | `/eventos` |
| Personal | `/personal` |
| Mensajes | `/mensajes` |
| Registro de cambios | `/registro-cambios` |
| Archivos | `/archivos` |

Cada recurso tiene las 5 operaciones del CRUD. Ejemplo con socios:

| Método | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/socios` | Crea un socio |
| `GET` | `/socios` | Lista todos los socios |
| `GET` | `/socios/:id` | Trae un socio por su id |
| `PATCH` | `/socios/:id` | Modifica un socio |
| `DELETE` | `/socios/:id` | Elimina un socio |

Rutas extra:

| Método | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/autenticacion/registro` | Crea el usuario y su ficha de socio juntos (nombre, email, contrasena, dni, telefono, direccion, fechaNacimiento, paymentMethodId) |
| `POST` | `/autenticacion/login` | Recibe email y contrasena; devuelve el usuario con su ficha de socio o de personal |
| `GET` | `/noticias/categorias` | Lista las categorías de noticias |
| `GET` | `/pagos/medios-pago` | Lista los medios de pago |

Los datos se validan con `class-validator`: si algo está mal, la API responde `400` con un mensaje por cada campo. Los campos que no están en el DTO se descartan. CORS está habilitado para que el front (repo 2) pueda consumir la API.

## Repositorios anteriores

- Repo 1: [CLUB-DEPORTIVO](https://github.com/EmmanuelGR-web/CLUB-DEPORTIVO), deploy en [cdeportivo.netlify.app](https://cdeportivo.netlify.app).
- Repo 2: [C-DEPORTIVO](https://github.com/EmmanuelGR-web/C-DEPORTIVO), deploy en [c-deportivo.vercel.app](https://c-deportivo.vercel.app).
