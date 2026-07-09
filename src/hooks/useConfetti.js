import { useCallback, useEffect, useRef } from 'react'

const COLORS = ['#D8296A', '#2EC4B6', '#E8A33D', '#8675A9', '#4FC1E9']

export function useConfetti() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const rafIdRef = useRef(null)

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  const tick = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particlesRef.current.forEach((p) => {
      p.vx *= p.drag
      p.vy = p.vy * p.drag + p.gravity
      p.x += p.vx
      p.y += p.vy
      p.rotation += p.rotationSpeed
      p.life++

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.fillStyle = p.color
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
      } else {
        ctx.beginPath()
        ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    })

    particlesRef.current = particlesRef.current.filter(
      (p) => p.y < canvas.height + 40 && p.life < 500,
    )

    if (particlesRef.current.length > 0) {
      rafIdRef.current = requestAnimationFrame(tick)
    } else {
      rafIdRef.current = null
    }
  }, [])

  const spawnParticles = useCallback(
    (originXRatio, count) => {
      const canvas = canvasRef.current
      if (!canvas) return

      resizeCanvas()
      const originX = canvas.width * originXRatio
      const originY = canvas.height * 0.8

      for (let i = 0; i < count; i++) {
        const angle = (Math.random() * 60 + 60) * (Math.PI / 180)
        const speed = 6 + Math.random() * 9
        particlesRef.current.push({
          x: originX,
          y: originY,
          vx:
            Math.cos(angle) * speed * (originXRatio < 0.5 ? 1 : -1) +
            (Math.random() - 0.5) * 4,
          vy: -Math.sin(angle) * speed,
          size: 6 + Math.random() * 6,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 14,
          shape: Math.random() < 0.5 ? 'rect' : 'circle',
          gravity: 0.28 + Math.random() * 0.08,
          drag: 0.992,
          life: 0,
        })
      }

      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(tick)
      }
    },
    [resizeCanvas, tick],
  )

  const burst = useCallback(() => {
    spawnParticles(0.15, 55)
    spawnParticles(0.5, 45)
    spawnParticles(0.85, 55)
  }, [spawnParticles])

  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const timers = [
      setTimeout(burst, 400),
      setTimeout(burst, 1300),
      setTimeout(burst, 2200),
    ]

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      timers.forEach(clearTimeout)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [burst, resizeCanvas])

  return { canvasRef, burst, spawnParticles }
}
