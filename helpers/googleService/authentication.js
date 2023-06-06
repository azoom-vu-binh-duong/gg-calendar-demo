import path from "path";
import { google } from "googleapis";
import { readFile, writeFile } from "fs/promises";
import { authenticate } from "@google-cloud/local-auth";

const SCOPES = ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/tasks"];
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

export const googleAuthenticate = async () => {
  return authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
};

export const saveCredential = async (credential) => {
  const content = await readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: credential.credentials.refresh_token,
  });
  await writeFile(TOKEN_PATH, payload);
};

export const getCredential = async () => {
  try {
    const content = await readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
};
