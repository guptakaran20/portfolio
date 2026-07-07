import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://guptakaran0720.vercel.app"),

  title: "Karan Gupta | Full Stack Developer at NIT Jalandhar",

  description:
    "Karan Gupta is a second-year B.Tech student at NIT Jalandhar and a Full Stack Developer building modern web applications, real-time systems, and AI-powered projects.",

  applicationName: "Karan Gupta",

  authors: [
    {
      name: "Karan Gupta",
      url: "https://guptakaran0720.vercel.app",
    },
  ],

  creator: "Karan Gupta",
  publisher: "Karan Gupta",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Karan Gupta | Full Stack Developer at NIT Jalandhar",
    description:
      "Portfolio of Karan Gupta, a Full Stack Developer and B.Tech student at NIT Jalandhar.",
    url: "/",
    siteName: "Karan Gupta",
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Karan Gupta | Full Stack Developer at NIT Jalandhar",
    description:
      "Portfolio of Karan Gupta, a Full Stack Developer and B.Tech student at NIT Jalandhar.",
  },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://guptakaran0720.vercel.app/#website",
      url: "https://guptakaran0720.vercel.app/",
      name: "Karan Gupta",
      alternateName: "Karan Gupta Portfolio",
    },
    {
      "@type": "Person",
      "@id": "https://guptakaran0720.vercel.app/#person",
      name: "Karan Gupta",
      url: "https://guptakaran0720.vercel.app/",
      jobTitle: "Full Stack Developer",
      description:
        "Second-year B.Tech student at NIT Jalandhar and Full Stack Developer.",
      sameAs: [
        "https://github.com/guptakaran20",
        "https://www.linkedin.com/in/guptakaran0720/",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CJG6L5D65B"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-CJG6L5D65B');
        `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <CustomCursor />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
