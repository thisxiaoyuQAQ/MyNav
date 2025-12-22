"use client"

import { useEffect } from 'react'
import { AppConfig } from '@/types'

export interface RGBColor {
  r: number
  g: number
  b: number
}

export interface HSLColor {
  h: number
  s: number
  l: number
}

/**
 * Convert RGB color to HSL
 */
export function rgbToHsl(r: number, g: number, b: number): HSLColor {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
  }
}

/**
 * Adjust HSL color values
 */
export function adjustHsl(
  hsl: HSLColor,
  adjustments: {
    hue?: number
    saturation?: number
    lightness?: number
  }
): HSLColor {
  return {
    h: ((hsl.h + (adjustments.hue || 0)) + 360) % 360,
    s: Math.max(0, Math.min(100, hsl.s + (adjustments.saturation || 0))),
    l: Math.max(0, Math.min(100, hsl.l + (adjustments.lightness || 0))),
  }
}

/**
 * Convert HSL to CSS hsl string
 */
export function hslToString(hsl: HSLColor): string {
  return `${hsl.h} ${hsl.s}% ${hsl.l}%`
}

/**
 * Generate a complete theme based on a base color
 */
export function generateThemeFromColor(rgb: RGBColor): {
  light: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    card: string
    border: string
    ring: string
  }
  dark: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    card: string
    border: string
    ring: string
  }
} {
  const baseHsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  // Light mode
  const light = {
    primary: hslToString(baseHsl),
    secondary: hslToString(adjustHsl(baseHsl, { lightness: 10 })),
    accent: hslToString(adjustHsl(baseHsl, { hue: 30 })),
    background: '0 0% 100%',
    foreground: '222.2 84% 4.9%',
    card: '0 0% 100%',
    border: '214.3 31.8% 91.4%',
    ring: hslToString(baseHsl),
  }

  // Dark mode - adjusted for better contrast
  const dark = {
    primary: hslToString(adjustHsl(baseHsl, { saturation: -10, lightness: 10 })),
    secondary: hslToString(adjustHsl(baseHsl, { saturation: -15, lightness: 5 })),
    accent: hslToString(adjustHsl(baseHsl, { hue: 30, saturation: -10, lightness: 10 })),
    background: '222.2 84% 4.9%',
    foreground: '210 40% 98%',
    card: '222.2 84% 4.9%',
    border: '217.2 32.6% 33.5%',
    ring: '224.3 76.3% 94.1%',
  }

  return { light, dark }
}

/**
 * Apply theme color to CSS variables
 */
export function applyThemeColor(rgb?: RGBColor): void {
  if (!rgb) {
    // Reset to default theme
    document.documentElement.style.removeProperty('--primary')
    document.documentElement.style.removeProperty('--primary-foreground')
    document.documentElement.style.removeProperty('--secondary')
    document.documentElement.style.removeProperty('--secondary-foreground')
    document.documentElement.style.removeProperty('--accent')
    document.documentElement.style.removeProperty('--accent-foreground')
    document.documentElement.style.removeProperty('--ring')
    return
  }

  const theme = generateThemeFromColor(rgb)

  function applyMode(mode: 'light' | 'dark', themeObj: any): void {
    const modeSelector = mode === 'dark' ? '.dark' : ':root'
    const style = document.documentElement.style

    // Apply theme variables
    style.setProperty('--primary', themeObj.primary)
    style.setProperty('--primary-foreground', mode === 'dark' ? '222.2 84% 4.9%' : '210 40% 98%')
    style.setProperty('--secondary', themeObj.secondary)
    style.setProperty('--secondary-foreground', mode === 'dark' ? '210 40% 98%' : '222.2 84% 4.9%')
    style.setProperty('--accent', themeObj.accent)
    style.setProperty('--accent-foreground', mode === 'dark' ? '210 40% 98%' : '222.2 84% 4.9%')
    style.setProperty('--ring', themeObj.ring)
  }

  applyMode('light', theme.light)

  // Apply dark mode to .dark class
  const darkStyles = `
    .dark {
      --primary: ${theme.dark.primary};
      --primary-foreground: 222.2 84% 4.9%;
      --secondary: ${theme.dark.secondary};
      --secondary-foreground: 210 40% 98%;
      --accent: ${theme.dark.accent};
      --accent-foreground: 210 40% 98%;
      --ring: ${theme.dark.ring};
    }
  `

  // Remove existing style if any
  const existingStyle = document.querySelector('#dynamic-theme')
  if (existingStyle) {
    existingStyle.remove()
  }

  // Add new style
  const styleSheet = document.createElement('style')
  styleSheet.id = 'dynamic-theme'
  styleSheet.textContent = darkStyles
  document.head.appendChild(styleSheet)
}

/**
 * Validate RGB color
 */
export function validateRgbColor(color: any): color is RGBColor {
  return (
    color &&
    typeof color === 'object' &&
    typeof color.r === 'number' &&
    typeof color.g === 'number' &&
    typeof color.b === 'number' &&
    color.r >= 0 &&
    color.r <= 255 &&
    color.g >= 0 &&
    color.g <= 255 &&
    color.b >= 0 &&
    color.b <= 255
  )
}

/**
 * Hook to apply theme from config
 */
export function useTheme(config: AppConfig): void {
  useEffect(() => {
    if (config.themeColor && validateRgbColor(config.themeColor)) {
      applyThemeColor(config.themeColor)
    } else {
      applyThemeColor(undefined)
    }
  }, [config.themeColor])
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): RGBColor | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Convert RGB color to hex
 */
export function rgbToHex({ r, g, b }: RGBColor): string {
  return `#${[r, g, b].map((x) => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')}`
}
