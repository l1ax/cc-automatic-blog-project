export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            个人技术博客
          </h1>
          <p className="text-xl text-text-secondary mb-6">
            探索技术，记录成长，分享知识
          </p>
          <p className="text-text-muted max-w-2xl">
            这里是我的个人技术知识库，记录着我在编程、架构设计、工具使用等方面的学习笔记和实践经验。
            所有内容以纯文本格式存储，支持全文搜索，方便随时查阅。
          </p>
        </section>

        {/* Sample Article Card */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
            <span className="w-1 h-6 bg-accent-primary mr-3"></span>
            最新文章
          </h2>
          <div className="bg-bg-secondary rounded-lg p-6 border border-border hover:border-accent-primary transition-colors duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  欢迎来到我的技术博客
                </h3>
                <p className="text-text-secondary mb-4 line-clamp-2">
                  这是我的第一篇博客文章，介绍了这个博客系统的设计理念和未来的规划。
                </p>
                <div className="flex items-center space-x-4 text-sm text-text-muted">
                  <span>2026-01-17</span>
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-accent-primary rounded-full mr-2"></span>
                    博客相关
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-bg-tertiary text-text-secondary text-xs rounded-full border border-border">
                博客
              </span>
              <span className="px-3 py-1 bg-bg-tertiary text-text-secondary text-xs rounded-full border border-border">
                Next.js
              </span>
              <span className="px-3 py-1 bg-bg-tertiary text-text-secondary text-xs rounded-full border border-border">
                开篇
              </span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
            <span className="w-1 h-6 bg-accent-primary mr-3"></span>
            特性
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-bg-secondary rounded-lg p-6 border border-border">
              <div className="w-10 h-10 bg-accent-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-bg-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                全文搜索
              </h3>
              <p className="text-text-secondary text-sm">
                基于 FlexSearch 的客户端全文搜索，快速定位所需内容
              </p>
            </div>
            <div className="bg-bg-secondary rounded-lg p-6 border border-border">
              <div className="w-10 h-10 bg-accent-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-bg-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                移动端友好
              </h3>
              <p className="text-text-secondary text-sm">
                响应式设计，在各种设备上都有良好的阅读体验
              </p>
            </div>
            <div className="bg-bg-secondary rounded-lg p-6 border border-border">
              <div className="w-10 h-10 bg-accent-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-bg-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                代码高亮
              </h3>
              <p className="text-text-secondary text-sm">
                使用 Shiki 提供 VSCode 级别的代码语法高亮
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
