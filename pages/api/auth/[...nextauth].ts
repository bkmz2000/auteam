import { TinaNodeBackend } from "@tinacms/datalayer";
import { TinaCloudBackendAuthProvider } from "@tinacms/auth";

import databaseClient from "../../../tina/__generated__/databaseClient";

const handler = TinaNodeBackend({
  authProvider: TinaCloudBackendAuthProvider(),
  databaseClient,
});

export default (req: any, res: any) => handler(req, res);
