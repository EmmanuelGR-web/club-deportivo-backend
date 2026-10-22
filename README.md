# Club Deportivo

Sistema de gestión de un club deportivo: socios, pagos, noticias, disciplinas, eventos, personal y mensajería interna.

Repositorio 3 de Programación IV. Es un monorepo con el frontend y el backend en carpetas separadas.

## Tecnologías

- **Frontend:** React 19, Vite y React Bootstrap.
- **Backend:** NestJS con base de datos PostgreSQL.

## Estado actual

El repositorio contiene solo la estructura de carpetas y módulos. El código se incorpora en las próximas etapas. Cada carpeta lleva un `.gitkeep` porque git no guarda carpetas vacías.

## Estructura

```
club-deportivo-repo3/
├── frontend/
│   ├── api/
│   ├── public/
│   │   ├── disciplinas/
│   │   └── revista/
│   ├── scripts/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── admin/
│       │   ├── auth/
│       │   ├── common/
│       │   ├── empleado/
│       │   ├── inicio/
│       │   ├── layout/
│       │   └── socio/
│       ├── context/
│       ├── data/
│       ├── hooks/
│       ├── pages/
│       ├── routes/
│       ├── services/
│       ├── styles/
│       └── utils/
└── backend/
    ├── migraciones/
    ├── scripts/
    └── src/
        ├── config/
        ├── comun/
        │   ├── decoradores/
        │   ├── enums/
        │   ├── guards/
        │   └── utilidades/
        └── modulos/
            ├── autenticacion/
            ├── usuarios/
            ├── socios/
            ├── pagos/
            ├── noticias/
            ├── disciplinas/
            ├── eventos/
            ├── personal/
            ├── mensajes/
            ├── registro-cambios/
            ├── archivos/
            └── ia/
```

### Frontend

| Carpeta | Contenido |
| --- | --- |
| `api/` | Funciones serverless de Vercel. |
| `public/` | Imágenes y archivos estáticos (disciplinas y revista digital). |
| `scripts/` | Scripts de carga de datos iniciales. |
| `src/assets/` | Recursos importados desde los componentes. |
| `src/components/` | Componentes agrupados por sección: administración, autenticación, comunes, empleado, inicio, layout y socio. |
| `src/context/` | Contexto de la sesión del usuario. |
| `src/data/` | Datos fijos del club. |
| `src/hooks/` | Hooks personalizados. |
| `src/pages/` | Páginas de la aplicación. |
| `src/routes/` | Rutas y rutas protegidas por rol. |
| `src/services/` | Comunicación con la API. |
| `src/styles/` | Estilos globales. |
| `src/utils/` | Funciones auxiliares. |

### Backend

| Carpeta | Contenido |
| --- | --- |
| `migraciones/` | Cambios en la estructura de la base de datos. |
| `scripts/` | Scripts de carga de datos. |
| `src/config/` | Configuración de la aplicación y de la base de datos. |
| `src/comun/` | Decoradores, enums, guards y utilidades compartidos entre módulos. |
| `src/modulos/autenticacion/` | Inicio de sesión y estrategias de autenticación. |
| `src/modulos/usuarios/` | Cuentas de usuario y roles. |
| `src/modulos/socios/` | Alta, datos y estado de los socios. |
| `src/modulos/pagos/` | Cuotas, pagos y comprobantes. |
| `src/modulos/noticias/` | Noticias del club. |
| `src/modulos/disciplinas/` | Disciplinas deportivas. |
| `src/modulos/eventos/` | Calendario de eventos. |
| `src/modulos/personal/` | Personal del club y control de jornadas. |
| `src/modulos/mensajes/` | Mensajería interna entre socios y personal. |
| `src/modulos/registro-cambios/` | Auditoría de las modificaciones. |
| `src/modulos/archivos/` | Fotos, documentos de identidad y comprobantes. |
| `src/modulos/ia/` | Lectura de documentos con Gemini. |


## Repositorios anteriores

- Repo 1: [CLUB-DEPORTIVO](https://github.com/EmmanuelGR-web/CLUB-DEPORTIVO), deploy en [cdeportivo.netlify.app](https://cdeportivo.netlify.app).
- Repo 2: [C-DEPORTIVO](https://github.com/EmmanuelGR-web/C-DEPORTIVO), deploy en [c-deportivo.vercel.app](https://c-deportivo.vercel.app).
