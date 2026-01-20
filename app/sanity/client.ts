import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "dbcs3j7f",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
