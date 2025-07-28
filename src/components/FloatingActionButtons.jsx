import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon,
  DocumentArrowDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useNotification } from '../contexts/NotificationContext'
import { useMobile } from '../contexts/MobileContext'

const FloatingActionButtons = () => {
  const { showSuccess, showInfo } = useNotification()
  const { isMobile } = useMobile()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const openChat = () => {
    const whatsappUrl = 'https://wa.me/+256775692335'
    const message = encodeURIComponent('Hello! I need assistance with OneStopCentre Uganda services.')
    window.open(`${whatsappUrl}?text=${message}`, '_blank')
    showSuccess('WhatsApp Support', 'Opening WhatsApp chat for instant support')
    setIsExpanded(false)
  }

  const downloadBankableProjects = async () => {
    const downloadUrl = 'https://github.com/Ptr234/TEC/raw/main/Bankable%20Projects%20-%202025.3%20comp.pdf'
    
    setIsDownloading(true)
    showInfo('PDF Download', 'PDF download processing...', 6000)
    
    try {
      // Check if download is supported
      if (typeof document !== 'undefined') {
        // Create download link
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = 'Bankable Projects - 2025.3 comp.pdf'
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        
        // Add to DOM, click, and remove
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Show success after a short delay
        setTimeout(() => {
          setIsDownloading(false)
          showSuccess('Download Started', 'Bankable Projects PDF download initiated')
        }, 2000)
      } else {
        throw new Error('Document not available')
      }
      
    } catch (error) {
      console.error('Download error:', error)
      // Fallback - open in new tab
      try {
        window.open(downloadUrl, '_blank', 'noopener,noreferrer')
      } catch (fallbackError) {
        console.error('Fallback download error:', fallbackError)
      }
      setIsDownloading(false)
      showInfo('Download Alternative', 'Opening PDF in new tab - download may follow')
    }
    
    setIsExpanded(false)
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Individual Action Buttons */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {/* Chat Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openChat}
              className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5 flex-shrink-0" />
              <span className="sr-only sm:not-sr-only">Talk to Us</span>
              <span className={`${isMobile ? 'hidden sm:inline' : 'inline'} whitespace-nowrap font-medium`}>
                Talk to Us
              </span>
            </motion.button>

            {/* Download Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadBankableProjects}
              disabled={isDownloading}
              className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group ${
                isDownloading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isDownloading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0" />
              ) : (
                <DocumentArrowDownIcon className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="sr-only sm:not-sr-only">
                {isDownloading ? 'Downloading...' : 'Download Bankable Projects'}
              </span>
              <span className={`${isMobile ? 'hidden sm:inline' : 'inline'} whitespace-nowrap font-medium`}>
                {isDownloading ? 'Downloading...' : 'Download Bankable Projects'}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleExpanded}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          isExpanded
            ? 'bg-red-600 hover:bg-red-700 text-white rotate-45'
            : 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black'
        }`}
        aria-label={isExpanded ? 'Close actions' : 'Open actions'}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <XMarkIcon className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              transition={{ duration: 0.2 }}
              className="text-2xl font-bold"
            >
              +
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile-only compact buttons when not expanded */}
      {!isExpanded && isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mt-2"
        >
          {/* Compact Chat Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openChat}
            className="flex items-center justify-center w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg"
            aria-label="Talk to Us"
          >
            <span className="sr-only">Talk to Us</span>
            <span className="text-lg">🎧</span>
          </motion.button>

          {/* Compact Download Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadBankableProjects}
            disabled={isDownloading}
            className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg ${
              isDownloading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            aria-label="Download Bankable Projects"
          >
            <span className="sr-only">Download Bankable Projects</span>
            {isDownloading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-lg">📄</span>
            )}
          </motion.button>
        </motion.div>
      )}

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isExpanded && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default FloatingActionButtons