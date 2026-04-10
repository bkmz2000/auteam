import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";

import databaseClient from "../../../tina/__generated__/databaseClient";

const handler = TinaNodeBackend({
  authProvider: LocalBackendAuthProvider(),
  databaseClient,
});

export default (req: any, res: any) => handler(req, res);
