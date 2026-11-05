import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/components/AuthProvider";
import { FeedbackProvider } from "@/components/FeedbackProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BubbleField } from "@/components/BubbleField";
import { SiteMotion } from "@/components/SiteMotion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { personSchema, SEO_KEYWORDS } from "@/lib/seo";

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
      { title: "Nikita Nautiyal | UI/UX Product Designer in Bengaluru" },
      {
        name: "description",
        content:
          "Nikita Nautiyal is a UI/UX product designer in Bengaluru. Portfolio of mobile and web design, Figma wireframes, prototyping, and React.js handovers.",
      },
      { name: "keywords", content: SEO_KEYWORDS },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Nikita Nautiyal" },
      { property: "og:title", content: "Nikita Nautiyal | UI/UX Product Designer in Bengaluru" },
      {
        property: "og:description",
        content:
          "UI/UX product designer in Bengaluru. Mobile and web design, Figma wireframes, prototyping, and React.js handovers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Nikita Nautiyal | UI/UX Product Designer in Bengaluru" },
      {
        name: "twitter:description",
        content:
          "UI/UX product designer in Bengaluru. Mobile and web design, Figma wireframes, prototyping, and React.js handovers.",
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
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=Outfit:wght@400;500&family=Syne:wght@500;700&display=swap",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
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
          <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
            <BubbleField />
            <SiteMotion />
            <SiteHeader />
            <main className="relative z-10 flex-1">
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
