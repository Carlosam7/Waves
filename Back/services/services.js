import fs from "fs";

const SERVICES_FILE = "./services.json";

export function readProxyRoutes() {
  if (!fs.existsSync(SERVICES_FILE)) return {};
  return JSON.parse(fs.readFileSync(SERVICES_FILE, "utf-8"));
}
//console.log(readProxyRoutes());

export function writeProxyRoutes(services) {
  try {
    fs.writeFileSync(SERVICES_FILE, JSON.stringify(services, null, 2));
    //console.log(services);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function updateProxyRoutes(accessToken) {
  try {
    const response = await fetch("http://localhost:3000/db/read/microservice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken }),
    });

    const routes = await response.json();

    if (!response.ok) {
      throw new Error(
        `Failed to fetch routes: ${routes.message || response.statusText}`
      );
    }

    if (!routes.data || !Array.isArray(routes.data)) {
      throw new Error("Invalid routes format from database");
    }

    writeProxyRoutes(routes.data);
    return routes.data;
  } catch (err) {
    console.error("❌ Error updating proxy routes:", err.message);
    throw err;
  }
}

//console.log(readServices()); // <-- Read the file

export function verifyIfExist(name) {
  const services = readProxyRoutes();

  for (let s of services) {
    if (s.routeName === name) {
      return true;
    }
  }
  return false;
}
//verifyIfExist("adder_csharp");