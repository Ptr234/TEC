import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const BackgroundTheme = () => {
  const { theme, isAutoRotate } = useTheme()

  const backgroundStyle = useMemo(() => {
    const style = {
      background: theme.background,
      backgroundAttachment: 'fixed'
    }
    
    // Add additional properties for image backgrounds
    if (theme.backgroundSize) {
      style.backgroundSize = theme.backgroundSize
    } else {
      style.backgroundSize = 'cover'
    }
    
    if (theme.backgroundPosition) {
      style.backgroundPosition = theme.backgroundPosition
    } else {
      style.backgroundPosition = 'center'
    }
    
    return style
  }, [theme.background, theme.backgroundSize, theme.backgroundPosition])

  return (
    <>
      {/* Main background */}
      <motion.div
        key={theme.name}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 -z-10"
        style={backgroundStyle}
      />
      
      {/* Overlay for better readability */}
      <div className="fixed inset-0 -z-5 bg-white/10 backdrop-blur-[1px]" />
      
      {/* Subtle animated particles for visual interest */}
      <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Auto-rotate indicator */}
      {isAutoRotate && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-4 left-4 z-20 bg-black/20 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full"
        >
          🔄 Auto Theme
        </motion.div>
      )}
    </>
  )
}

export default BackgroundTheme