"use client"

import { useEffect, useState } from "react"

interface QuoteDisplayProps {
  quote: string
}

export function QuoteDisplay({ quote }: QuoteDisplayProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 触发进入动画
    setIsVisible(false)
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [quote])

  return (
    <div
      className={`
        max-w-3xl mx-auto text-center transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
    >
      <blockquote className="relative">
        {/* 装饰引号 */}
        <span className="absolute -top-6 -left-4 md:-left-8 text-6xl md:text-8xl text-warm-accent/30 font-serif leading-none">
          "
        </span>

        {/* 语录文字 */}
        <p className="text-2xl md:text-4xl lg:text-5xl font-serif text-warm-dark leading-relaxed md:leading-loose px-4 md:px-12 text-balance">
          {quote || "加载中..."}
        </p>

        {/* 装饰引号 */}
        <span className="absolute -bottom-12 -right-4 md:-right-8 text-6xl md:text-8xl text-warm-accent/30 font-serif leading-none">
          "
        </span>
      </blockquote>

      {/* 装饰线条 */}
      <div className="mt-16 flex items-center justify-center gap-3">
        <div className="h-px w-12 bg-warm-border"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-warm-accent"></div>
        <div className="h-px w-12 bg-warm-border"></div>
      </div>
    </div>
  )
}
