import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
});
