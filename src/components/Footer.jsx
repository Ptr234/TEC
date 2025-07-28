import React from 'react'
import { motion } from 'framer-motion'
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import { useNotification } from '../contexts/NotificationContext'

const Footer = () => {
  const { showSuccess } = useNotification()

  const atmsSectors = [
    { name: '🌾 Agriculture', href: '#investments' },
    { name: '🏖️ Tourism', href: '#investments' },
    { name: '⛏️ Minerals', href: '#investments' },
    { name: '💻 ICT', href: '#investments' }
  ]

  const quickLinks = [
    { name: '📋 Services', href: '#services' },
    { name: '💰 Investments', href: '#investments' },
    { name: '🧮 Tax Calculator', href: '#calculator' },
    { name: '✅ Checklists', action: 'openChecklist' }
  ]

  const contactInfo = [
    { 
      icon: EnvelopeIcon, 
      text: 'info@oscdigitaltool.com', 
      href: 'mailto:info@oscdigitaltool.com',
      type: 'email'
    },
    { 
      icon: PhoneIcon, 
      text: '+256 775 692 335', 
      href: 'tel:+256775692335',
      type: 'phone'
    },
    { 
      icon: MapPinIcon, 
      text: 'Kampala, Uganda', 
      href: null,
      type: 'location'
    },
    { 
      icon: ChatBubbleLeftRightIcon, 
      text: 'WhatsApp Support', 
      href: 'https://wa.me/+256775692335',
      type: 'whatsapp'
    }
  ]

  const externalLinks = [
    { name: 'eBiz Uganda', href: 'https://ebiz.go.ug/' },
    { name: 'Uganda Investment Authority', href: 'https://ugandainvest.go.ug/' },
    { name: 'National SME Portal', href: 'https://mybusiness.go.ug/' }
  ]

  const handleContactClick = (contact) => {
    if (contact.href) {
      if (contact.type === 'phone') {
        window.location.href = contact.href
        showSuccess('Initiating Call', `Calling ${contact.text}`)
      } else if (contact.type === 'email') {
        window.location.href = contact.href
        showSuccess('Email Client', 'Opening email application')
      } else if (contact.type === 'whatsapp') {
        window.open(contact.href, '_blank')
        showSuccess('WhatsApp', 'Opening WhatsApp support')
      }
    }
  }

  const handleLinkClick = (href, name) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        showSuccess('Navigation', `Scrolling to ${name.replace(/[📋💰🧮✅]/g, '').trim()}`)
      }
    } else {
      window.open(href, '_blank')
      showSuccess('External Link', `Opening ${name}`)
    }
  }

  const openChecklistModal = () => {
    if (window.openChecklistModal) {
      window.openChecklistModal()
      showSuccess('Checklists', 'Opening business checklists')
    }
  }

  return (
    <footer className="bg-black text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img 
                src="https://github.com/Ptr234/TEC/blob/main/WhatsApp%20Image%202025-07-27%20at%2018.38.34%20(2).jpeg?raw=true" 
                alt="OneStopCenter Uganda Logo" 
                className="h-10 w-auto rounded-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/40x40/ffd700/000000?text=O"
                }}
              />
              <h3 className="text-lg md:text-xl font-bold">OneStopCenter Uganda</h3>
            </div>
            <p className="text-gray-300">Your gateway to Uganda's ATMS sectors</p>
          </motion.div>
          
          {/* ATMS Sectors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center md:text-left"
          >
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">ATMS Sectors</h4>
            <ul className="space-y-2">
              {atmsSectors.map((sector, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(sector.href, sector.name)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
                  >
                    {sector.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.action ? (
                    <button
                      onClick={openChecklistModal}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleLinkClick(link.href, link.name)}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center md:text-left"
          >
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Contact</h4>
            <ul className="space-y-2 text-gray-300 text-sm md:text-base">
              {contactInfo.map((contact, index) => (
                <li key={index}>
                  {contact.href ? (
                    <button
                      onClick={() => handleContactClick(contact)}
                      className="flex items-center gap-2 hover:text-yellow-400 transition-colors duration-200 text-left"
                    >
                      <contact.icon className="w-4 h-4 flex-shrink-0" />
                      {contact.text}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <contact.icon className="w-4 h-4 flex-shrink-0" />
                      {contact.text}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 mt-8 md:mt-12 pt-6 md:pt-8 text-center"
        >
          <p className="text-gray-300 text-sm md:text-base">
            &copy; 2025 OneStopCentre Uganda. All rights reserved.
          </p>
          
          <p className="text-gray-300 mt-2 text-sm md:text-base">
            <button className="hover:text-yellow-400 transition-colors duration-200 mr-2">
              Privacy Policy
            </button>
            <span className="mx-2">|</span>
            <button className="hover:text-yellow-400 transition-colors duration-200 ml-2">
              Terms of Service
            </button>
          </p>
          
          <p className="text-gray-300 mt-2 text-sm md:text-base">
            {externalLinks.map((link, index) => (
              <span key={index}>
                <button
                  onClick={() => handleLinkClick(link.href, link.name)}
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  {link.name}
                </button>
                {index < externalLinks.length - 1 && <span className="mx-2">|</span>}
              </span>
            ))}
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-sm text-gray-400"
          >
            <span className="flex items-center gap-2">
              🚀 Powered by OneStopCentre Digital Platform
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              🇺🇬 Made in Uganda
            </span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer