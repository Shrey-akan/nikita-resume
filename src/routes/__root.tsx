import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/components/AuthProvider";
import { FeedbackProvider } from "@/components/FeedbackProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-5xl font-semibold text-foreground sm:text-7xl">404</h1>
        <h2 className="mt-4 text-lg font-semibold text-foreground sm:text-xl">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nikita Nautiyal — UI/UX Designer" },
      {
        name: "description",
        content:
          "Portfolio of Nikita Nautiyal, UI/UX designer. User research, product flows, and high-fidelity prototypes.",
      },
      { name: "author", content: "Nikita Nautiyal" },
      { property: "og:title", content: "Nikita Nautiyal — UI/UX Designer" },
      {
        property: "og:description",
        content:
          "Portfolio of Nikita Nautiyal, UI/UX designer. User research, product flows, and high-fidelity prototypes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Nikita Nautiyal — UI/UX Designer" },
      {
        name: "twitter:description",
        content:
          "Portfolio of Nikita Nautiyal, UI/UX designer. User research, product flows, and high-fidelity prototypes.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4b620c84-8510-4c2f-aa92-7379263d85c1/id-preview-68182519--4e41171c-80da-4e56-8477-3c3010f551c9.lovable.app-1776998857146.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4b620c84-8510-4c2f-aa92-7379263d85c1/id-preview-68182519--4e41171c-80da-4e56-8477-3c3010f551c9.lovable.app-1776998857146.png",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&family=Syne:wght@500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

const themeBootScript = `(function(){try{var t=localStorage.getItem('nn-theme');var r=document.documentElement;if(t==='dark'){r.classList.add('dark');r.classList.remove('light');r.style.colorScheme='dark';r.dataset.theme='dark';}else{r.classList.remove('dark');r.classList.add('light');r.style.colorScheme='light';r.dataset.theme='light';}}catch(e){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}})();`;

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <FeedbackProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
            <SiteHeader />
            <main className="flex-1">
              <Outlet />
            </main>
            <SiteFooter />
            <Toaster />
          </div>
        </AuthProvider>
      </FeedbackProvider>
    </ThemeProvider>
  );
}
