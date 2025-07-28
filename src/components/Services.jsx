import React from 'react'
import { motion } from 'framer-motion'
import { 
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { useNotification } from '../contexts/NotificationContext'

const Services = () => {
  const { showSuccess } = useNotification()

  const services = [
    {
      title: "Business Registration",
      logo: "https://raw.githubusercontent.com/Ptr234/TEC/main/URSB%20logo.png",
      description: "Company incorporation, business names, and certificate services",
      tags: ["Company registration", "Business names", "Certificates"],
      timeline: "7 working days",
      fees: "From UGX 105,000",
      email: "ursb@ursb.go.ug",
      phone: "+256 417 338 100",
      website: "https://ursb.go.ug",
      sector: "all",
      type: "registration",
      required: true,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Tax Registration",
      logo: "https://raw.githubusercontent.com/Ptr234/TEC/main/URA%20logo.png",
      description: "VAT, PAYE registration and customs clearance services",
      tags: ["VAT registration", "PAYE", "Customs"],
      timeline: "5-7 days",
      fees: "Free",
      email: "service@ura.go.ug",
      phone: "+256 417 442 097",
      website: "https://ura.go.ug",
      sector: "all",
      type: "registration",
      required: true,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Social Security",
      logo: "https://raw.githubusercontent.com/Ptr234/TEC/main/NSSF%20logo.png",
      description: "Employee social security and pension services",
      tags: ["Employee registration", "Pension", "Benefits"],
      timeline: "3-5 days",
      fees: "15% of salary",
      email: "customerservice@nssfug.org",
      phone: "+256 313 331 755",
      website: "https://www.nssfug.org",
      sector: "all",
      type: "registration",
      required: true,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Communications License",
      logo: "https://raw.githubusercontent.com/Ptr234/TEC/main/UCC%20logo.png",
      description: "Telecommunications and broadcasting licensing services",
      tags: ["Telecom license", "Broadcasting", "ISP license"],
      timeline: "2-4 weeks",
      fees: "Variable",
      email: "ucc@ucc.co.ug",
      phone: "+256 414 339 000",
      website: "https://www.ucc.co.ug",
      sector: "ict",
      type: "licensing",
      required: false,
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Investment Facilitation",
      logo: "https://raw.githubusercontent.com/Ptr234/TEC/main/UIA%20logo.png",
      description: "One-stop investment services and incentives",
      tags: ["Investment license", "Tax incentives", "Facilitation"],
      timeline: "USD 250,000",
      fees: "Up to 10 years",
      email: "info@ugandainvest.go.ug",
      phone: "+256 414 301 000",
      website: "https://www.ugandainvest.go.ug",
      sector: "all",
      type: "investment",
      required: false,
      color: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Capital Markets",
      logo: "https://raw.githubusercontent.com/Ptr234/TEC/main/CMA%20logo.png",
      description: "Securities licensing and market regulation services",
      tags: ["Securities license", "Investment advisory", "Market surveillance"],
      timeline: "4-6 weeks",
      fees: "UGX 2M-10M",
      email: "info@cmauganda.co.ug",
      phone: "+256 414 342 788",
      website: "https://cmauganda.co.ug",
      sector: "all",
      type: "licensing",
      required: false,
      color: "from-red-500 to-red-600"
    }
  ]

  const handleCall = (phone, serviceName) => {
    window.location.href = `tel:${phone}`
    showSuccess('Initiating Call', `Connecting to ${serviceName}`)
  }

  const handleEmail = (serviceName, email) => {
    const subject = encodeURIComponent(`Inquiry about ${serviceName}`)
    const body = encodeURIComponent(`Hello,\n\nI would like to inquire about ${serviceName} services.\n\nThank you.`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    showSuccess('Email Prepared', `Opening email client for ${serviceName}`)
  }

  const handleWebsite = (website, serviceName) => {
    window.open(website, '_blank')
    showSuccess('Website Opened', `Visiting ${serviceName} website`)
  }

  const servicesBackgroundStyle = {
    background: `linear-gradient(rgba(0,0,0,0.7), rgba(255,215,0,0.3)), url('https://imgs.search.brave.com/7Zf__NagL78Anjo_ZJ0gvxKo2nfHnwolTc1cVUssCsg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jcm93/bmVkLWNyYW5lLXpv/by1tYWRyaWQtc3Bh/aW4tNjAyNDc1Mzcu/anBn')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  }

  return (
    <section className="py-12 md:py-20" id="services" style={servicesBackgroundStyle}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Government <span className="text-yellow-400">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Core business services and compliance requirements across Uganda's ATMS sectors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 md:p-6 group cursor-pointer transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center flex-1 min-w-0">
                  <img 
                    src={service.logo} 
                    alt={service.title}
                    className="service-logo"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/40x40/ffd700/000000?text=${service.title.charAt(0)}`
                    }}
                  />
                  <h3 className="text-base md:text-lg font-bold text-gray-900 truncate">
                    {service.title}
                  </h3>
                </div>
                {service.required ? (
                  <span className="tag tag-mandatory ml-2 flex-shrink-0">Required</span>
                ) : (
                  <span className="tag ml-2 flex-shrink-0">{service.sector.toUpperCase()}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                {service.description}
              </p>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {service.tags.map((tag, idx) => (
                    <span key={idx} className="tag text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info Grid */}
              <div className="info-grid">
                <div className="info-box">
                  <div className="font-semibold text-xs md:text-sm text-gray-900">
                    {service.type === 'investment' ? 'Min Investment' : 'Timeline'}
                  </div>
                  <div className="text-gray-700 text-xs md:text-sm">
                    {service.timeline}
                  </div>
                </div>
                <div className="info-box">
                  <div className="font-semibold text-xs md:text-sm text-gray-900">
                    {service.type === 'investment' ? 'Tax Holiday' : 'Fees'}
                  </div>
                  <div className="text-gray-700 text-xs md:text-sm">
                    {service.fees}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="contact-info">
                  <EnvelopeIcon className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
                  <span className="truncate text-gray-600">{service.email}</span>
                </div>
                <div className="contact-info">
                  <PhoneIcon className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
                  <span className="text-gray-600">{service.phone}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={() => handleCall(service.phone, service.title)}
                  className="btn-black flex-1"
                >
                  🎧 Call
                </button>
                <button 
                  onClick={() => handleEmail(service.title, service.email)}
                  className="btn-red flex-1"
                >
                  Email
                </button>
                <button 
                  onClick={() => handleWebsite(service.website, service.title)}
                  className="btn-primary flex-1"
                >
                  Website
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              Need Help Getting Started?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our experts are here to guide you through the process. 
              Contact us for personalized assistance with your business registration needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleCall('+256775692335', 'OneStopCentre Support')}
                className="btn-primary"
              >
                Contact Support
              </button>
              <button className="btn-secondary">
                Download Guide
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services