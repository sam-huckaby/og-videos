import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

/*
export const metadata: Metadata = {
  title: "Potato Stream",
  description: "You can literally do anything on the internet - it's crazy",
  openGraph: {
    images: 'https://invision-nails-specification-toy.trycloudflare.com/og-image.png',
  },
};
*/

/*
<meta property="og:type" content="video.other" />
        <meta property="og:video:url" content="https://invision-nails-specification-toy.trycloudflare.com/seems-good.webm" />
        <meta property="og:video:secure_url" content="https://invision-nails-specification-toy.trycloudflare.com/seems-good.webm" />
        <meta property="og:video:width" content="720" />
        <meta property="og:video:height" content="360" />
        <meta property="og:video:type" content="text/html" />
        <meta name="twitter:player" content="https://invision-nails-specification-toy.trycloudflare.com/seems-good.webm" />
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />
 * */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:type" content="video" />
        <meta property="og:url" content="https://bored-presentation-foreign-softball.trycloudflare.com/seems-good.webm" />
        <meta property="og:video" content="https://bored-presentation-foreign-softball.trycloudflare.com/seems-good.webm" />
        <meta property="og:video:type" content="video" />
        <meta http-equiv="refresh" content="0; url='https://bored-presentation-foreign-softball.trycloudflare.com/seems-good.webm'" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
