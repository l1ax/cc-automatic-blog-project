---
title: "欢迎来到我的技术博客"
date: "2026-01-17"
summary: "这是我的个人技术博客，用于记录和分享编程学习笔记和技术思考。"
tags: ["博客", "Next.js", "开篇"]
category: "博客相关"
draft: false
---

# 欢迎来到我的技术博客

这是一个基于 Next.js 构建的静态博客系统，主要目的是为了记录和整理我的技术学习笔记。

## 为什么写博客？

作为一名开发者，在日常工作和学习中会接触到各种各样的技术知识点。如果只是简单的记在笔记软件里，时间久了很容易遗忘，而且缺乏系统性。

写博客的好处：

- **知识沉淀**：将学到的知识系统化整理
- **快速检索**：通过搜索快速找到需要的内容
- **思维梳理**：写作过程本身就是对知识的再思考
- **长期积累**：形成个人的知识库

## 技术栈

这个博客使用了以下技术：

- **Next.js 15**：React 框架，使用 App Router
- **TypeScript**：类型安全
- **Tailwind CSS**：样式框架
- **MDX**：支持在 Markdown 中使用 React 组件

## 示例代码

这里是一些代码示例，用于测试代码高亮功能：

```typescript
// TypeScript 示例
interface BlogPost {
  title: string;
  date: Date;
  content: string;
}

const createPost = (post: BlogPost): void => {
  console.log(`Creating post: ${post.title}`);
};
```

```python
# Python 示例
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

```rust
// Rust 示例
fn main() {
    let greeting = "Hello, World!";
    println!("{}", greeting);
}
```

## 期待

这个博客主要是为我自己服务的，用于：
- 记录学习笔记
- 整理技术方案
- 沉淀项目经验

希望能通过写作的方式，让知识更加系统和持久。
