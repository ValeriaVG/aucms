import http from "http";
import createHandler, { AppModule } from "./http/handler";
import db from "./db";

import version from "modules/version";
import account from "modules/account";
import content from "modules/content";

import { ensureMigrationsTable, performMigration } from "./db/migrations";
import { Pool } from "pg";

const port = process.env.PORT || 3030;
const context = { db };

const modules: Array<AppModule> = [version, account, content];

export const server = http.createServer(createHandler(modules, context));

export const syncSchema = async (db: Pool, modules: Array<AppModule>) => {
  const client = await db.connect().catch((error) => {
    console.error(`Failed to connect to database`, error);
    process.exit(-1);
  });
  try {
    await client.query(`BEGIN;`);
    await ensureMigrationsTable(client);
    for (const mod of modules) {
      for (const migration of mod.migrations ?? []) {
        await performMigration(client, migration, "up");
      }
    }
    await client.query(`COMMIT;`);
    await client.release();
  } catch (error) {
    console.error(`Failed to sync DB schema`, error);
    await client.query(`ROLLBACK;`);
    await client.release();
    process.exit(-1);
  }
};

if (require.main === module) {
  syncSchema(db, modules).then(() => {
    if (!server.listening)
      server.listen(port, () => {
        console.info(`Server is listening on http://localhost:${port}`);
      });
  });
}