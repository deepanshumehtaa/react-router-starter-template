import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig = {
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
