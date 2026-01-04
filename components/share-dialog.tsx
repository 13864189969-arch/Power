"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageCircle, Check } from "lucide-react"
import { useState } from "react"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  quote: string
}

export function ShareDialog({ open, onOpenChange, quote }: ShareDialogProps) {
  const [wechatCopied, setWechatCopied] = useState(false)

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareText = `${quote} - 能量加油站`

  const shareToWeibo = () => {
    const url = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`
    window.open(url, "_blank", "width=600,height=400")
  }

  const shareToWechat = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setWechatCopied(true)
      setTimeout(() => setWechatCopied(false), 3000)
    } catch (err) {
      console.error("复制失败:", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-warm-dark">分享这句话</DialogTitle>
          <DialogDescription className="text-warm-muted">将这份能量传递给更多人</DialogDescription>
        </DialogHeader>

        {/* 语录预览 */}
        <div className="my-4 p-4 bg-warm-light/50 rounded-lg border border-warm-border">
          <p className="text-sm font-serif text-warm-dark italic text-center">"{quote}"</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={shareToWechat}
            className="gap-2 border-warm-border hover:bg-warm-light bg-transparent"
          >
            {wechatCopied ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                已复制
              </>
            ) : (
              <>
                <MessageCircle className="h-4 w-4" />
                微信
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={shareToWeibo}
            className="gap-2 border-warm-border hover:bg-warm-light bg-transparent"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.63 12.09c-.33 0-.6.27-.6.6s.27.6.6.6.6-.27.6-.6-.27-.6-.6-.6zm3.35 0c-.33 0-.6.27-.6.6s.27.6.6.6.6-.27.6-.6-.27-.6-.6-.6zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-.84 13.5c-3.22 0-5.83-1.8-5.83-4.02 0-2.22 2.61-4.02 5.83-4.02s5.83 1.8 5.83 4.02c0 2.22-2.61 4.02-5.83 4.02z" />
            </svg>
            微博
          </Button>
        </div>

        {wechatCopied && (
          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
            <p className="text-sm text-green-700 text-center font-medium">链接已复制，去微信粘贴分享吧</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
