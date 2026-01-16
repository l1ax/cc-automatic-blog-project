import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Heading */}
        <h1 className="text-8xl sm:text-9xl font-bold text-accent-primary mb-4">404</h1>

        {/* Error Message */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">页面未找到</h2>
          <p className="text-text-secondary text-lg">抱歉，您访问的页面不存在或已被移动。</p>
        </div>

        {/* 404 Illustration */}
        <div className="my-12">
          <div className="inline-block p-8 rounded-2xl bg-tertiary border border-border">
            <svg
              className="w-24 h-24 sm:w-32 sm:h-32 text-accent-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary hover:bg-accent-hover text-white rounded-lg font-medium transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            返回首页
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-tertiary hover:bg-secondary text-text-primary rounded-lg font-medium transition-colors duration-200 border border-border"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            关于博客
          </Link>
        </div>

        {/* Suggestion Text */}
        <div className="mt-12 p-6 bg-tertiary rounded-xl border border-border">
          <p className="text-text-secondary text-sm">您可以：</p>
          <ul className="mt-3 text-text-secondary text-sm space-y-1">
            <li>检查 URL 是否拼写正确</li>
            <li>使用顶部的搜索框查找文章</li>
            <li>浏览首页的文章列表</li>
            <li>通过标签筛选感兴趣的内容</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
