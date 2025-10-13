import "dotenv/config";
import express from "express";
import cors from "cors";
import { createContainer, deleteContainer } from "./services/dockerService.js";
import { createProxyMiddleware } from "http-proxy-middleware";
import {
  readProxyRoutes,
  updateProxyRoutes,
  verifyIfExist,
  writeProxyRoutes,
} from "./services/services.js";
import {
  login,
  logout,
  refreshToken,
  register,
  verifyToken,
} from "./services/auth.js";
import {
  createTable,
  deleteFromTable,
  getTable,
  insert,
  update,
} from "./services/database.js";

const app = express();
const desiredPort = process.env.PORT ?? 3000;
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

function updateRoutes() {
  const routes = readProxyRoutes();

  for (const service of routes) {
    console.log(`Mapping route: /${service.route_name} -> ${service.url}`);
    app.use(
      `/${service.route_name}`,
      createProxyMiddleware({
        target: service.url,
        changeOrigin: true,
        pathRewrite: { [`/${service.route_name}`]: "" },
      })
    );
  }
}
updateRoutes();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
  const userData = req.body;

  try {
    const response = await register(userData);
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error in signup:", err.response?.data || err.message);

    res.status(err.response?.status || 500).json({
      message: err.message,
      status: err.response?.status,
      data: err.response?.data || null,
    });
  }
});

app.post("/login", async (req, res) => {
  const userData = req.body;

  try {
    console.log(userData);
    const response = await login(userData);

    res.status(200).json({
      message: `Welcome, ${response?.data.user.name}`,
      userData: response?.data,
    });
  } catch (err) {
    console.error("Error in login:", err.response?.data || err.message);

    res.status(err.response?.status || 500).json({
      message: err.message,
      status: err.response?.status,
      data: err.response?.data || null,
    });
  }
});

app.post("/logout", async (req, res) => {
  const { accessToken } = req.body;

  try {
    console.log(accessToken);
    const response = await logout(accessToken);

    res.status(200).json({ message: "Logout successfull" });
  } catch (err) {
    console.error("Error in login:", err.response?.data || err.message);

    res.status(err.response?.status || 500).json({
      message: err.message,
      status: err.response?.status,
      data: err.response?.data || null,
    });
  }
});

app.get("/verifyToken", async (req, res) => {
  const { token } = req.query;

  try {
    const response = await verifyToken(token);

    res.status(200).json({ message: response?.data });
  } catch (err) {
    console.error(err);
    const status = err.status || 500;
    res
      .status(status)
      .json({ error: err.message, status, statusText: err.statusText });
  }
});

app.get("/refreshToken", async (req, res) => {
  const { rToken } = req.query;

  try {
    const response = await refreshToken(rToken);

    res.status(200).json({ message: response?.data });
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);

    res.status(err.response?.status || 500).json({
      message: err.message,
      status: err.response?.status,
      data: err.response?.data || null,
    });
  }
});

app.post("/db/read/:tableName", async (req, res, next) => {
  const { tableName } = req.params;
  const { params, accessToken } = req.body;

  const tableParams = {
    tableName,
    ...params,
  };

  try {
    await verifyToken(accessToken);
    console.log("📦 Sent to getTable:", {
      tableParams,
      accessToken: accessToken.slice(0, 10) + "...",
    });

    const response = await getTable(tableParams, accessToken);

    res.status(200).json({ data: response?.data });
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);

    next(err);
  }
});

app.post("/db/create", async (req, res) => {
  const { dbConfig, accessToken } = req.body;

  try {
    const response = await createTable(dbConfig, accessToken);

    res.status(201).json({ message: response?.data });
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);

    res.status(err.response?.status || 500).json({
      message: err.message,
      status: err.response?.status,
      data: err.response?.data || null,
    });
  }
});

app.post("/db/insert", async (req, res, next) => {
  const { tableName, records, accessToken } = req.body;

  try {
    await verifyToken(accessToken);
    const response = await insert(tableName, records, accessToken);

    res
      .status(200)
      .json({ message: "Inserted successfully", data: response?.data });
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    next(accessToken);
  }
});

app.post("/db/update", async (req, res) => {
  const { data, accessToken } = req.body;

  try {
    const response = await update(data, accessToken);

    res
      .status(200)
      .json({ message: "Update successfull", data: response?.data });
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);

    res.status(err.response?.status || 500).json({
      message: err.message,
      status: err.response?.status,
      data: err.response?.data || null,
    });
  }
});

app.post("/db/delete", async (req, res, next) => {
  const { data, accessToken } = req.body;

  try {
    await verifyToken(accessToken);
    const response = await deleteFromTable(data, accessToken);

    res
      .status(200)
      .json({ message: "Deleted Successfully", data: response?.data });
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    next(err);
  }
});

app.post("/deploy", async (req, res, next) => {
  try {
    const { name, code, accessToken, language } = req.body;
    if (!name || !code || !language)
      return res
        .status(400)
        .json({ error: "Fields: name, code and language are required" });
    await verifyToken(accessToken);
    verifyIfExist(name);

    const serviceInfo = await createContainer(name, code, language);

    await fetch("http://localhost:3000/db/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableName: "route",
        records: [{ route_name: serviceInfo.name, url: serviceInfo.url }],
        accessToken,
      }),
    });

    await updateProxyRoutes(accessToken);
    updateRoutes();

    res.json({
      message: "Microservice created successfully",
      ...serviceInfo,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post("/ms/delete/:msName", async (req, res, next) => {
  try {
    const { msName } = req.params;
    const { accessToken } = req.body;

    await verifyToken(accessToken);

    await fetch("http://localhost:3000/db/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          tableName: "route",
          idColumn: "route_name",
          idValue: msName,
        },
        accessToken,
      }),
    });

    await deleteContainer(msName);
    await updateProxyRoutes(accessToken);
    updateRoutes();

    res
      .status(200)
      .json({ message: `Microservice ${msName} deleted successfully` });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.listen(desiredPort, () => {
  console.log(`Server is running on http://localhost:${desiredPort}`);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).json({
    error:
      status === 500 ? "Internal server error" : err.statusText || "App error",
    message: err.message || "An unexpected error ocurred",
  });
});
