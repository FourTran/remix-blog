import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";
import "./tailwind.css";
import type { PropsWithChildren } from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
const flexClasses = "flex flex-col items-center";
const spacingClasses =
  "px-4 md:px-0 md:max-w-2xl lg:max-w-3xl xl:max-w-5xl mx-auto h-[100vh]";
const proseClasses = "prose lg:prose-xl dark:prose-invert";
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Document>
      <Header />
      <Outlet />
      <Footer />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </Document>
  );
}
function Document({
  children,
  title = "Remix: So great, it's funny!",
}: PropsWithChildren<{ title?: string }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Remix,jokes" />
        <meta
          name="twitter:image"
          content="https://remix-jokes.lol/social.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@remix_run" />
        <meta name="twitter:site" content="@remix_run" />
        <meta name="twitter:title" content="Remix Jokes" />
        <Meta />
        {title ? <title>{title}</title> : null}
        <Links />
      </head>
      <body
        className={`dark:bg-slate-900 overflow-y-scroll ${proseClasses} ${flexClasses} ${spacingClasses}`}
      >
        {children}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <Document title="Uh-oh!">
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{errorMessage}</pre>
      </div>
    </Document>
  );
}

export const meta: MetaFunction = () => {
  const description = "Learn Remix and laugh at the same time!";

  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title: "Remix: So great, it's funny!" },
  ];
};
