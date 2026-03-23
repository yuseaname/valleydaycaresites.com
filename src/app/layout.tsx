import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://valleydaycaresites.com"),
  title: {
    default: "Valley Daycare Sites | See Your Daycare Homepage Before You Pay",
    template: "%s | Valley Daycare Sites",
  },
  description: "Get a free sample homepage for your daycare. We build it in 48 hours, you decide if you want to keep it for just $50/month. No upfront cost, no contracts.",
  keywords: [
    "daycare website",
    "childcare website",
    "preschool website",
    "daycare web design",
    "free daycare website",
    "daycare website sample",
    "childcare website builder",
    "home daycare website",
  ],
  authors: [{ name: "Valley Daycare Sites" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Valley Daycare Sites | Free Sample Homepage for Your Daycare",
    description: "Get a free sample homepage in 48 hours. See it before you pay anything. $50/month if you keep it.",
    type: "website",
    locale: "en_US",
    siteName: "Valley Daycare Sites",
    images: [
      {
        url: "/images/hero-mockup.png",
        width: 1440,
        height: 720,
        alt: "Professional daycare website mockup displayed on laptop and tablet, showcasing modern web design for childcare businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valley Daycare Sites",
    description: "Free sample homepage for your daycare. $50/month if you keep it.",
    images: [
      {
        url: "/images/hero-mockup.png",
        alt: "Professional daycare website mockup displayed on laptop and tablet, showcasing modern web design for childcare businesses",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        {/* Google Analytics - Measurement ID: G-B3MMTHE85C */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B3MMTHE85C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B3MMTHE85C');
          `}
        </Script>
        {/* Rybbit Analytics - Site ID: 5001 */}
        <Script
          src="https://app.rybbit.io/api/script.js"
          strategy="afterInteractive"
        />
        {/* Consolto Widget - Customer Communication Platform */}
        <div id="et-iframe" data-widgetid="4f4e9c9b-da8d-47d1-a594-2c9b79070de9" />
        <Script
          src="https://client.consolto.com/iframeApp/iframeApp.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
