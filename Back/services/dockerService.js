import fs from "fs";
import getPort, { portNumbers } from "get-port";
import { exec } from "child_process";
import { error } from "console";

function execPromise(cmd) {
  return new Promise((res, rej) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) return rej(stderr);
      res(stdout);
    });
  });
}

function getContainerConfig(language) {
  const path = `./containerConfig.json`;
  const configs = JSON.parse(fs.readFileSync(path, "utf-8"));

  if (!configs[language]) {
    const err = new Error(`${language} seems not to be a supported language`);
    err.status = 400;
    err.statusText = "Bad Request";
    err.type = "Unsupported language";
    throw err;
  }

  return configs[language];
}
// const config = getContainerConfig("CS");
// const dockerFile = config.dockerFile;
// const entryPoint = config.entryPoint;
// console.log(entryPoint);
// console.log({ message: "Setting container 📦⚙️", dockerFile, entryPoint });

// ------------------- export functions ---------------------------------
export async function createContainer(name, code, language) {
  const path = `./temp/${name}`;
  const port = await getPort({ port: portNumbers(5000, 8000) });
  const containerConfig = getContainerConfig(language);
  const dockerFile = containerConfig.dockerFile;
  const entryPoint = containerConfig.entryPoint;

  if (!fs.existsSync(path)) {
    await fs.promises.mkdir(path, { recursive: true });
  }

  console.log({ message: `Setting container 📦⚙️`, dockerFile, entryPoint });
  await fs.promises.writeFile(`${path}/${entryPoint}`, code);
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
