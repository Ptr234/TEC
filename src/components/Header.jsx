import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MagnifyingGlassIcon, 
  Bars3Icon,
  PaintBrushIcon,
  BellIcon,
  BellSlashIcon
} from '@heroicons/react/24/outline'
import { useMobile } from '../contexts/MobileContext'
import { useNotification } from '../contexts/NotificationContext'
import { useTheme } from '../contexts/ThemeContext'
import SearchComponent from './SearchComponent'

const Header = () => {
  const { isMobile, isTablet } = useMobile()
  const { isReducedNotifications, toggleReducedNotifications } = useNotification()
  const { theme, themes, changeTheme, isAutoRotate, toggleAutoRotate } = useTheme()
  const [showSearch, setShowSearch] = useState(false)
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const themeMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
        setShowThemeMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMobileNavOpen(false)
  }

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img 
                src="https://github.com/Ptr234/TEC/blob/main/WhatsApp%20Image%202025-07-27%20at%2018.38.34%20(2).jpeg?raw=true" 
                alt="OneStopCenter Uganda Logo" 
                className="h-10 w-auto md:h-12 rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentNode.innerHTML = '<div class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg border-2 border-black"><span class="text-black font-bold text-lg md:text-xl">O</span></div>'
                }}
              />
              
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold text-gray-900">
                  OneStopCenter Uganda
                </h1>
                <p className="text-xs md:text-sm text-gray-600">
                  Business Simplified
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#services" className="btn-ghost">Services</a>
                <a href="#investments" className="btn-ghost">Investments</a>
                <a href="#calculator" className="btn-ghost">Calculator</a>
                <a href="#support" className="btn-ghost">Support</a>
              </nav>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Search Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle search"
              >
                <MagnifyingGlassIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              </motion.button>

              {/* Theme Menu */}
              <div className="relative" ref={themeMenuRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Change theme"
                >
                  <PaintBrushIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                </motion.button>

                <AnimatePresence>
                  {showThemeMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                    >
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Themes</p>
                      </div>
                      
                      {Object.entries(themes).map(([key, themeOption]) => (
                        <button
                          key={key}
                          onClick={() => {
                            changeTheme(key)
                            setShowThemeMenu(false)
                          }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                            key === theme.name.toLowerCase() ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-200"
                              style={{ background: themeOption.background }}
                            />
                            {themeOption.name}
                          </span>
                        </button>
                      ))}
                      
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={() => {
                            toggleAutoRotate()
                            setShowThemeMenu(false)
                          }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 text-gray-700"
                        >
                          {isAutoRotate ? '⏸️ Stop Auto-Rotate' : '🔄 Auto-Rotate'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notification Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleReducedNotifications}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label={isReducedNotifications ? 'Enable all notifications' : 'Reduce notifications'}
              >
                {isReducedNotifications ? (
                  <BellSlashIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                ) : (
                  <BellIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                )}
              </motion.button>

              {/* Mobile Menu Toggle */}
              {(isMobile || isTablet) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMobileNav}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 md:hidden"
                  aria-label="Toggle mobile menu"
                >
                  <Bars3Icon className="w-6 h-6 text-gray-600" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
          >
            <div className="container mx-auto px-4 py-4">
              <SearchComponent onClose={() => setShowSearch(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
            onClick={() => setMobileNavOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
                  <button
                    onClick={() => setMobileNavOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <span className="text-xl">&times;</span>
                  </button>
                </div>
                
                <nav className="space-y-4">
                  <a href="#services" className="block py-3 text-gray-700 hover:text-gray-900" onClick={() => setMobileNavOpen(false)}>
                    Services
                  </a>
                  <a href="#investments" className="block py-3 text-gray-700 hover:text-gray-900" onClick={() => setMobileNavOpen(false)}>
                    Investments
                  </a>
                  <a href="#calculator" className="block py-3 text-gray-700 hover:text-gray-900" onClick={() => setMobileNavOpen(false)}>
                    Calculator
                  </a>
                  <a href="#support" className="block py-3 text-gray-700 hover:text-gray-900" onClick={() => setMobileNavOpen(false)}>
                    Support
                  </a>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header