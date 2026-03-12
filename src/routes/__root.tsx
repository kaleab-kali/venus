import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { LenisProvider } from "@/components/providers/LenisProvider"
import "@/lib/fonts"
import appCss from "../styles.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Happy Birthday Venus",
      },
      {
        name: "description",
        content:
          "Every great story deserves another chapter. Happy Birthday Venus.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <LenisProvider>{children}</LenisProvider>
        <Scripts />
      </body>
    </html>
  )
}
