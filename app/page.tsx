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
        "我就是自己一直在寻找的人。",
        "我的选择让我的人生独一无二。",
        "我选择相信而非怀疑。",
        "我可以选择害怕，但我选择了勇敢。",
        "我所经历的一切都有意义。",
        "重要的不是我来自何处，而是我去往何方。",
        "我已经很勇敢了，我做了我能做的事，我在我自己的意义上前进着。",
        "我是一个独特的、无与伦比的人。",
        "我拥抱自己的身体并对它说：“一直以来谢谢你”。",
        "我生命中的每一次选择，都是源于对自己的深深关怀与了解。",
        "我接纳、欣赏和爱护自己，不带任何条件。",
        "“迷路”本身就是走路的一部分。",
        "我会喜欢现在的我，接受过去的我，期待未来的我。",
        "不慌，我可以慢慢走。",
        "我的敏感就是我的天赋，我很有灵气也很敏锐，我很坚韧也很强大。",
        "我可以等泪干，等体力恢复，等悲伤退潮，等难关过去。",
        "我允许自己先放松一下，再出发向前。",
        "我学会了说不，因为我了解自己真正想要什么。",
        "我接受今天的自己，不完美也很可爱。",
        "我不美化那些没走过的路，而是坚定不移地走好我脚下这条。",
        "我不会失败，因为我要么收获成功，要么收获成长。",
        "每个早晨都是新的开始，美好的事情即将发生。",
        "我有千千万万种可能。",
        "我爱我自己，我相信我自己，我支持我自己。",
        "人生的容错率大到无法想象，我完全可以失败。",
        "我平静地去爱，毫不含糊地去信任，不带自嘲地去希望，勇敢地付诸行动。",
        "新的一天我带着希望和决心出发。",
        "我可以暂停一下，休息也是生活的一部分。",
        "我允许自己感到艰难，今天的我依然坚强。",
        "世界在我眼前自行展开，我能去任何地方，做任何事情，成为任何人。",
        "我的每一次尝试都是宝贵的。",
        "未竟之事如树叶落下，我让自己休息，等待新生。",
        "我的每一天都可以重新开始。",
        "我会定期联系朋友，情感联系让我更温暖。",
        "我是自己永恒的战友，而不再渴望成为另一个人。",
        "无论面对什么挑战，我选择善良而坚韧。",
        "我今天做的一切都值得骄傲。",
        "我愿意放下成见去拥抱变化的美妙。",
        "世界物欲横流，我重视精神的富有。",
        "我凭借坚定的使命感在世界中航行。",
        "我不需要完美的起点，现在就是我行动的最佳时机。"
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
