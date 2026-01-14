'use client'

import { useEffect, useState, useRef } from 'react'
import Frame from 'react-frame-component'

interface PreviewFrameProps {
  children: React.ReactNode
  viewport: 'desktop' | 'tablet' | 'mobile'
}

const viewportWidths = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
}

export function PreviewFrame({ children, viewport }: PreviewFrameProps) {
  const [styles, setStyles] = useState<string>('')
  const frameRef = useRef<HTMLIFrameElement>(null)

  // Collect all stylesheets from the parent document
  useEffect(() => {
    const collectStyles = () => {
      const styleSheets = Array.from(document.styleSheets)
      let cssText = ''

      styleSheets.forEach((sheet) => {
        try {
          if (sheet.cssRules) {
            Array.from(sheet.cssRules).forEach((rule) => {
              cssText += rule.cssText + '\n'
            })
          }
        } catch (e) {
          // CORS restriction on external stylesheets
          if (sheet.href) {
            cssText += `@import url("${sheet.href}");\n`
          }
        }
      })

      // Also collect inline styles
      document.querySelectorAll('style').forEach((style) => {
        cssText += style.textContent + '\n'
      })

      setStyles(cssText)
    }

    collectStyles()

    // Re-collect on potential style changes
    const observer = new MutationObserver(collectStyles)
    observer.observe(document.head, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  const frameWidth = viewportWidths[viewport]

  return (
    <div
      className="transition-all duration-300 ease-in-out mx-auto"
      style={{
        width: frameWidth,
        maxWidth: '100%',
        height: '100%',
      }}
    >
      <Frame
        ref={frameRef}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: 'white',
        }}
        head={
          <>
            <style>{styles}</style>
            <style>{`
              html, body {
                margin: 0;
                padding: 0;
                overflow-x: hidden;
                background: white;
              }
              /* Ensure Tailwind's responsive utilities work */
              * {
                box-sizing: border-box;
              }
            `}</style>
          </>
        }
      >
        <div className="min-h-screen">
          {children}
        </div>
      </Frame>
    </div>
  )
}
