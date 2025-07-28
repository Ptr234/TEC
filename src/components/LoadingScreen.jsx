import React from 'react'
import { motion } from 'framer-motion'

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-50 flex items-center justify-center"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <div className="text-center text-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <img 
            src="https://github.com/Ptr234/TEC/blob/main/WhatsApp%20Image%202025-07-27%20at%2018.38.34%20(2).jpeg?raw=true" 
            alt="OneStopCenter Uganda Logo" 
            className="h-16 w-auto mx-auto rounded-lg mb-4"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentNode.innerHTML = '<div class="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto" style="animation: spin 1s linear infinite;"></div>'
            }}
          />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold mb-3"
        >
          OneStopCenter Uganda
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-yellow-400 text-base md:text-lg"
        >
          Loading your gateway to simplified business services...
        </motion.p>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-48 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mt-6"
        />
      </div>
    </motion.div>
  )
}

export default LoadingScreen