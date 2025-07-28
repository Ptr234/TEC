import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Investments from './components/Investments'
import Calculator from './components/Calculator'
import Support from './components/Support'
import Footer from './components/Footer'
import ChecklistModal from './components/ChecklistModal'
import NotificationSystem from './components/NotificationSystem'
import MobileNavigation from './components/MobileNavigation'
import BackgroundTheme from './components/BackgroundTheme'
import SwipeGestures from './components/SwipeGestures'
import LoadingScreen from './components/LoadingScreen'
import FloatingActionButtons from './components/FloatingActionButtons'
import ScrollToTop from './components/ScrollToTop'
import ZoomControls from './components/ZoomControls'
import { NotificationProvider } from './contexts/NotificationContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { MobileProvider } from './contexts/MobileContext'
import './App.css'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState('hero')
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Global function to open checklist modal (accessible from Footer)
  useEffect(() => {
    window.openChecklistModal = () => {
      setIsChecklistModalOpen(true)
    }
    
    return () => {
      delete window.openChecklistModal
    }
  }, [])

  const sections = [
    { id: 'hero', component: Hero },
    { id: 'services', component: Services },
    { id: 'investments', component: Investments },
    { id: 'calculator', component: Calculator },
    { id: 'support', component: Support }
  ]

  return (
    <NotificationProvider>
      <ThemeProvider>
        <MobileProvider>
          <div className="min-h-screen relative overflow-x-hidden">
            <BackgroundTheme />
            
            <AnimatePresence>
              {isLoading && <LoadingScreen />}
            </AnimatePresence>

            <AnimatePresence>
              {!isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <Header />
                  <MobileNavigation />
                  
                  <main className="relative">
                    {sections.map(({ id, component: Component }) => (
                      <section key={id} id={id} className="relative">
                        <Component />
                      </section>
                    ))}
                  </main>
                  
                  <Footer />
                  
                  <SwipeGestures 
                    sections={sections.map(s => s.id)}
                    currentSection={currentSection}
                    setCurrentSection={setCurrentSection}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <NotificationSystem />
            <ChecklistModal 
              isOpen={isChecklistModalOpen} 
              onClose={() => setIsChecklistModalOpen(false)} 
            />
            <FloatingActionButtons />
            <ScrollToTop />
            <ZoomControls />
          </div>
        </MobileProvider>
      </ThemeProvider>
    </NotificationProvider>
  )
}

export default App