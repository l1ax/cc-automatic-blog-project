import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于 - 个人技术博客",
  description: "About this personal tech blog",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 sm:mb-8 text-text-secondary text-xs sm:text-sm">
          <Link href="/" className="hover:text-accent-primary transition-colors">
            首页
          </Link>
          <span className="mx-1.5 sm:mx-2">/</span>
          <span className="text-text-primary">关于</span>
        </nav>

        {/* Header */}
        <section className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-3 sm:mb-4 flex items-center">
            <span className="w-1 h-8 sm:h-10 lg:h-12 bg-accent-primary mr-3 sm:mr-4"></span>
            <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl">关于这个博客</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary">
            一个用于知识管理和快速检索的个人技术博客
          </p>
        </section>

        {/* Content */}
        <section className="space-y-6 sm:space-y-8">
          {/* Purpose */}
          <div className="bg-bg-secondary rounded-lg p-4 sm:p-6 lg:p-8 border border-border">
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 sm:mb-4">
              博客初衷
            </h2>
            <div className="space-y-3 sm:space-y-4 text-text-secondary text-sm sm:text-base">
              <p>
                这个博客的创建目的是为了解决我在日常工作和学习中遇到的一个核心问题：
                <strong className="text-text-primary">知识分散，难以检索</strong>
              </p>
              <p>
                随着技术笔记越来越多，分散在各个地方的内容让我很难快速找到需要的信息。
                因此，我决定构建一个专注于<strong className="text-text-primary">快速检索</strong>和
                <strong className="text-text-primary">良好阅读体验</strong>的个人技术知识库。
              </p>
              <p>
                这里不会有任何社交功能（评论、点赞等），因为这是纯粹的知识管理工具，
                服务对象只有我自己。如果这些内容对你也有帮助，那再好不过。
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-bg-secondary rounded-lg p-4 sm:p-6 lg:p-8 border border-border">
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 sm:mb-4">
              技术栈
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="text-base sm:text-lg font-medium text-accent-primary mb-2 sm:mb-3">
                  前端框架
                </h3>
                <ul className="space-y-1.5 sm:space-y-2 text-text-secondary text-sm sm:text-base">
                  <li className="flex items-center">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent-primary rounded-full mr-2 sm:mr-3"></span>
                    Next.js 15 (App Router + SSG)
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent-primary rounded-full mr-2 sm:mr-3"></span>
                    React 18
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent-primary rounded-full mr-2 sm:mr-3"></span>
                    TypeScript
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent-primary rounded-full mr-2 sm:mr-3"></span>
                    Tailwind CSS
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-medium text-accent-primary mb-2 sm:mb-3">
                  内容与功能
                </h3>
                <ul className="space-y-1.5 sm:space-y-2 text-text-secondary text-sm sm:text-base">
                  <li className="flex items-center">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent-primary rounded-full mr-2 sm:mr-3"></span>
                    MDX (Markdown + JSX)
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent-primary rounded-full mr-2 sm:mr-3"></span>
                    react-syntax-highlighter (代码高亮)
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent-primary rounded-full mr-2 sm:mr-3"></span>
                    FlexSearch (全文搜索)
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent-primary rounded-full mr-2 sm:mr-3"></span>
                    Git + GitHub (版本管理)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-bg-secondary rounded-lg p-4 sm:p-6 lg:p-8 border border-border">
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 sm:mb-4">
              核心特性
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-start">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-primary rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-bg-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-text-primary mb-1">
                    快速检索
                  </h3>
                  <p className="text-text-secondary text-xs sm:text-sm">
                    基于客户端搜索，响应时间小于 500ms，支持全文检索
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-primary rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-bg-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-text-primary mb-1">
                    移动端友好
                  </h3>
                  <p className="text-text-secondary text-xs sm:text-sm">
                    响应式设计，在各种设备上都有良好的阅读体验
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-primary rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-bg-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-text-primary mb-1">
                    优秀代码高亮
                  </h3>
                  <p className="text-text-secondary text-xs sm:text-sm">
                    VSCode 级别的语法高亮，支持 40+ 编程语言
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-primary rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-bg-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-text-primary mb-1">
                    简单发布流程
                  </h3>
                  <p className="text-text-secondary text-xs sm:text-sm">
                    使用 Git 管理内容，git push 即可自动部署
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Future Plans */}
          <div className="bg-bg-secondary rounded-lg p-4 sm:p-6 lg:p-8 border border-border">
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 sm:mb-4">
              未来计划
            </h2>
            <div className="space-y-2 sm:space-y-3 text-text-secondary text-sm sm:text-base">
              <div className="flex items-start">
                <span className="text-accent-primary mr-2 sm:mr-3">•</span>
                <p>数学公式渲染 (KaTeX)</p>
              </div>
              <div className="flex items-start">
                <span className="text-accent-primary mr-2 sm:mr-3">•</span>
                <p>流程图和图表支持 (Mermaid)</p>
              </div>
              <div className="flex items-start">
                <span className="text-accent-primary mr-2 sm:mr-3">•</span>
                <p>文章目录 (TOC) 和平滑滚动</p>
              </div>
              <div className="flex items-start">
                <span className="text-accent-primary mr-2 sm:mr-3">•</span>
                <p>内容迁移到 Notion/Obsidian (通过抽象层实现)</p>
              </div>
            </div>
          </div>

          {/* Design Philosophy */}
          <div className="bg-bg-secondary rounded-lg p-4 sm:p-6 lg:p-8 border border-border">
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 sm:mb-4">
              设计理念
            </h2>
            <div className="space-y-3 sm:space-y-4 text-text-secondary text-sm sm:text-base">
              <p>
                <strong className="text-text-primary">极简主义</strong>：界面简洁，无多余装饰，
                让用户专注于内容本身。
              </p>
              <p>
                <strong className="text-text-primary">内容优先</strong>：所有设计决策都以提升阅读体验为核心，
                而非追求花哨的效果。
              </p>
              <p>
                <strong className="text-text-primary">长期可用</strong>：使用纯文本格式存储内容，
                版本管理，易于迁移，确保内容永久可用。
              </p>
              <p>
                <strong className="text-text-primary">性能至上</strong>：静态站点生成，
                快速加载，良好的 Core Web Vitals 指标。
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-bg-secondary rounded-lg p-4 sm:p-6 lg:p-8 border border-border">
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 sm:mb-4">
              联系方式
            </h2>
            <p className="text-text-secondary text-sm sm:text-base">
              这是一个纯知识管理项目，不提供评论功能。如果你发现任何问题或有建议，
              可以通过 GitHub Issues 联系我。
            </p>
            <div className="mt-4 sm:mt-6">
              <Link
                href="/"
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-accent-primary text-bg-primary rounded-lg font-medium hover:bg-accent-hover transition-colors duration-200 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回首页
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
