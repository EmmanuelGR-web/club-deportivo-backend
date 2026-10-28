# Proyecto Club Deportivo

El proyecto consiste en una pagina y aplicacion web para un club deportivo. En la App digital podremos gestionar: socios, pagos, noticias, disciplinas, eventos, personal y mensajería interna.

## Integrantes
Estudiante: Emmanuel de Jesus Gonzalez Rojas
Comisión: 9

## Tecnologías

- NestJS con base de datos PostgreSQL.

## Cómo correrlo

```bash
npm install
npm run start:dev
```

## Estructura

```
club-deportivo-backend/
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
├── test/
├── nest-cli.json
├── package.json
└── tsconfig.json
```

Por ahora los módulos son solo carpetas, sin código: cada uno tiene `dto/` y `entities/` donde corresponde. El módulo, el controlador y el servicio de cada uno se agregan cuando se programe.

| Carpeta | Contenido |
| --- | --- |
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

## Repositorios anteriores

- Repo 1: [CLUB-DEPORTIVO](https://github.com/EmmanuelGR-web/CLUB-DEPORTIVO), deploy en [cdeportivo.netlify.app](https://cdeportivo.netlify.app).
- Repo 2: [C-DEPORTIVO](https://github.com/EmmanuelGR-web/C-DEPORTIVO), deploy en [c-deportivo.vercel.app](https://c-deportivo.vercel.app).
