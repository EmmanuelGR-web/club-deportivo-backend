# Proyecto Club Deportivo

El proyecto consiste en una pagina y aplicacion web para un club deportivo. En la App digital podremos gestionar: socios, pagos, noticias, disciplinas, eventos, personal y mensajería interna.

## Integrantes
Estudiante: Emmanuel de Jesus Gonzalez Rojas
Comisión: 9

## Tecnologías

- NestJS con base de datos PostgreSQL.

## Estructura

```
club-deportivo-repo3/
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
