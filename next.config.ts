import type { NextConfig } from "next";
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
};

export default defineCloudflareConfig();
