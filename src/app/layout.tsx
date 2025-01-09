import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from './providers';
import LayoutProvider from './provider/LayoutProvider';
import { pretendard } from "./style/fonts/fonts";
import Analytics from './components/GA/Analytics';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KeyChat",
  description: "KeyChat is a chatbot that uses your own API key to generate responses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.variable}>
      <body className={inter.className}>
        {
          process.env.NEXT_PUBLIC_GA_ID && (
            <Analytics id={process.env.NEXT_PUBLIC_GA_ID} />
          )
        }
        <LayoutProvider>
          <Providers>{children}</Providers>
        </LayoutProvider>
      </body>
    </html>
  );
}
