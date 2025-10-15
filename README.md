## Waves — Plataforma de microservicios (Frontend + Backend)

Este repositorio reúne dos partes principales:

- `Back/` — Backend de microservicios (API, conexión a base de datos y gestión de contenedores Docker).
- `Waves/` — Frontend construido con React Vite y TypeScript.

## Descripción del proyecto

Waves es una plataforma para crear, desplegar y gestionar microservicios ligeros desde una interfaz web. El backend se encarga de:

- Autenticación (registro, inicio de sesión, verificación/refresh de tokens).
- Persistencia y consultas a una base de datos (integración con Roble).
- Orquestación de microservicios: genera archivos de proyecto (Código + Dockerfile) en `Back/temp/<service>` y usa Docker (CLI) para construir y ejecutar contenedores en puertos locales. Mantiene las rutas proxy para exponer cada microservicio bajo `/routeName`.

El frontend (directorio `Waves`) ofrece la interfaz para que usuarios registren y desplieguen microservicios, gestionen endpoints y consuman servicios desplegados.

## Diagrama de arquitectura

El siguiente diagrama muestra los componentes principales y cómo se comunican.

```mermaid
flowchart LR
  subgraph User
    U[Usuario (navegador)]
  end

  subgraph Frontend[Waves (React + Vite)]
    FE[Interfaz React]
  end

  subgraph Backend[Back (Node.js/Express)]
    API[API Express]
    Proxy[Proxy dinámico (http-proxy-middleware)]
    ServicesFile[services.json]
    DBAdapter[Adaptador DB (Roble / API externa)]
    DockerSvc[Servicio Docker (docker CLI)]
  end

  subgraph DockerHost[Docker Engine]
    Containers[(Contenedores de microservicios)]
  end

  U -->|Interacción UI| FE
  FE -->|HTTP (axios)| API
  API --> DBAdapter
  API -->|Crea/Elimina contenedores| DockerSvc
  DockerSvc --> DockerHost
  DockerHost -->|Expone servicio en http://localhost:PORT| Proxy
  Proxy -->|Ruta /{routeName}| Containers
  ServicesFile <--|Actualiza rutas| API

```

## Estructura principal del repositorio

