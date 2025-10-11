import fs from "fs";
import path from "path";
import { exec } from "child_process";

export const createMicroserviceFile = (code, imageName) => {
  const serviceDir = path.join("services", `${imageName}`);
  const dockerFile = `FROM python:latest
  WORKDIR /app
  COPY . /app
  CMD ["python", "${imageName}.py"]
  `;

  fs.mkdirSync(serviceDir, { recursive: true });
  fs.writeFileSync(path.join(serviceDir, `${imageName}.py`), code);
  fs.writeFileSync(path.join(serviceDir, "Dockerfile"), dockerFile);

  return serviceDir;
};

export const buildDockerImage = (serviceDir, imageName) => {
  return new Promise((resolve, reject) => {
    exec(
      `docker build --no-cache -t ${imageName} ${serviceDir}`,
      (err, stdout, stderr) => {
        if (err) return reject(stderr);
        resolve(stdout);
      }
    );
  });
};

export const runDockerContainer = (imageName) => {
  return new Promise((resolve, reject) => {
    exec(`docker run --rm ${imageName}`, (err, stdout, stderr) => {
      if (err) return reject(stderr);
      resolve(stdout);
    });
  });
};
