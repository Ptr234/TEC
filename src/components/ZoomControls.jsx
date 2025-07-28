import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusIcon, MinusIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline'
import { useNotification } from '../contexts/NotificationContext'
import { ZOOM_CONFIG } from '../config/constants'
import { safeLocalStorage, handleError, errorCodes } from '../utils/errorHandler'

const ZoomControls = () => {
  const [zoomLevel, setZoomLevel] = useState(ZOOM_CONFIG.default)
  const { showInfo } = useNotification()

  useEffect(() => {
    try {
      // Apply zoom using CSS transform for better performance
      const scale = zoomLevel / 100
      document.body.style.transform = `scale(${scale})`
      document.body.style.transformOrigin = 'top left'
      document.body.style.width = `${100 / scale}%`
      document.body.style.height = `${100 / scale}%`
      
      // Store zoom level in localStorage
      safeLocalStorage.set('zoomLevel', zoomLevel)
    } catch (error) {
      handleError(error, { context: 'zoom-apply', zoomLevel })
    }
  }, [zoomLevel])

  useEffect(() => {
    // Load zoom level from localStorage on mount
    const savedZoom = safeLocalStorage.get('zoomLevel', ZOOM_CONFIG.default)
    if (typeof savedZoom === 'number' && savedZoom >= ZOOM_CONFIG.min && savedZoom <= ZOOM_CONFIG.max) {
      setZoomLevel(savedZoom)
    }
  }, [])

  const zoomIn = () => {
    if (zoomLevel < ZOOM_CONFIG.max) {
      const newZoom = Math.min(zoomLevel + ZOOM_CONFIG.step, ZOOM_CONFIG.max)
      setZoomLevel(newZoom)
      showInfo('Zoom', `Zoomed in to ${newZoom}%`)
    }
  }

  const zoomOut = () => {
    if (zoomLevel > ZOOM_CONFIG.min) {
      const newZoom = Math.max(zoomLevel - ZOOM_CONFIG.step, ZOOM_CONFIG.min)
      setZoomLevel(newZoom)
      showInfo('Zoom', `Zoomed out to ${newZoom}%`)
    }
  }

  const resetZoom = () => {
    setZoomLevel(ZOOM_CONFIG.default)
    showInfo('Zoom', `Reset to ${ZOOM_CONFIG.default}%`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-24 left-6 z-40 flex flex-col gap-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-2 border border-gray-200"
    >
      {/* Zoom In */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={zoomIn}
        disabled={zoomLevel >= ZOOM_CONFIG.max}
        className={`flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 ${
          zoomLevel >= ZOOM_CONFIG.max 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
        aria-label="Zoom in"
      >
        <PlusIcon className="w-5 h-5" />
      </motion.button>

      {/* Zoom Level Display */}
      <motion.div
        className="flex items-center justify-center w-12 h-10 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg"
      >
        {zoomLevel}%
      </motion.div>

      {/* Reset Zoom */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetZoom}
        disabled={zoomLevel === ZOOM_CONFIG.default}
        className={`flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 ${
          zoomLevel === ZOOM_CONFIG.default 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
        aria-label="Reset zoom"
      >
        <ArrowsPointingOutIcon className="w-5 h-5" />
      </motion.button>

      {/* Zoom Out */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={zoomOut}
        disabled={zoomLevel <= ZOOM_CONFIG.min}
        className={`flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 ${
          zoomLevel <= ZOOM_CONFIG.min 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-red-500 hover:bg-red-600 text-white'
        }`}
        aria-label="Zoom out"
      >
        <MinusIcon className="w-5 h-5" />
      </motion.button>
    </motion.div>
  )
}

export default ZoomControls