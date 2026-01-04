"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { QuoteDisplay } from "@/components/quote-display"
import { ShareDialog } from "@/components/share-dialog"

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState("")
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    // 设置当前日期
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    }
    setCurrentDate(date.toLocaleDateString("zh-CN", options))

    // 获取今天的语录
    const quote = getTodayQuote()
    setCurrentQuote(quote)
  }, [])

  const getTodayQuote = () => {
    // 示例语录数据 - 你可以稍后替换为你的数据
    const quotes = [
      "每一个清晨都是新的开始，带着希望和勇气出发。",
      "你比你想象的更强大，比你看起来更勇敢。",
      "生活不是等待暴风雨过去，而是学会在雨中跳舞。",
      "星光不问赶路人，时光不负有心人。",
      "所有的努力都不会被辜负，所有的坚持都有意义。",
      "愿你在被打击时，记起你的珍贵,抵抗恶意。",
      "慢慢来，一切都来得及，一切都会变好。",
      "你要相信，没有到不了的明天。",
      "世界很大，风景很美，机会很多，人生很短。",
      "保持热爱，奔赴山海，忠于自己，热爱生活。",
    ]

    // 获取今天的日期作为key
    const today = new Date().toDateString()

    // 从localStorage获取今天的访问记录
    const todayData = localStorage.getItem("energyStation_" + today)

    if (todayData) {
      const data = JSON.parse(todayData)
      // 如果今天访问次数小于3，返回新的随机语录
      if (data.visitCount < 3) {
        const randomIndex = Math.floor(Math.random() * quotes.length)
        const newQuote = quotes[randomIndex]
        data.quotes.push(newQuote)
        data.visitCount += 1
        localStorage.setItem("energyStation_" + today, JSON.stringify(data))
        return newQuote
      } else {
        // 超过3次后，循环显示今天的3句话
        const index = (data.visitCount - 3) % 3
        data.visitCount += 1
        localStorage.setItem("energyStation_" + today, JSON.stringify(data))
        return data.quotes[index]
      }
    } else {
      // 第一次访问，创建今天的数据
      const randomIndex = Math.floor(Math.random() * quotes.length)
      const newQuote = quotes[randomIndex]
      const newData = {
        visitCount: 1,
        quotes: [newQuote],
      }
      localStorage.setItem("energyStation_" + today, JSON.stringify(newData))
      return newQuote
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-warm-light via-cream to-warm-accent">
      <header className="pt-16 md:pt-12 px-6 animate-fade-in-down">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <h1 className="text-base md:text-lg font-serif text-warm-dark/40 tracking-widest font-light">能量加油站</h1>
          <p className="text-xs md:text-sm text-warm-muted/60 font-light tracking-wider">{currentDate}</p>
        </div>
      </header>

      {/* 中央语录显示区 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 gap-8 md:gap-12">
        <QuoteDisplay quote={currentQuote} />

        <div className="animate-fade-in-up">
          <Button
            size="sm"
            onClick={() => setIsShareOpen(true)}
            className="gap-2 bg-warm-dark/60 hover:bg-warm-dark/80 text-white/90 border border-warm-dark/20 shadow-sm"
          >
            <Share2 className="h-3.5 w-3.5" />
            分享
          </Button>
        </div>
      </div>

      <footer className="pb-16 md:pb-8 px-6 animate-fade-in">
        <p className="text-center text-sm md:text-base text-warm-muted/70 font-kaiti tracking-[0.3em]">
          我的每一天都值得被肯定
        </p>
      </footer>

      {/* 分享对话框 */}
      <ShareDialog open={isShareOpen} onOpenChange={setIsShareOpen} quote={currentQuote} />
    </main>
  )
}
