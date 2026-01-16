---
title: "数学公式测试"
date: "2026-01-17"
summary: "测试博客中的数学公式渲染功能，使用 KaTeX 进行 LaTeX 公式渲染。"
tags: ["测试", "数学", "KaTeX"]
category: "测试"
draft: false
---

# 数学公式测试

这篇文章用于测试博客中的数学公式渲染功能。我们使用 KaTeX 来渲染 LaTeX 格式的数学公式。

## 行内公式

行内公式使用单个美元符号 `$...$` 包裹。例如，著名的质能方程是 $E = mc^2$，勾股定理是 $a^2 + b^2 = c^2$。

再比如，欧拉公式被认为是数学中最美的公式之一：$e^{i\pi} + 1 = 0$。

## 块级公式

块级公式使用双美元符号 `$$...$$` 包裹，会单独显示在一行。

### 基础公式

二次方程的求根公式：

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

圆的面积公式：

$$
A = \pi r^2
$$

### 微积分

定积分示例：

$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

导数示例：

$$
\frac{d}{dx}\left( \int_{a}^{x} f(t) dt \right) = f(x)
$$

### 线性代数

矩阵乘法：

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\begin{pmatrix}
x \\
y
\end{pmatrix}
=
\begin{pmatrix}
ax + by \\
cx + dy
\end{pmatrix}
$$

行列式计算：

$$
\det(\mathbf{A}) = \sum_{\sigma \in S_n} \text{sgn}(\sigma) \prod_{i=1}^{n} a_{i,\sigma(i)}
$$

### 求和与乘积

求和符号：

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

乘积符号：

$$
\prod_{i=1}^{n} i = n!
$$

### 极限

极限定义：

$$
\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e
$$

### 统计学

正态分布概率密度函数：

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}
$$

贝叶斯定理：

$$
P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}
$$

## 复杂公式示例

傅里叶变换：

$$
\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x) e^{-2\pi i x \xi} dx
$$

薛定谔方程：

$$
i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \left[ -\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r},t) \right]\Psi(\mathbf{r},t)
$$

## 分式和根号

复杂的分式：

$$
\frac{1}{1 + \frac{1}{1 + \frac{1}{1 + \frac{1}{x}}}}
$$

嵌套根号：

$$
\sqrt{1 + \sqrt{1 + \sqrt{1 + \sqrt{1 + \cdots}}}}
$$

## 总结

KaTeX 支持完整的 LaTeX 数学语法，可以渲染各种复杂的数学公式。无论是简单的代数公式，还是复杂的微积分、线性代数公式，都能正确显示。

这使得博客非常适合记录技术笔记，特别是涉及到数学推导的内容。
