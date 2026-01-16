---
title: "测试 Mermaid 图表功能"
date: "2026-01-17"
summary: "测试博客中各种 Mermaid 图表的渲染效果，包括流程图、时序图、状态图、类图、甘特图等。"
tags: ["Mermaid", "图表", "测试", "功能"]
category: "功能测试"
draft: false
---

## Mermaid 图表测试

本文用于测试 Mermaid 图表在博客中的渲染效果。Mermaid 是一种强大的图表绘制工具，支持多种图表类型。

### 1. 流程图 (Flowchart)

基础流程图示例：

```mermaid
flowchart TD
    A[开始] --> B{是否需要登录?}
    B -->|是| C[显示登录页面]
    B -->|否| D[直接访问内容]
    C --> E[用户输入凭证]
    E --> F{验证成功?}
    F -->|是| D
    F -->|否| G[显示错误信息]
    G --> C
    D --> H[结束]
```

复杂流程图示例：

```mermaid
flowchart LR
    A[用户访问网站] --> B{检查登录状态}
    B -->|已登录| C[显示仪表板]
    B -->|未登录| D[重定向到登录页]
    D --> E[输入用户名密码]
    E --> F{验证}
    F -->|成功| G[生成 Token]
    F -->|失败| H[显示错误]
    G --> I[保存会话]
    I --> C
    H --> D
```

### 2. 时序图 (Sequence Diagram)

用户登录时序图：

```mermaid
sequenceDiagram
    participant User as 用户
    participant Browser as 浏览器
    participant Server as 服务器
    participant DB as 数据库

    User->>Browser: 输入用户名和密码
    Browser->>Server: POST /api/login
    Server->>DB: 查询用户信息
    DB-->>Server: 返回用户数据
    Server->>Server: 验证密码
    alt 密码正确
        Server->>Server: 生成 JWT Token
        Server-->>Browser: 返回 Token (200 OK)
        Browser->>Browser: 保存 Token 到 localStorage
        Browser-->>User: 跳转到仪表板
    else 密码错误
        Server-->>Browser: 返回错误 (401 Unauthorized)
        Browser-->>User: 显示错误提示
    end
```

### 3. 状态图 (State Diagram)

订单状态流转：

```mermaid
stateDiagram-v2
    [*] --> 待支付: 创建订单
    待支付 --> 已支付: 支付成功
    待支付 --> 已取消: 超时/取消
    已支付 --> 配送中: 仓库发货
    配送中 --> 已签收: 用户签收
    配送中 --> 退款中: 申请退款
    退款中 --> 已退款: 退款成功
    已签收 --> [*]
    已取消 --> [*]
    已退款 --> [*]
```

### 4. 类图 (Class Diagram)

博客系统类结构：

```mermaid
classDiagram
    class Article {
        +String title
        +String content
        +Date createdAt
        +String[] tags
        +getReadingTime()
        +getSummary()
    }

    class Tag {
        +String name
        +String slug
        +getArticleCount()
    }

    class User {
        +String username
        +String email
        +getArticles()
    }

    class Comment {
        +String content
        +Date createdAt
        +belongsTo Article
        +belongsTo User
    }

    Article "1" --> "*" Tag : has
    Article "1" --> "*" Comment : has
    User "1" --> "*" Article : writes
    User "1" --> "*" Comment : writes
```

### 5. 实体关系图 (Entity Relationship)

数据库 ER 图：

```mermaid
erDiagram
    ARTICLES ||--o{ TAGS : has
    ARTICLES {
        string title PK
        string content
        date created_at
        string summary
    }
    TAGS {
        string name PK
        string slug
    }
    USERS ||--o{ ARTICLES : writes
    USERS {
        int id PK
        string username
        string email
    }
```

### 6. 甘特图 (Gantt Chart)

项目开发计划：

```mermaid
gantt
    title 博客系统开发计划
    dateFormat  YYYY-MM-DD
    section 基础功能
    初始化项目           :done,    des1, 2026-01-01, 2026-01-03
    实现文章列表         :done,    des2, 2026-01-04, 2026-01-07
    实现文章详情         :done,    des3, 2026-01-08, 2026-01-12
    section 高级功能
    实现搜索功能         :active,  des4, 2026-01-13, 2026-01-17
    添加图表支持         :         des5, 2026-01-18, 2026-01-22
    数学公式渲染         :         des6, 2026-01-18, 2026-01-19
    section 优化部署
    性能优化             :         des7, 2026-01-23, 2026-01-27
    部署到 Vercel        :         des8, 2026-01-28, 2026-01-30
```

### 7. 饼图 (Pie Chart)

技术栈占比：

```mermaid
pie title 技术栈代码占比
    "TypeScript" : 45
    "React/Next.js" : 30
    "CSS/Tailwind" : 15
    "配置文件" : 10
```

### 8. Git 图 (Git Graph)

版本控制历史：

```mermaid
gitGraph
    commit id: "Initial commit"
    commit id: "Add article list"
    commit id: "Add article detail"
    branch develop
    checkout develop
    commit id: "Add search feature"
    commit id: "Fix bug"
    checkout main
    merge develop
    commit id: "Add Mermaid support"
```

### 9. 思维导图 (Mindmap)

博客架构思维导图：

```mermaid
mindmap
  root((博客系统))
    前端
      Next.js
      React
      Tailwind CSS
    后端
      API Routes
      内容管理
    内容
      Markdown
      MDX
      图表支持
    部署
      Vercel
      Git
```

### 10. 时间线 (Timeline)

项目发展历程：

```mermaid
timeline
    title 博客项目发展时间线
    2026-01-01 : 项目启动
    2026-01-03 : 完成基础架构
    2026-01-10 : 核心功能开发完成
    2026-01-15 : 添加搜索功能
    2026-01-17 : 集成图表支持
    2026-01-20 : 性能优化
    2026-01-25 : 正式上线
```

## 总结

Mermaid 提供了丰富的图表类型，可以满足技术博客中各种可视化需求：

- **流程图** - 展示业务流程和算法逻辑
- **时序图** - 描述系统交互和 API 调用
- **状态图** - 展示状态机转换
- **类图** - 展示面向对象设计
- **ER 图** - 展示数据库关系
- **甘特图** - 展示项目计划
- **饼图** - 展示数据占比
- **Git 图** - 展示版本控制历史
- **思维导图** - 展示知识结构
- **时间线** - 展示项目历程

使用方法：在 Markdown 代码块中指定 `mermaid` 语言，然后编写 Mermaid 语法即可。
