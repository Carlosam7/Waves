import fs from "fs";

const SERVICES_FILE = "./services.json";

export function readProxyRoutes() {
  if (!fs.existsSync(SERVICES_FILE)) return {};
  return JSON.parse(fs.readFileSync(SERVICES_FILE, "utf-8"));
}

export function writeProxyRoutes(services) {
  try {
    fs.writeFileSync(SERVICES_FILE, JSON.stringify(services, null, 2));
    console.log(services);
  } catch (err) {
    console.log(err);
  }
}

export async function updateProxyRoutes(accessToken) {
  try {
    const response = await fetch("http://localhost:3000/db/read/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken }),
    });

    const routes = await response.json();

    console.log(routes.data);
    writeProxyRoutes(routes.data);
    return routes.data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

//updateProxyRoutes();
//console.log(readServices()); // <-- Read the file
