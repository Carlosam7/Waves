import fs from "fs";
import getPort, { portNumbers } from "get-port";
import { exec } from "child_process";

const dockerFile = `FROM python:3.14-slim\nWORKDIR /app\nCOPY main.py .\nRUN pip install flask\nEXPOSE 5000\nCMD ["python", "main.py"]`;
// const dockerFile = `# Imagen base de Node
// FROM node:18

// # Crear directorio de trabajo
// WORKDIR /app

// # Copiar archivos
// COPY package*.json ./
// COPY index.js .

// # Instalar dependencias
// RUN npm install express

// # Exponer puerto
// EXPOSE 5000

// # Comando para ejecutar el servidor
// CMD ["node", "index.js"]
// `;

// const dockerFile = `# Etapa 1: Build
// FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
// WORKDIR /app

// # Creamos un nuevo proyecto web minimal
// RUN dotnet new web -n Microservice
// WORKDIR /app/Microservice

// # Eliminamos el Program.cs generado y lo reemplazamos
// RUN rm Program.cs
// COPY Program.cs .

// # Restauramos dependencias y compilamos
// RUN dotnet restore
// RUN dotnet publish -c Release -o /out

// # Etapa 2: Runtime
// FROM mcr.microsoft.com/dotnet/aspnet:8.0
// WORKDIR /app
// COPY --from=build /out .

// EXPOSE 5000
// ENTRYPOINT ["dotnet", "Microservice.dll"]
// `;

export async function createContainer(name, code) {
  const path = `./temp/${name}`;
  const port = await getPort({ port: portNumbers(5000, 8000) });

  if (!fs.existsSync(path)) {
    await fs.promises.mkdir(path, { recursive: true });
  }

  await fs.promises.writeFile(`${path}/main.py`, code);
  await fs.promises.writeFile(`${path}/Dockerfile`, dockerFile);

  const imageName = `${name}`;

  await execPromise(`docker build -t ${imageName} ${path}`);

  await execPromise(
    `docker run -d -p ${port}:5000 --name ${imageName}_c ${imageName}`
  );

  return {
    name,
    port,
    url: `http://localhost:${port}`,
  };
}

function execPromise(cmd) {
  return new Promise((res, rej) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) return rej(stderr);
      res(stdout);
    });
  });
}

export async function deleteContainer(name) {
  const path = `./temp/${name}`;

  try {
    exec(`docker stop ${name}_c`);
    exec(`docker rm -f ${name}_c`);
    exec(`docker rmi -f ${name}`);

    if (fs.existsSync(path)) {
      await fs.promises.rm(path, { recursive: true, force: true });
    }
  } catch (err) {
    console.log(err);
  }
}