- `Back/`
  - `index.js` — Entrypoint del backend (EXPRESS). Define rutas públicas: `/signup`, `/login`, `/logout`, `/verifyToken`, `/refreshToken`, endpoints para `db/*` (read/create/insert/update/delete), `/deploy` y `/ms/delete/:msName`.
  - `package.json` — Dependencias y script `start` (node --watch index.js).
  - `containerConfig.json` — Plantillas de Dockerfile/entry point por lenguaje (Python, JS, C#).
  - `services/` — Lógica interna:
    - `api.js` — cliente axios hacia el proveedor de DB/autenticación (usa `process.env.PROJECT_URL`).
    - `auth.js` — funciones para register/login/logout/verifyToken/refreshToken.
    - `database.js` — funciones para getTable/createTable/insert/update/delete (utilizan PROJECT_ID).
    - `dockerService.js` — crea imágenes y contenedores usando Docker CLI; escribe archivos en `temp/<name>` a partir de `containerConfig.json`.
    - `services.js` — lee/escribe `services.json` (rutas expuestas por proxy) y refresca rutas desde la DB.
  - `temp/` — carpeta donde se crean los archivos temporales de cada microservicio (Dockerfile y código del usuario) antes de construir la imagen Docker.

- `Waves/` (frontend)
  - `package.json` — scripts: `dev` (vite), `build`, `preview`, `lint`.
  - `src/` — código fuente React/TS:
    - `components/` — componentes UI (Navbar, MicroserviceCard, formularios, dialogs, etc.).
    - `context/` — `AuthContext.tsx`, `ThemeContext.tsx`.
    - `hooks/` — `createService.ts`, `updateService.ts`, `ServiceDb.ts` (integración con backend), `parseData.ts`.
    - `lib/` — `types.ts` (tipos TypeScript usados en la app).
    - `pages/` — pantallas: Dashboard, Auth, Microservice, Docs, Help, Home.
  - `public/icons/` — iconos usados en la interfaz.

## Backend (Back) — detalles importantes

Cómo funciona:

- Al arrancar `index.js` carga las rutas almacenadas en `services.json` y mapea cada `routeName` a la URL del microservicio mediante `http-proxy-middleware`.
- Endpoints clave:
  - `/signup`, `/login`, `/logout`, `/verifyToken`, `/refreshToken` — delegan en `services/auth.js` hacia el proveedor `PROJECT_URL`.
  - `/db/*` — operan con `services/database.js` usando `PROJECT_ID` y `process.env.PROJECT_URL`.
  - `/deploy` — recibe `{ msData, accessToken }`, valida, y usa `dockerService.createContainer(routeName, code, language)` para:
    1. Crear la carpeta `Back/temp/<routeName>`.
    2. Escribir `Dockerfile` y el código del usuario (entry point).
    3. Ejecutar `docker build` y `docker run -d -p <port>:5000 --name <name>_c <image>`.
    4. Guardar la URL/puerto y escribir la entrada en la tabla `microservice` (a través de `/db/insert`).

Requisitos y recomendaciones:

- Docker Engine (o Docker Desktop) debe estar instalado y corriendo localmente. Si Docker no está activo, `dockerService.createContainer` lanzará un error con status 503.
- Variables de entorno importantes (archivo `.env` en `Back/`):
  - `PROJECT_URL` — URL base del proveedor de DB/auth (usado por `services/api.js`).
  - `PROJECT_ID` — identificador del proyecto en el proveedor (usado por `auth.js` y `database.js`).
  - `PORT` — puerto en el que correrá el backend (por defecto 3000).

- `containerConfig.json` contiene las plantillas de Dockerfile y el nombre del archivo entry point por lenguaje soportado (`Python`, `JS`, `C#`). Si se agrega un nuevo lenguaje, debe actualizarse esta configuración.

Seguridad y limpieza:

- Los tokens se validan en varios endpoints (ej. `/db/*`, `/deploy`) mediante `verifyToken`.
- Cuando se produce un error durante el deploy, el backend intenta eliminar el contenedor y la imagen creada.

## Tabla Microservice

- Microservice es la tabla modelo en la que se basa el proyecto. Esta conformada por las siguientes columnas:

<_id, varchar>
<routeName, varchar>
<url, varchar>
<status, varchar>
<description, varchar>
<language, varchar>
<endPoints, Json>
<code, varchar>
<createdAt, date>
<updatedAt, date>


## Frontend (Waves) — detalles importantes

Stack: React + TypeScript + Vite.

Puntos clave:

- El frontend consume el backend en `http://localhost:3000` (se usa esa URL directamente en varias llamadas fetch en `src/hooks/ServiceDb.ts`).
- Hooks principales:
  - `createService.ts` / `updateService.ts` — preparan y envían los datos del microservicio al endpoint `/deploy` o `/db/update`.
  - `ServiceDb.ts` — funciones para listar, crear, desplegar y eliminar microservicios. Internamente usa llamadas a `http://localhost:3000/db/*` y `/deploy`.
  - `parseData.ts` — transforma el formato del código y endpoints antes de enviar al backend.

Variables/Configuración del frontend:

- Actualmente muchas rutas están codificadas hacia `http://localhost:3000`. Si deseas cambiar el host del backend, actualiza las URLs en `src/hooks/ServiceDb.ts` o crea variables de entorno y reemplaza las llamadas por `import.meta.env.VITE_API_URL`.

## Cómo ejecutar el proyecto (local)/*/*/**/*/*/*/*

Requisitos previos:

- Node.js ( recomendado >= 18 ) y npm.
- Docker Desktop o Docker Engine instalado y corriendo.

Pasos rápidos (Windows cmd.exe):

  1) Ejecutar el backend

  ```cmd
  cd Back
  npm install
  rem Crear un archivo .env con PROJECT_URL, PROJECT_ID y opcionalmente PORT
  npm run start
  ```

  2) Ejecutar el frontend

  ```cmd
  cd Waves
  npm install
  npm run dev
  ```


## Diagrama de despliegue y ciclo de vida de un microservicio

1. Usuario crea/define un microservicio desde la UI.
2. Frontend llama a `/deploy`.
3. Backend valida token y escribe los archivos en `Back/temp/<routeName>` usando la plantilla correspondiente.
4. Backend ejecuta `docker build` y `docker run` para exponer el servicio en `http://localhost:<port>`.
5. Backend inserta el registro en la tabla `microservice` y actualiza `services.json`.
6. El proxy dinámico mapea `/routeName` a la URL del contenedor.

