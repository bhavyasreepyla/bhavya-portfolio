import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  weight: "variable",
});

export const metadata = {
  // update to your custom domain when you have one
  metadataBase: new URL("https://bhavya-portfolio.vercel.app"),
  title: "Bhavya Sree Pyla · AI Engineer",
  description:
    "AI engineer building systems where logic meets intuition. MS Artificial Intelligence, Northeastern University. LLM agents, evals, deep learning, and 12+ years of Bharatanatyam.",
  keywords: ["AI Engineer", "Machine Learning", "LLM Agents", "Computer Vision", "NLP", "Bhavya Sree Pyla"],
  openGraph: {
    title: "Bhavya Sree Pyla · AI Engineer",
    description: "AI systems where logic meets intuition.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
