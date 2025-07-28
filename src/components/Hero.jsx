import React from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRightIcon, 
  CheckCircleIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline'
import { useMobile } from '../contexts/MobileContext'
import { useTheme } from '../contexts/ThemeContext'

const Hero = () => {
  const { isMobile, isTablet } = useMobile()
  const { theme } = useTheme()

  const features = [
    {
      icon: BuildingOfficeIcon,
      title: "Business Registration",
      description: "Company incorporation and licensing"
    },
    {
      icon: CurrencyDollarIcon,
      title: "Investment Opportunities",
      description: "ATMS sector funding and incentives"
    },
    {
      icon: CalculatorIcon,
      title: "Tax Calculator",
      description: "Calculate potential obligations"
    }
  ]

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
  }

  const heroBackgroundStyle = {
    background: `linear-gradient(rgba(0,0,0,0.7), rgba(255,215,0,0.3)), url('https://imgs.search.brave.com/AxVdlXBFn2VzY0HWiESXzkDEUyWMR00jhHN4iQDRBow/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzAv/NjI2LzM5MC9zbWFs/bC90aGUtam95LWFu/ZC1sYXVnaHRlci1v/Zi1hZnJpY2FuLWNo/aWxkcmVuLXBsYXlp/bmctZ2EtZnJlZS1w/aG90by5qcGc')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-12 md:py-20" style={heroBackgroundStyle}>
      {/* Content */}
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8 md:mb-12"
          >
            {/* Logo and Title */}
            <div className="flex flex-col items-center justify-center mb-6">
              <img 
                src="https://github.com/Ptr234/TEC/blob/main/WhatsApp%20Image%202025-07-27%20at%2018.38.34%20(2).jpeg?raw=true" 
                alt="OneStopCenter Uganda Logo" 
                className="h-20 w-auto md:h-24 rounded-lg mb-4 shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                <span className="block">OneStopCenter</span>
                <span className="block text-yellow-400">Uganda</span>
              </h1>
              <p className="text-lg text-yellow-400 font-medium">ONTESTER Directory</p>
            </div>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Your gateway to simplified business services, ATMS investments, and government compliance in Uganda
            </p>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 md:mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToServices}
              className="btn-primary w-full sm:w-auto"
            >
              Explore Services <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToCalculator}
              className="btn-secondary w-full sm:w-auto"
            >
              Tax Calculator <CalculatorIcon className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto"
          >
            {[
              { number: "10+", label: "Government Agencies" },
              { number: "4", label: "ATMS Sectors" },
              { number: "24/7", label: "Online Access" },
              { number: "100%", label: "Digital Services" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-white/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero