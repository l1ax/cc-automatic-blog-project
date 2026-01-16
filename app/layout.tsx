import type { Metadata } from "next";
import Link from "next/link";
import { SearchBox } from "@/components/search-box";
import { BackToTop } from "@/components/back-to-top";
import { MobileNav } from "@/components/mobile-nav";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "个人技术博客 | Tech Blog",
    template: "%s | 个人技术博客",
  },
  description:
    "个人技术博客，记录和分享编程知识、技术心得和开发经验。专注于 Next.js、React、TypeScript 等前端技术。",
  keywords: [
    "技术博客",
    "编程",
    "Next.js",
    "React",
    "TypeScript",
    "前端开发",
    "JavaScript",
    "Tailwind CSS",
    "技术文章",
    "知识管理",
  ],
  authors: [
    {
      name: "Blog Author",
      url: "https://yourdomain.com",
    },
  ],
  creator: "Blog Author",
  publisher: "Blog Author",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://yourdomain.com",
    title: "个人技术博客 | Tech Blog",
    description:
      "个人技术博客，记录和分享编程知识、技术心得和开发经验。专注于 Next.js、React、TypeScript 等前端技术。",
    siteName: "个人技术博客",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "个人技术博客",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "个人技术博客 | Tech Blog",
    description:
      "个人技术博客，记录和分享编程知识、技术心得和开发经验。专注于 Next.js、React、TypeScript 等前端技术。",
    images: [
      {
        url: "/twitter-image",
        width: 1200,
        height: 600,
        alt: "个人技术博客",
      },
    ],
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://yourdomain.com",
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="antialiased bg-bg-primary text-text-primary">
        <div className="min-h-screen flex flex-col">
          {/* Structured Data (JSON-LD) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "个人技术博客",
                url: "https://yourdomain.com",
                description:
                  "个人技术博客，记录和分享编程知识、技术心得和开发经验。专注于 Next.js、React、TypeScript 等前端技术。",
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://yourdomain.com/?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
                author: {
                  "@type": "Person",
                  name: "Blog Author",
                  url: "https://yourdomain.com",
                },
                publisher: {
                  "@type": "Organization",
                  name: "个人技术博客",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://yourdomain.com/icon.png",
                  },
                },
              }),
            }}
          />

          {/* Header */}
          <header className="border-b border-divider bg-bg-primary sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
            <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
              {/* Top bar: logo, search, and mobile menu */}
              <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
                <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
                  <span className="text-lg sm:text-xl font-bold text-accent-primary">
                    Tech Blog
                  </span>
                </Link>
                <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
                  <div className="flex-1 max-w-[140px] sm:max-w-xs md:max-w-md hidden sm:block">
                    <SearchBox placeholder="搜索文章..." />
                  </div>
                  <MobileNav />
                </div>
              </div>
              {/* Desktop navigation - shown on larger screens */}
              <nav className="hidden sm:flex items-center space-x-6">
                <Link
                  href="/"
                  className="text-text-secondary hover:text-accent-primary transition-colors duration-200"
                >
                  首页
                </Link>
                <Link
                  href="/about"
                  className="text-text-secondary hover:text-accent-primary transition-colors duration-200"
                >
                  关于
                </Link>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Back to Top Button */}
          <BackToTop />

          {/* Footer */}
          <footer className="border-t border-divider mt-auto">
            <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
              <div className="text-center text-text-secondary text-xs sm:text-sm">
                <p>&copy; {new Date().getFullYear()} 个人技术博客. All rights reserved.</p>
                <p className="mt-1 sm:mt-2 text-text-muted">
                  Built with Next.js, TypeScript, and Tailwind CSS
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
