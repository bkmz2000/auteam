import { createDatabase } from "@tinacms/datalayer";
import { RedisLevel } from "upstash-redis-level";
import { GitHubProvider } from "tinacms-gitprovider-github";

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN as string;
const owner = (process.env.GITHUB_OWNER ||
  process.env.VERCEL_GIT_REPO_OWNER) as string;
const repo = (process.env.GITHUB_REPO ||
  process.env.VERCEL_GIT_REPO_SLUG) as string;
const branch = (process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main") as string;

if (!branch) {
  throw new Error(
    "No branch found. Make sure that you have set the GITHUB_BRANCH or process.env.VERCEL_GIT_COMMIT_REF environment variable."
  );
}

// Helper to clean env vars - remove whitespace and newlines
const cleanEnv = (val: string | undefined) => {
  const cleaned = val?.replace(/\s/g, "").trim();
  return cleaned && cleaned.length > 0 ? cleaned : undefined;
};

export default createDatabase({
  gitProvider: new GitHubProvider({
    branch,
    owner,
    repo,
    token,
  }),
  databaseAdapter: new RedisLevel<string, Record<string, any>>({
    redis: {
      url: cleanEnv(process.env.UPSTASH_REDIS_REST_URL) || cleanEnv(process.env.KV_REST_API_URL) || cleanEnv(process.env.KV_URL) || "",
      token: cleanEnv(process.env.UPSTASH_REDIS_REST_TOKEN) || cleanEnv(process.env.KV_REST_API_TOKEN) || "",
    },
    debug: process.env.DEBUG === "true" || false,
  }),
  namespace: branch,
});
