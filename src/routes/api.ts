import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { handleApiRequest } = await import("@/server/api.server");
        return handleApiRequest(request);
      },
    },
  },
});
