// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// On Netlify CI, `NETLIFY` is set: we swap Cloudflare for @netlify/vite-plugin-tanstack-start.
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import netlify from "@netlify/vite-plugin-tanstack-start";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

function ignoreTanstackUnusedImports(
  warning: { code?: string; message: string },
  warn: (warning: { code?: string; message: string }) => void,
) {
  if (
    warning.code === "UNUSED_EXTERNAL_IMPORT" &&
    warning.message.includes("node_modules/@tanstack/")
  ) {
    return;
  }
  warn(warning);
}

const isNetlify = Boolean(process.env.NETLIFY);

function mongodbBrowserStub(): Plugin {
  const stubId = "\0mongodb-browser-stub";
  return {
    name: "mongodb-browser-stub",
    enforce: "pre",
    resolveId(id, _importer, options) {
      if (id !== "mongodb" && id !== "bson") return null;
      if (this.environment) {
        const isClient =
          this.environment.config.consumer === "client" || this.environment.name === "client";
        return isClient ? stubId : null;
      }
      return options?.ssr ? null : stubId;
    },
    load(id) {
      if (id !== stubId) return null;
      return `
export class MongoClient {
  constructor() {}
  connect() { return Promise.resolve(this); }
  db() { return { collection() { return {}; } }; }
}
export class ObjectId {
  constructor(id) { this.id = id; }
  toString() { return String(this.id ?? ""); }
}
export class Collection {}
export class Db {}
`;
    },
  };
}

export default defineConfig({
  cloudflare: isNetlify ? false : undefined,
  plugins: isNetlify ? [mongodbBrowserStub(), netlify()] : [mongodbBrowserStub()],
  vite: {
    server: {
      host: "0.0.0.0",
      port: Number(process.env.PORT) || 8090,
      strictPort: true,
      allowedHosts: true,
    },
    ssr: {
      external: ["mongodb", "bson"],
    },
    optimizeDeps: {
      exclude: ["mongodb", "bson"],
    },
    build: {
      rollupOptions: {
        onwarn: ignoreTanstackUnusedImports,
      },
    },
    environments: {
      ssr: {
        build: {
          rollupOptions: {
            onwarn: ignoreTanstackUnusedImports,
          },
        },
      },
    },
  },
});
