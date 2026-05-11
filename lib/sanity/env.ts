function readProjectId(): string {
  const raw =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
    process.env.SANITY_PROJECT_ID ??
    "";
  return raw.replace(/["']/g, "").trim();
}

function readDataset(): string {
  const raw =
    process.env.NEXT_PUBLIC_SANITY_DATASET ??
    process.env.SANITY_DATASET ??
    "production";
  return raw.replace(/["']/g, "").trim() || "production";
}

export const apiVersion = "2024-01-01";

export const dataset = readDataset();

export const projectId = readProjectId();

export function isSanityConfigured(): boolean {
  return Boolean(projectId);
}
