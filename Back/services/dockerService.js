import fs, { access } from "fs";
import { exec } from "child_process";

function execPromise(cmd) {
  return new Promise((res, rej) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) return rej(error);
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

async function getPort(accessToken) {
  const microservices = await fetch(
    "http://host.docker.internal:3000/db/read/microservice",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken }),
    }
  );

  if (!microservices.ok) {
    throw new Error(
      `Failed to fetch microservices: ${microservices.status} ${microservices.statusText}`
    );
  }
  const data = await microservices.json();
  const usedPorts = data.data.map((ms) => {
    const url = ms.url;
    const port = parseInt(url.split(":").pop());
    return port;
  });

  let port = 5000;
  while (usedPorts.includes(port)) {
    port++;
  }
  console.log("✅ Free port found:", port);
  return port;
}

// ------------------- export functions ---------------------------------
export async function createContainer(name, code, language, accessToken) {
  const path = `./temp/${name}`;
  const port = await getPort(accessToken);
  const containerConfig = getContainerConfig(language);
  const dockerFile = containerConfig.dockerFile;
  const entryPoint = containerConfig.entryPoint;

  try {
    await execPromise(`docker info`);
  } catch (error) {
    const err = new Error("docker engine is not running");
    err.status = 503;
    err.statusText = "Service Unavailable";
    throw err;
  }

  if (!fs.existsSync(path)) {
    await fs.promises.mkdir(path, { recursive: true });
  }

  console.log(`📦 Configuring container...`);
  console.log({ dockerFile, entryPoint, path });

  await fs.promises.writeFile(`${path}/${entryPoint}`, code);
  await fs.promises.writeFile(`${path}/Dockerfile`, dockerFile);

  const imageName = `${name}`;
  console.log(`🐳 building image: ${imageName}`);

  await execPromise(`docker buildx build --load -t ${imageName} ${path}`);

  console.log(`🚀 running container...`);
  await execPromise(
    `docker run -d -p ${port}:5000 --name ${imageName}_c ${imageName}`
  );

  console.log(
    `✅ container ${imageName}_c running on http://localhost:${port}`
  );
  return {
    routeName: name,
    port,
    url: `http://host.docker.internal:${port}`,
  };
}

export async function deleteContainer(name) {
  const path = `./temp/${name}`;

  try {
    console.log(`🗑️  Deleting container and image ${name}...`);
    await execPromise(`docker stop ${name}_c`);
    await execPromise(`docker rm -f ${name}_c`);
    await execPromise(`docker rmi -f ${name}`);

    if (fs.existsSync(path)) {
      await fs.promises.rm(path, { recursive: true, force: true });
    }

    console.log(`🗑️  Container and image ${name} deleted successfully`);
  } catch (err) {
    console.log(`⚠️ Error deleting container ${name}_c:`, err);
  }
}
