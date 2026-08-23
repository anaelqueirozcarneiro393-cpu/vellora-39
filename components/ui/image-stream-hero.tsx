"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type StreamImage = { src: string; alt?: string }

type ImageStreamHeroProps = React.ComponentProps<"div"> & {
  images: StreamImage[]
  cards?: number
  speed?: number
  axis?: number
  children?: React.ReactNode
}

export function ImageStreamHero({ images, cards = 8, speed = 22, axis = 52, children, className, ...props }: ImageStreamHeroProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const keyframe = React.useMemo(() => {
    const stops = Array.from({ length: 13 }, (_, index) => {
      const progress = index / 12
      const scale = 0.16 + progress * 1.55
      const x = 50 + (progress * 52 + 5) * scale
      const y = axis + (progress - 0.5) * 8
      return `${progress * 100}%{transform:translate3d(${x - 50}cqw,${y - axis}cqw,${progress * 20}cqw) scale(${scale}) rotateY(-${6 + progress * 18}deg)}`
    }).join("")
    return `@keyframes stream-${id}{${stops}}`
  }, [axis, id])

  return (
    <div className={cn("relative h-[360px] overflow-hidden bg-background sm:h-[460px]", className)} {...props}>
      <style>{`.stream-card-${id}{animation:stream-${id} ${speed}s linear infinite;animation-fill-mode:both}@media(prefers-reduced-motion:reduce){.stream-card-${id}{animation-play-state:paused}}`}</style>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 [perspective:30cqw]">
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {[1, -1].map((direction) => Array.from({ length: cards }, (_, index) => {
            const image = images[index % images.length]
            return <div key={`${direction}-${index}`} className={`stream-card-${id} absolute left-1/2 top-1/2 aspect-[4/5] w-[22cqw] min-w-24 overflow-hidden rounded-[1.2cqw] border border-border/50 bg-muted shadow-2xl`} style={{ marginLeft: `${direction * 1}cqw`, animationDelay: `${-(index * speed) / cards}s`, transformOrigin: direction === 1 ? "left center" : "right center" }}><img src={image.src} alt={image.alt ?? ""} loading="lazy" decoding="async" className="size-full object-cover" draggable={false} /></div>
          }))}
        </div>
      </div>
      <div className="relative z-10 flex size-full flex-col items-center justify-center bg-gradient-to-b from-background/10 via-transparent to-background/70 text-center">
        {children}
      </div>
    </div>
  )
}

export default ImageStreamHero
