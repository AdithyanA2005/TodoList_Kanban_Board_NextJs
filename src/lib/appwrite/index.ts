import { Account, Client, Databases, Storage, ID } from "appwrite";
import env from "@/lib/env";

const client = new Client().setEndpoint(env.awEndpoint).setProject(env.awProjectId);
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage, ID };
