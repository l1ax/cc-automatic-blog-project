import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "个人技术博客",
  description: "Personal tech blog for knowledge management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased bg-bg-primary text-text-primary">
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="border-b border-divider bg-bg-primary sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-accent-primary">
                    Tech Blog
                  </span>
                </Link>
                <nav className="flex space-x-6">
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
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t border-divider mt-auto">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-text-secondary text-sm">
                <p>&copy; {new Date().getFullYear()} 个人技术博客. All rights reserved.</p>
                <p className="mt-2 text-text-muted">
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
