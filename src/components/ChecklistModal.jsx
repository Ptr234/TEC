import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

const ChecklistModal = ({ isOpen, onClose }) => {
  const [selectedChecklist, setSelectedChecklist] = useState(null)

  const checklists = {
    services: {
      title: 'Services Checklist',
      items: [
        { name: 'Business Registration', description: 'Register your company with URSB', mandatory: true, completed: false },
        { name: 'Tax Registration', description: 'Obtain TIN and register for VAT/PAYE with URA', mandatory: true, completed: false },
        { name: 'Social Security', description: 'Register employees with NSSF', mandatory: true, completed: false },
        { name: 'Communications License', description: 'Obtain telecom/broadcasting license from UCC (if applicable)', mandatory: false, completed: false },
        { name: 'Investment Facilitation', description: 'Apply for investment license with UIA', mandatory: false, completed: false },
        { name: 'Capital Markets', description: 'Obtain securities license from CMA (if applicable)', mandatory: false, completed: false }
      ]
    },
    investments: {
      title: 'Investments Checklist',
      items: [
        { name: 'Agricultural Credit', description: 'Apply for low-interest loans with BOU', mandatory: false, completed: false },
        { name: 'Tourism Development', description: 'Explore hotel/eco-tourism incentives with UTB', mandatory: false, completed: false },
        { name: 'Tech Innovation', description: 'Apply for startup funding with NITA', mandatory: false, completed: false },
        { name: 'Investment License', description: 'Secure investment license from UIA', mandatory: true, completed: false }
      ]
    },
    calculator: {
      title: 'Tax Checklist',
      items: [
        { name: 'Verify Investment Amount', description: 'Ensure accurate investment figures', mandatory: true, completed: false },
        { name: 'Select ATMS Sector', description: 'Choose appropriate sector for tax rates', mandatory: true, completed: false },
        { name: 'Confirm Investment Type', description: 'Specify new, expansion, or acquisition', mandatory: true, completed: false },
        { name: 'Consult URA', description: 'Validate calculations with URA for accuracy', mandatory: false, completed: false }
      ]
    }
  }

  const handleItemToggle = (checklistKey, itemIndex) => {
    // In a real application, this would update state or localStorage
    console.log(`Toggled item ${itemIndex} in ${checklistKey} checklist`)
  }

  const handleClose = () => {
    setSelectedChecklist(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {!selectedChecklist ? (
            // Checklist Selection
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Business Checklists</h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <p className="text-gray-600 mb-6">
                Choose from our comprehensive business checklists to ensure you complete all necessary steps.
              </p>

              <div className="grid gap-4">
                {Object.entries(checklists).map(([key, checklist]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedChecklist(key)}
                    className="text-left p-4 border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-200"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{checklist.title}</h3>
                    <p className="text-sm text-gray-600">
                      {checklist.items.length} items • {checklist.items.filter(item => item.mandatory).length} required
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            // Selected Checklist View
            <div className="flex flex-col h-full max-h-[90vh]">
              <div className="p-6 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <button
                      onClick={() => setSelectedChecklist(null)}
                      className="text-sm text-blue-600 hover:text-blue-700 mb-2"
                    >
                      ← Back to checklists
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {checklists[selectedChecklist].title}
                    </h2>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <div className="space-y-4">
                  {checklists[selectedChecklist].items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <button
                        onClick={() => handleItemToggle(selectedChecklist, index)}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          item.completed
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {item.completed && <CheckCircleIcon className="w-4 h-4" />}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          {item.mandatory && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ChecklistModal