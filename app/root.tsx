import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { LinksFunction, MetaFunction, json } from "@remix-run/node";
import "./tailwind.css";
import styles from "./tailwind.css?url";
export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
import type { PropsWithChildren } from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { getUser } from "./utils/session.server";
const flexClasses = "flex flex-col items-center";
const spacingClasses =
  "px-4 md:px-0 md:max-w-2xl lg:max-w-3xl xl:max-w-5xl mx-auto h-[100vh]";
const proseClasses = "prose lg:prose-xl dark:prose-invert";

export const loader = async ({ request }: { request: Request }) => {
  let user = await getUser(request);
  return json({ user });
};

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
      <body className={`dark:bg-slate-900 overflow-y-scroll `}>{children}</body>
    </html>
  );
}

export default function App() {
  let { user } = useLoaderData<typeof loader>();
  return (
    <Document>
      <Header user={user} />
      <Outlet />
      <Footer />
      <ScrollRestoration />
      <Scripts />
    </Document>
  );
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
