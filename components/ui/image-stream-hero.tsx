"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export type CorridorPath = { perspective?: number; cardWidth?: number; cardHeight?: number; cardRadius?: number; birthHeight?: number; exitHeight?: number; railBirth?: number; railExit?: number; fan?: number; turnBirth?: number; turnExit?: number; stops?: number }

type StreamImage = { src: string; alt?: string }

type ImageStreamHeroProps = React.ComponentProps<"div"> & {
  images: StreamImage[]
  cards?: number
  speed?: number
  axis?: number
  path?: CorridorPath
  children?: React.ReactNode
}

const DEFAULT_PATH: Required<CorridorPath> = { perspective: 30, cardWidth: 24, cardHeight: 31, cardRadius: 0.4, birthHeight: 19, exitHeight: 28, railBirth: -58, railExit: 78, fan: 1.15, turnBirth: 0, turnExit: 0, stops: 36 }

function makeKeyframes(name: string, path: Required<CorridorPath>) {
  const stops = Array.from({ length: path.stops + 1 }, (_, index) => {
    const progress = index / path.stops
    const scale = 1
    const z = 0
    const rail = path.railBirth + (path.railExit - path.railBirth) * progress
    const turn = path.turnBirth + (path.turnExit - path.turnBirth) * progress
    const opacity = 1
    return `${(progress * 100).toFixed(2)}%{opacity:${Math.max(0, Math.min(1, opacity)).toFixed(2)};transform:translate3d(${rail.toFixed(2)}cqw,0,${z.toFixed(2)}cqw) scale(${scale.toFixed(3)}) rotateY(${(-turn).toFixed(2)}deg)}`
  }).join("")
  return `@keyframes ${name}{${stops}}`
}

export function ImageStreamHero({ images, cards = 7, speed = 30, axis = 55, path, children, className, ...props }: ImageStreamHeroProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const right = `stream-right-${id}`
  const cardClass = `stream-card-${id}`
  const corridor = React.useMemo(() => ({ ...DEFAULT_PATH, ...path }), [path])
  const keyframes = React.useMemo(() => makeKeyframes(right, corridor), [corridor, right])

  return (
    <div className={cn("relative h-[360px] overflow-hidden bg-background sm:h-[460px]", className)} {...props}>
      <style>{`${keyframes}@media(prefers-reduced-motion:reduce){.${cardClass}{animation-play-state:paused}}`}</style>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 [perspective:30cqw]">
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {[0, 1].map((track) => images.map((image, index) => {
            return <div key={`${track}-${index}`} className={`${cardClass} stream-card absolute left-1/2 top-1/2 overflow-hidden border border-border/50 bg-muted shadow-2xl`} style={{ width: `${corridor.cardWidth}cqw`, height: `${corridor.cardHeight}cqw`, marginLeft: `${-corridor.cardWidth / 2}cqw`, marginTop: `${-corridor.cardHeight / 2}cqw`, borderRadius: `${corridor.cardRadius}cqw`, animation: `${right} ${speed}s linear infinite`, animationDelay: `${-((index + track * images.length) * speed) / (images.length * 0.82)}s`, transformOrigin: "center center", backfaceVisibility: "hidden" }}><Image src={image.src} alt={image.alt ?? ""} fill sizes="(max-width: 640px) 42vw, (max-width: 1024px) 24vw, 240px" quality={72} loading="lazy" className="object-cover" draggable={false} /></div>
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
