import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMobile } from '../contexts/MobileContext'
import { useNotification } from '../contexts/NotificationContext'

const SwipeGestures = ({ sections, currentSection, setCurrentSection }) => {
  const { isTouchDevice } = useMobile()
  const { showInfo } = useNotification()
  const [isEnabled, setIsEnabled] = useState(true)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 })

  const minSwipeDistance = 50

  useEffect(() => {
    if (!isTouchDevice || !isEnabled) return

    const handleTouchStart = (e) => {
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      })
    }

    const handleTouchMove = (e) => {
      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      })
    }

    const handleTouchEnd = () => {
      if (!touchStart.x || !touchStart.y) return

      const deltaX = touchStart.x - touchEnd.x
      const deltaY = touchStart.y - touchEnd.y
      const absDeltaX = Math.abs(deltaX)
      const absDeltaY = Math.abs(deltaY)

      // Only trigger swipe if it's more horizontal than vertical
      if (absDeltaX > absDeltaY && absDeltaX > minSwipeDistance) {
        if (deltaX > 0) {
          // Swipe left - next section
          navigateToNextSection()
        } else {
          // Swipe right - previous section
          navigateToPreviousSection()
        }
      } else if (absDeltaY > absDeltaX && absDeltaY > minSwipeDistance) {
        if (deltaY > 0) {
          // Swipe up - scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' })
          showSwipeFeedback('Scroll to Top', '⬆️')
        } else {
          // Swipe down - open search or scroll down
          const searchButton = document.querySelector('[aria-label="Toggle search"]')
          if (searchButton) {
            searchButton.click()
            showSwipeFeedback('Search Opened', '🔍')
          }
        }
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isTouchDevice, isEnabled, touchStart, touchEnd])

  const navigateToNextSection = () => {
    const currentIndex = sections.indexOf(currentSection)
    const nextIndex = (currentIndex + 1) % sections.length
    const nextSection = sections[nextIndex]
    
    const element = document.getElementById(nextSection)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setCurrentSection(nextSection)
      showSwipeFeedback(nextSection.toUpperCase(), '→')
    }
  }

  const navigateToPreviousSection = () => {
    const currentIndex = sections.indexOf(currentSection)
    const prevIndex = currentIndex <= 0 ? sections.length - 1 : currentIndex - 1
    const prevSection = sections[prevIndex]
    
    const element = document.getElementById(prevSection)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setCurrentSection(prevSection)
      showSwipeFeedback(prevSection.toUpperCase(), '←')
    }
  }

  const showSwipeFeedback = (text, icon) => {
    setFeedbackText(`${icon} ${text}`)
    setShowFeedback(true)
    setTimeout(() => setShowFeedback(false), 1500)
  }

  if (!isTouchDevice) return null

  return (
    <>
      {/* Swipe Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm font-medium z-50 pointer-events-none"
          >
            {feedbackText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipe Instructions (shown briefly on first visit) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-2 rounded-full z-20 pointer-events-none md:hidden"
      >
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: 2 }}
        >
          👆 Swipe to navigate
        </motion.div>
      </motion.div>
    </>
  )
}

export default SwipeGestures