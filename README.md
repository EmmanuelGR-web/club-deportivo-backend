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
│   ├── common/
│   │   ├── decorators/
│   │   ├── enums/
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

Cada módulo se generó con `npx nest g resource modules/<nombre>` y tiene su `controller`, `service` y `module`, además de `dto/` y `entities/`. Todos están registrados en `AppModule`. Por ahora los servicios devuelven respuestas de prueba

| Carpeta | Contenido |
| --- | --- |
| `prisma/` | Esquema de la base de datos, migraciones y datos de prueba. |
| `src/config/` | Configuración de la aplicación y de la base de datos. |
| `src/common/` | Decoradores, enums, guards y utilidades compartidos entre módulos. |
| `src/modules/app/` | Módulo raíz que une a todos los demás. |
| `src/modules/auth/` | Inicio de sesión y estrategias de autenticación. |
| `src/modules/users/` | Cuentas de usuario y roles. |
| `src/modules/members/` | Alta, datos y estado de los socios. |
| `src/modules/payments/` | Cuotas, pagos y comprobantes. |
| `src/modules/news/` | Noticias del club. |
| `src/modules/disciplines/` | Disciplinas deportivas. |
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
| `disciplines` | nombre (único), descripcion, cuotaMensual | — |
| `payment_methods` | nombre (único) | — |
| `news_categories` | nombre (único) | — |
| `users` | nombre, email (único), contrasena, rol, bloqueado, creadoEn | — |
| `members` | numeroSocio (único), dni (único), estado, fechaAlta | `userId` → users (único), `disciplineId` → disciplines, `paymentMethodId` → payment_methods |
| `payments` | concepto, monto, fecha, estado, recargo, comprobante | `memberId` → members, `paymentMethodId` → payment_methods |
| `news` | titulo, resumen, cuerpo, imagen, fecha | `userId` → users, `newsCategoryId` → news_categories |
| `events` | titulo, descripcion, fecha, lugar | `disciplineId` → disciplines |
| `staff` | cargo, telefono | `userId` → users (único), `disciplineId` → disciplines |
| `messages` | texto, fecha, leido | `remitenteId` → users, `destinatarioId` → users |
| `audit_logs` | accion, tabla, fecha | `userId` → users |
| `files` | nombre, url, tipo, fecha | `userId` → users |

Cómo se cumple la 3FN:

- El nombre y el email de socios y personal se guardan solo en `users`; `members` y `staff` los toman por `userId`. Así un dato no queda repetido en dos tablas.
- Los medios de pago y las categorías de noticias tienen su propia tabla, y las demás tablas guardan solo su `id`.
- La categoría del socio no se guarda: se calcula con la antigüedad desde `fechaAlta` (Bronce hasta 2 años, Plata de 2 a 10 y Oro más de 10). Guardarla sería repetir un dato que ya sale de otro.

Valores permitidos (enums):

- `rol`: `admin`, `personal`, `socio`
- `estado` del socio: `activo`, `moroso`, `baja`
- `estado` del pago: `pagado`, `pendiente`, `vencido`

Reglas al borrar:

- Al borrar un socio se borran sus pagos (`Cascade`).
- No se puede borrar una disciplina que tenga socios (`Restrict`), ni un medio de pago o una categoría de noticias que estén en uso.
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

## Repositorios anteriores

- Repo 1: [CLUB-DEPORTIVO](https://github.com/EmmanuelGR-web/CLUB-DEPORTIVO), deploy en [cdeportivo.netlify.app](https://cdeportivo.netlify.app).
- Repo 2: [C-DEPORTIVO](https://github.com/EmmanuelGR-web/C-DEPORTIVO), deploy en [c-deportivo.vercel.app](https://c-deportivo.vercel.app).
