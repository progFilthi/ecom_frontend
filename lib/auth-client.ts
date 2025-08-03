import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const authClient = createAuthClient({
  //you can pass client configuration here
  baseURL: "http://localhost:8080",
});

// http://localhost:8080
// process.env.SERVER_BASE_URL as string
