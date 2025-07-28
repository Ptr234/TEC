import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CalculatorIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { useNotification } from '../contexts/NotificationContext'

const Calculator = () => {
  const { showSuccess, showError } = useNotification()
  const [formData, setFormData] = useState({
    amount: '',
    sector: 'agriculture',
    type: 'new'
  })
  const [result, setResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const sectorData = {
    agriculture: {
      name: 'Agriculture',
      new: { taxRate: 0.1, taxHoliday: 10, vatRate: 0.18 },
      expansion: { taxRate: 0.15, taxHoliday: 5, vatRate: 0.18 }
    },
    tourism: {
      name: 'Tourism',
      new: { taxRate: 0.12, taxHoliday: 8, vatRate: 0.18 },
      expansion: { taxRate: 0.18, taxHoliday: 4, vatRate: 0.18 }
    },
    minerals: {
      name: 'Minerals',
      new: { taxRate: 0.15, taxHoliday: 7, vatRate: 0.18 },
      expansion: { taxRate: 0.2, taxHoliday: 3, vatRate: 0.18 }
    },
    ict: {
      name: 'ICT',
      new: { taxRate: 0.08, taxHoliday: 10, vatRate: 0.16 },
      expansion: { taxRate: 0.12, taxHoliday: 5, vatRate: 0.16 }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const calculateTax = async () => {
    const amount = parseFloat(formData.amount)
    
    if (isNaN(amount) || amount <= 0) {
      showError('Invalid Input', 'Please enter a valid investment amount')
      return
    }

    setIsCalculating(true)

    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))

    const sectorInfo = sectorData[formData.sector]
    const rates = sectorInfo[formData.type]

    const corporateTax = amount * rates.taxRate
    const vat = amount * rates.vatRate
    const totalTax = corporateTax + vat
    const netInvestment = amount - totalTax

    setResult({
      sector: sectorInfo.name,
      investmentType: formData.type,
      amount,
      corporateTaxRate: rates.taxRate,
      vatRate: rates.vatRate,
      corporateTax,
      vat,
      totalTax,
      netInvestment,
      taxHoliday: rates.taxHoliday
    })

    setIsCalculating(false)
    showSuccess('Calculation Complete', `Tax calculation for USD ${amount.toLocaleString()} completed`)
  }

  const clearCalculation = () => {
    setResult(null)
    setFormData({ amount: '', sector: 'agriculture', type: 'new' })
  }

  const calculatorBackgroundStyle = {
    background: `linear-gradient(rgba(220,38,38,0.8), rgba(0,0,0,0.6)), url('https://imgs.search.brave.com/d6POB43GhgZ9Xi6serN-h4cIeBBbsHHDnQ6BBmUcxDs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9t/b3phbWJpcXVlLWZs/YWctcnVmZmxlZC1i/ZWF1dGlmdWxseS13/YXZpbmctbWFjcm8t/Y2xvc2UtdXAtc2hv/dF8xMzc5LTExOC5q/cGc_c2VtdD1haXNf/aHlicmlk')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  }

  return (
    <section className="py-12 md:py-20 px-4" id="calculator" style={calculatorBackgroundStyle}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Logo and Title */}
          <div className="flex flex-col items-center justify-center mb-6">
            <img 
              src="https://github.com/Ptr234/TEC/blob/main/WhatsApp%20Image%202025-07-27%20at%2018.38.34%20(2).jpeg?raw=true" 
              alt="OneStopCenter Uganda Logo" 
              className="h-16 w-auto md:h-20 rounded-lg mb-4 shadow-lg"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              Tax <span className="text-yellow-400">Calculator</span>
            </h2>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Calculate your potential tax obligations and incentives for ATMS sector investments. 
            Get instant estimates for informed decision-making.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card"
          >
            <div className="flex items-center mb-6">
              <CalculatorIcon className="w-6 h-6 text-orange-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Investment Details</h3>
            </div>

            <div className="space-y-4">
              {/* Investment Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount (USD)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount (e.g., 1000000)"
                  className="mobile-input"
                  min="0"
                  step="1000"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>

              {/* Sector Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ATMS Sector
                </label>
                <select
                  name="sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  className="mobile-input"
                >
                  <option value="agriculture">Agriculture</option>
                  <option value="tourism">Tourism</option>
                  <option value="minerals">Minerals</option>
                  <option value="ict">ICT</option>
                </select>
              </div>

              {/* Investment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="new"
                      checked={formData.type === 'new'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">New Investment</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="expansion"
                      checked={formData.type === 'expansion'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Expansion</span>
                  </label>
                </div>
              </div>

              {/* Calculate Button */}
              <div className="pt-4">
                <button
                  onClick={calculateTax}
                  disabled={isCalculating || !formData.amount}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCalculating ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2" />
                      Calculating...
                    </span>
                  ) : (
                    'Calculate Tax'
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Calculation Results</h3>
              {result && (
                <button
                  onClick={clearCalculation}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              )}
            </div>

            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Investment Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Investment Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Sector:</span>
                      <p className="font-medium">{result.sector}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <p className="font-medium capitalize">{result.investmentType}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Amount:</span>
                      <p className="font-medium text-lg">USD {result.amount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Tax Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Corporate Tax ({(result.corporateTaxRate * 100).toFixed(1)}%)</span>
                    <span className="font-medium">USD {result.corporateTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">VAT ({(result.vatRate * 100).toFixed(1)}%)</span>
                    <span className="font-medium">USD {result.vat.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b-2 border-gray-200 font-semibold">
                    <span className="text-gray-900">Total Tax</span>
                    <span className="text-lg">USD {result.totalTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-900 font-medium">Tax Holiday</span>
                    <span className="font-semibold text-green-600">{result.taxHoliday} years</span>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <InformationCircleIcon className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> These are estimated figures based on current rates. 
                        Consult with URA for precise calculations and current regulations.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <CalculatorIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter investment details to see tax calculations</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 md:mt-16"
        >
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 md:p-8 border border-orange-200">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">
              Need Professional Tax Advice?
            </h3>
            <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
              Our tax experts can provide detailed guidance on ATMS sector incentives, 
              compliance requirements, and optimization strategies for your investment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Consult Tax Expert
              </button>
              <button className="btn-secondary">
                Download Tax Guide
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Calculator