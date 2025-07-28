import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNotification } from '../contexts/NotificationContext'
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

const NotificationSystem = () => {
  const { notifications, removeNotification } = useNotification()

  const getIcon = (type) => {
    const iconProps = { className: 'w-5 h-5 flex-shrink-0' }
    
    switch (type) {
      case 'success':
        return <CheckCircleIcon {...iconProps} className="w-5 h-5 flex-shrink-0 text-green-600" />
      case 'error':
        return <XCircleIcon {...iconProps} className="w-5 h-5 flex-shrink-0 text-red-600" />
      case 'warning':
        return <ExclamationTriangleIcon {...iconProps} className="w-5 h-5 flex-shrink-0 text-yellow-600" />
      case 'info':
      default:
        return <InformationCircleIcon {...iconProps} className="w-5 h-5 flex-shrink-0 text-blue-600" />
    }
  }

  const getNotificationClasses = (type) => {
    const baseClasses = 'bg-white border-l-4 rounded-lg shadow-lg p-3 md:p-4 max-w-sm relative'
    
    switch (type) {
      case 'success':
        return `${baseClasses} border-green-500 bg-green-50`
      case 'error':
        return `${baseClasses} border-red-500 bg-red-50`
      case 'warning':
        return `${baseClasses} border-yellow-500 bg-yellow-50`
      case 'info':
      default:
        return `${baseClasses} border-blue-500 bg-blue-50`
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm space-y-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}
            className={getNotificationClasses(notification.type)}
            style={{ pointerEvents: 'auto' }}
          >
            <div className="flex items-start space-x-3">
              {getIcon(notification.type)}
              
              <div className="flex-1 min-w-0">
                {notification.title && (
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    {notification.title}
                  </h4>
                )}
                {notification.message && (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {notification.message}
                  </p>
                )}
              </div>
              
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label="Close notification"
              >
                <XMarkIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default NotificationSystem