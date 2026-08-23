"use client"

import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from "react"
import confetti from "canvas-confetti"
import type { Options } from "canvas-confetti"

export type ConfettiRef = { fire: (options?: Options) => void } | null

type ConfettiProps = React.ComponentPropsWithRef<"canvas"> & {
  options?: Options
}

const Confetti = forwardRef<ConfettiRef, ConfettiProps>(({ options, className, ...props }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const instanceRef = useRef<ReturnType<typeof confetti.create> | null>(null)

  const setCanvas = useCallback((node: HTMLCanvasElement | null) => {
    if (node) {
      canvasRef.current = node
      instanceRef.current = confetti.create(node, { resize: true, useWorker: true })
    } else {
      instanceRef.current?.reset()
      instanceRef.current = null
      canvasRef.current = null
    }
  }, [])

  const fire = useCallback((nextOptions: Options = {}) => {
    instanceRef.current?.({ ...options, ...nextOptions })
  }, [options])

  const api = useMemo(() => ({ fire }), [fire])
  useImperativeHandle(ref, () => api, [api])

  return <canvas ref={setCanvas} aria-hidden="true" className={className} {...props} />
})

Confetti.displayName = "Confetti"

export { Confetti }
