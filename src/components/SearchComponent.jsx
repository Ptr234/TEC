import React, { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useMobile } from '../contexts/MobileContext'
import { useNotification } from '../contexts/NotificationContext'

const SearchComponent = ({ onClose }) => {
  const { isMobile } = useMobile()
  const { showInfo } = useNotification()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [searchHistory, setSearchHistory] = useState([])
  const inputRef = useRef(null)

  const services = useMemo(() => [
    { 
      name: "Business Registration", 
      description: "Company incorporation, business names, and certificate services", 
      section: "services",
      tags: ["company", "registration", "business", "certificate", "incorporation"]
    },
    { 
      name: "Tax Registration", 
      description: "VAT, PAYE registration and customs clearance services", 
      section: "services",
      tags: ["tax", "vat", "paye", "customs", "ura"]
    },
    { 
      name: "Social Security", 
      description: "Employee social security and pension services", 
      section: "services",
      tags: ["nssf", "social", "security", "pension", "employee"]
    },
    { 
      name: "Investment License", 
      description: "One-stop investment services and incentives", 
      section: "investments",
      tags: ["investment", "license", "incentives", "uia"]
    },
    { 
      name: "Tax Calculator", 
      description: "Calculate potential tax obligations and incentives", 
      section: "calculator",
      tags: ["calculator", "tax", "atms", "calculate"]
    },
    { 
      name: "Agricultural Credit", 
      description: "Low-interest credit for agricultural investments", 
      section: "investments",
      tags: ["agriculture", "credit", "loans", "farming"]
    },
    { 
      name: "Tourism Development", 
      description: "Hotel development and eco-tourism opportunities", 
      section: "investments",
      tags: ["tourism", "hotel", "eco-tourism", "development"]
    },
    { 
      name: "Tech Innovation", 
      description: "Startup funding and digital infrastructure", 
      section: "investments",
      tags: ["tech", "innovation", "startup", "digital", "nita"]
    }
  ], [])

  useEffect(() => {
    const saved = localStorage.getItem('searchHistory')
    if (saved) {
      setSearchHistory(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const filteredResults = useMemo(() => {
    if (!query.trim()) return []
    
    const queryLower = query.toLowerCase()
    return services.filter(service => 
      service.name.toLowerCase().includes(queryLower) ||
      service.description.toLowerCase().includes(queryLower) ||
      service.tags.some(tag => tag.toLowerCase().includes(queryLower))
    ).slice(0, 5)
  }, [query, services])

  const addToHistory = (term) => {
    const newHistory = [term, ...searchHistory.filter(h => h !== term)].slice(0, 5)
    setSearchHistory(newHistory)
    localStorage.setItem('searchHistory', JSON.stringify(newHistory))
  }

  const navigateToSection = (sectionId, serviceName) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      showInfo('Navigation', `Navigating to ${serviceName}`, 3000)
      addToHistory(query)
      onClose()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, -1))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      const selected = filteredResults[selectedIndex]
      navigateToSection(selected.section, selected.name)
    }
  }

  const handleQuickSearch = (term) => {
    setQuery(term)
    const result = services.find(s => 
      s.name.toLowerCase().includes(term.toLowerCase())
    )
    if (result) {
      navigateToSection(result.section, result.name)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        {/* Search Input */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search services, investments, or use calculator..."
            className="w-full pl-12 pr-12 py-3 md:py-4 bg-white border border-gray-300 rounded-xl text-base md:text-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Search Results */}
        <AnimatePresence>
          {filteredResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto"
            >
              {filteredResults.map((result, index) => (
                <motion.div
                  key={result.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigateToSection(result.section, result.name)}
                  className={`p-4 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors duration-150 ${
                    index === selectedIndex 
                      ? 'bg-blue-50 border-blue-100' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {result.name}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {result.description}
                      </p>
                    </div>
                    <span className="ml-4 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                      {result.section}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search History */}
        {!query && searchHistory.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Recent searches:</p>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((term, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleQuickSearch(term)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 rounded-full transition-colors duration-200"
                >
                  {term}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {query && filteredResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 text-center text-gray-500"
          >
            <p>No results found for "{query}"</p>
            <p className="text-sm mt-1">Try searching for services, investments, or calculator</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SearchComponent