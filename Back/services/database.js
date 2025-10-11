import API from "./api.js";

const PROJECT_ID = process.env.PROJECT_ID;

export const getTable = (params, accessToken) => {
  return API.get(`/database/${PROJECT_ID}/read`, {
    params,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });
};

export const createTable = (dbConfig, accessToken) => {
  return API.post(
    `/database/${PROJECT_ID}/create-table`,
    {
      tableName: dbConfig?.tableName,
      description: dbConfig?.description || null,
      columns: dbConfig?.columns,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const insert = (tableName, records, accessToken) => {
  return API.post(
    `/database/${PROJECT_ID}/insert`,
    {
      tableName,
      records,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const update = (data, accessToken) => {
  return API.put(
    `/database/${PROJECT_ID}/update`,
    {
      tableName: data?.tableName,
      idColumn: data?.idColumn || "_id",
      idValue: data?.idValue,
      updates: data?.updates,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const deleteFromTable = (data, accessToken) => {
  return API.delete(`/database/${PROJECT_ID}/delete`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      tableName: data?.tableName,
      idColumn: data?.idColumn || "_id",
      idValue: data?.idValue,
    },
  });
};