## Troubleshooting (problemas comunes)

- Docker no responde: comprueba que Docker Desktop esté abierto y que `docker info` funcione en tu terminal.
- Puerto en uso: `dockerService` elige un puerto libre entre 5000–8000; si falla el run, revisa conflictos de puertos.
- Errores con la API externa (Roble / PROJECT_URL): revisa `PROJECT_URL` y `PROJECT_ID` en `.env`.

## Siguientes pasos y mejoras recomendadas

- Externalizar las URLs del frontend en variables de entorno (`VITE_API_URL`).
- Añadir autenticación segura y renovación de tokens en el frontend (actualmente el token se almacena en localStorage).
- Añadir tests automáticos para backend (endpoints) y frontend (componentes y hooks).
- Controlar cuotas y límites de ejecución al construir imágenes arbitrarias (por seguridad).

## Créditos

Proyecto original y estructura basada en el repositorio del orquestador de microservicios y plantilla Vite + React.

---

Si quieres que adapte el README con más detalles (ejemplos de `.env`, comandos Docker exactos, o un diagrama PNG exportado), dime qué formato prefieres y lo agrego.


## Ejemplos de solicitudes y respuestas esperadas (El puerto varia)

Ejemplo 1 - Deploy de microservicio en Python (Flask)

  Request (POST http://localhost:3000/deploy)
  Content-Type: application/json
  {
  "msData": {
  "routeName": "adder_py",
  "url": "http://localhost:5000/",
  "status": "Active",
  "description": "Microservicio suma en Flask",
  "language": "Python",
  "endPoints": {
  "/": "GET",
  "/sumar": "POST"
  },
  "code": "from flask import Flask, request, jsonify\napp = Flask(name)\n\n@app.route('/')\ndef home():\n return jsonify({'mensaje': 'Microservicio adder en Flask'})\n\n@app.route('/sumar', methods=['POST'])\ndef sumar():\n data = request.get_json()\n a = float(data.get('a', 0))\n b = float(data.get('b', 0))\n return jsonify({'resultado': a + b})\n\nif name == 'main':\n app.run(host='0.0.0.0', port=5000)"
  },
  "accessToken": "<ACCESS_TOKEN_VALIDO>"
  }

Respuesta Esperada:
{
"message": "Microservice created successfully",
"routeName": "adder_py",
"port": 5010,
"url": "http://localhost:5010"
}


Ejemplo 2 — Deploy de microservicio en JavaScript (Node + Express)

Request (POST http://localhost:3000/deploy)
Content-Type: application/json
{
"msData": {
"routeName": "adder_js",
"url": "http://localhost:5000/",
"status": "Active",
"description": "Microservicio suma en Node/Express",
"language": "JS",
"endPoints": {
"/": "GET",
"/sumar": "GET"
},
"code": "const express = require('express');\nconst app = express();\napp.use(express.json());\napp.get('/', (req, res) => res.json({ mensaje: 'Adder JS' }));\napp.get('/sumar', (req, res) => {\n const a = parseFloat(req.query.a || 0);\n const b = parseFloat(req.query.b || 0);\n res.json({ resultado: a + b });\n});\napp.listen(5000, '0.0.0.0');"
},
"accessToken": "<ACCESS_TOKEN_VALIDO>"
}

Respuesta esperada — Caso éxito (HTTP 200)
{
"message": "Microservice created successfully",
"routeName": "adder_js",
"port": 5021,
"url": "http://localhost:5021"
}


Ejemplo 3 — Deploy de microservicio en Csharp
{
  "msData": {
    "routeName": "adder_csharp",
    "url": "http://localhost:5000/",
    "status": "Active",
    "description": "hola bla bla",
    "language": "C#",
    "endPoints": {
      "/sumar": "GET",
      "/saludar": "POST"
    },
    "code": "using Microsoft.AspNetCore.Builder;\nusing Microsoft.AspNetCore.Http;\nusing Microsoft.Extensions.Hosting;\n\nvar builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\n\napp.MapGet("/", (int a, int b) => Results.Json(new { resultado = a + b }));\n\napp.Run("http://0.0.0.0:5000/");"
  },
  "accessToken": "<ACCESS_TOKEN_VALIDO>"
}

Respuesta esperada:
{
  "message": "Microservice created successfully",
  "routeName": "adder_csharp",
  "port": 5037,
  "url": "http://localhost:5037"
}
