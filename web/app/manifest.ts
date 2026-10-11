import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PrimeDesk — Your Agency. Your Destination. A Clearer Route.",
    short_name: "PrimeDesk",
    description: "Understand your agency's processes and find the right digital tools.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0B1D33",
    icons: [
      { src: "/icons/icon-192-v2.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512-v2.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
