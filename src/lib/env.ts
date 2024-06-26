import { z } from "zod";

// Define a schema for the environment variables
const EnvSchema = z.object({
  awEndpoint: z.string(),
  awProjectId: z.string(),
  awDatabaseId: z.string(),
  awTodosCollectionId: z.string(),
  awImageStorageId: z.string(),
  secretKey: z.string(),
});

// Validate the environment variables
const parsedEnv = EnvSchema.safeParse({
  awEndpoint: process.env.NEXT_PUBLIC_AW_ENDPOINT,
  awProjectId: process.env.NEXT_PUBLIC_AW_PROJECT_ID,
  awDatabaseId: process.env.NEXT_PUBLIC_AW_DATABASE_ID,
  awTodosCollectionId: process.env.NEXT_PUBLIC_AW_TODOS_COLLECTION_ID,
  awImageStorageId: process.env.NEXT_PUBLIC_AW_IMAGE_STORAGE_ID,
  secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
});

// Throw an error if the environment variables are invalid
if (!parsedEnv.success) {
  console.error(parsedEnv.error);
  throw new Error(`Environment validation error: ${parsedEnv.error.message}`);
}

// Export the validated environment variables
const env = parsedEnv.data;
export default env;

// Augment the global NodeJS namespace with the validated environment variables
declare global {
  namespace NodeJs {
    interface ProcessEnv extends z.infer<typeof EnvSchema> {}
  }
}
