import { getArticlesByTag, getAllTags } from "@/lib/content";
import { ArticleCard } from "@/components/article-card";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

// Generate static params for all tags at build time
export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

// Generate metadata for each tag page
export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `标签: ${decodedTag} - 个人技术博客`,
    description: `查看所有标签为 "${decodedTag}" 的文章`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  // Get articles for this tag
  const articles = await getArticlesByTag(decodedTag);

  // If tag doesn't exist or has no articles, show 404
  if (articles.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-text-secondary hover:text-accent-primary transition-colors duration-200"
              >
                首页
              </Link>
            </li>
            <li className="text-text-muted">/</li>
            <li className="text-text-muted">标签</li>
            <li className="text-text-muted">/</li>
            <li className="text-accent-primary font-medium">{decodedTag}</li>
          </ol>
        </nav>

        {/* Header */}
        <section className="mb-12">
          <div className="flex items-center mb-4">
            <span className="w-1 h-8 bg-accent-primary mr-4"></span>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
              标签: {decodedTag}
            </h1>
          </div>
          <p className="text-text-secondary text-lg">
            共 {articles.length} 篇文章
          </p>
        </section>

        {/* Article List */}
        <section>
          <div className="grid gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        {/* Back to Home */}
        <section className="mt-12 pt-8 border-t border-border">
          <Link
            href="/"
            className="inline-flex items-center text-text-secondary hover:text-accent-primary transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            返回首页
          </Link>
        </section>
      </div>
    </main>
  );
}
