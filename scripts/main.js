import { createApp } from "../src/core/app.js";
import { loadEnvironment } from "../src/config/environment.js";
import { createLocalDatabase } from "../src/database/local-database.js";
import { createAuthService } from "../src/auth/auth-service.js";
import { renderPhaseZero } from "../src/features/phase-zero/render-phase-zero.js";

const root = document.querySelector("[data-app-root]");
const environment = loadEnvironment();
const database = createLocalDatabase(environment.storageKey);
const auth = createAuthService(database);

const app = createApp({
  auth,
  database,
  environment,
  root,
});

app.mount(renderPhaseZero);
