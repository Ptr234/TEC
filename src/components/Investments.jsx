import React from 'react'
import { motion } from 'framer-motion'
import { 
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import { useNotification } from '../contexts/NotificationContext'

const Investments = () => {
  const { showSuccess } = useNotification()

  const investments = [
    {
      title: "Agricultural Credit",
      logo: "https://www.bou.or.ug/export/sites/default/.gallery/slider/bou_logo_high_resolution.png_1670830119.png",
      description: "Low-interest credit for agricultural investments and value chains",
      tags: ["Agricultural loans", "Value chains", "Farm financing"],
      minInvestment: "Up to 10% per annum",
      support: "UGX 5M-5B",
      email: "info@bou.or.ug",
      phone: "+256 414 258 441",
      website: "https://www.bou.or.ug",
      sector: "agriculture",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Tourism Development",
      logo: "https://exploreuganda.com/wp-content/uploads/2024/05/Explore-Uganda-Logo-white.png",
      description: "Hotel development and eco-tourism investment opportunities",
      tags: ["Hotel development", "Eco-tourism", "Tourism incentives"],
      minInvestment: "USD 250,000",
      support: "Up to 10 years",
      email: "utb@visituganda.com",
      phone: "+256 414 342 196",
      website: "https://www.visituganda.com",
      sector: "tourism",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Tech Innovation",
      logo: "https://www.nita.go.ug/themes/gavias_kiamo/nitawebbanner-01.svg",
      description: "Startup funding and digital infrastructure investments",
      tags: ["Startup funding", "Digital infrastructure", "Innovation grants"],
      minInvestment: "USD 50,000-10M",
      support: "Incubation",
      email: "info@nita.go.ug",
      phone: "+256 417 801 038",
      website: "https://www.nita.go.ug",
      sector: "ict",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Minerals Development",
      logo: "https://www.finance.go.ug/themes/gavias_facdori/MoFPED%20LOGO%20WEB%281%29.svg",
      description: "Mining licenses and mineral exploration investment opportunities",
      tags: ["Mining licenses", "Exploration", "Value addition"],
      minInvestment: "USD 500,000",
      support: "Up to 7 years",
      email: "finance@finance.go.ug",
      phone: "+256 414 707 000",
      website: "https://www.finance.go.ug",
      sector: "minerals",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      title: "SME Development",
      logo: "https://mybusiness.go.ug/images/portalogo.png",
      description: "Small and medium enterprise funding and capacity building programs",
      tags: ["SME loans", "Training", "Mentorship"],
      minInvestment: "UGX 1M-500M",
      support: "12-18% p.a.",
      email: "sme@finance.go.ug",
      phone: "+256 414 258 000",
      website: "https://mybusiness.go.ug",
      sector: "business",
      color: "from-green-600 to-green-700"
    },
    {
      title: "Export Development",
      logo: "https://raw.githubusercontent.com/Ptr234/TEC/main/UIA%20logo.png",
      description: "Export promotion and international market access support",
      tags: ["Export finance", "Market access", "Quality standards"],
      minInvestment: "Up to 80% funding",
      support: "Regional & Global",
      email: "exports@ugandainvest.go.ug",
      phone: "+256 414 301 555",
      website: "https://www.ugandainvest.go.ug",
      sector: "export",
      color: "from-blue-600 to-blue-700"
    },
    {
      title: "Infrastructure Development",
      logo: "https://www.finance.go.ug/themes/gavias_facdori/MoFPED%20LOGO%20WEB%281%29.svg",
      description: "Public-private partnerships for infrastructure development projects",
      tags: ["PPP projects", "Roads & bridges", "Energy projects"],
      minInvestment: "USD 5M+",
      support: "15-30 years",
      email: "ppp@finance.go.ug",
      phone: "+256 414 707 400",
      website: "https://www.finance.go.ug",
      sector: "infrastructure",
      color: "from-purple-600 to-purple-700"
    },
    {
      title: "Manufacturing Development",
      logo: "https://raw.githubusercontent.com/Ptr234/TEC/main/UIA%20logo.png",
      description: "Industrial manufacturing and value addition investment support",
      tags: ["Industrial parks", "Value addition", "Manufacturing"],
      minInvestment: "USD 1M+",
      support: "Up to 10 years",
      email: "manufacturing@ugandainvest.go.ug",
      phone: "+256 414 301 200",
      website: "https://www.ugandainvest.go.ug",
      sector: "manufacturing",
      color: "from-red-600 to-red-700"
    },
    {
      title: "Energy Development",
      logo: "https://www.era.go.ug/media/2024/09/ERA-LOGO-FULL-COLOUR-Horizontal-lock-up.png",
      description: "Renewable energy and power generation investment opportunities",
      tags: ["Solar projects", "Hydro power", "Wind energy"],
      minInvestment: "USD 2M+",
      support: "Feed-in Tariff",
      email: "info@era.go.ug",
      phone: "+256 417 101 800",
      website: "https://www.era.go.ug",
      sector: "energy",
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Healthcare Investment",
      logo: "https://raw.githubusercontent.com/Ptr234/TEC/main/UIA%20logo.png",
      description: "Healthcare infrastructure and medical services investment opportunities",
      tags: ["Hospitals", "Medical equipment", "Pharmaceuticals"],
      minInvestment: "USD 500K+",
      support: "VAT exemptions",
      email: "health@ugandainvest.go.ug",
      phone: "+256 414 301 300",
      website: "https://www.ugandainvest.go.ug",
      sector: "healthcare",
      color: "from-green-500 to-teal-600"
    }
  ]

  const handleCall = (phone, serviceName) => {
    window.location.href = `tel:${phone}`
    showSuccess('Initiating Call', `Connecting to ${serviceName}`)
  }

  const handleEmail = (serviceName, email) => {
    const subject = encodeURIComponent(`Investment Inquiry - ${serviceName}`)
    const body = encodeURIComponent(`Hello,\n\nI am interested in investment opportunities in ${serviceName}.\n\nPlease provide more information about:\n- Investment requirements\n- Available incentives\n- Application process\n\nThank you.`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    showSuccess('Email Prepared', `Opening email client for ${serviceName}`)
  }

  const handleWebsite = (website, serviceName) => {
    window.open(website, '_blank')
    showSuccess('Website Opened', `Visiting ${serviceName} website`)
  }

  const getSectorColor = (sector) => {
    const colorMap = {
      agriculture: 'bg-green-500',
      tourism: 'bg-blue-500',
      ict: 'bg-purple-500',
      minerals: 'bg-yellow-500',
      business: 'bg-green-600',
      export: 'bg-blue-600',
      infrastructure: 'bg-purple-600',
      manufacturing: 'bg-red-600',
      energy: 'bg-orange-500',
      healthcare: 'bg-teal-500'
    }
    return colorMap[sector] || 'bg-gray-500'
  }

  const investmentsBackgroundStyle = {
    background: `linear-gradient(rgba(220,38,38,0.8), rgba(0,0,0,0.6)), url('https://imgs.search.brave.com/d6POB43GhgZ9Xi6serN-h4cIeBBbsHHDnQ6BBmUcxDs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9t/b3phbWJpcXVlLWZs/YWctcnVmZmxlZC1i/ZWF1dGlmdWxseS13/YXZpbmctbWFjcm8t/Y2xvc2UtdXAtc2hv/dF8xMzc5LTExOC5q/cGc_c2VtdD1haXNf/aHlicmlk')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  }

  return (
    <section className="py-12 md:py-20" id="investments" style={investmentsBackgroundStyle}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Investment <span className="text-yellow-400">Opportunities</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Funding and investment facilitation across Uganda's ATMS sectors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {investments.map((investment, index) => (
            <motion.div
              key={investment.title}
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
                    src={investment.logo} 
                    alt={investment.title}
                    className="service-logo"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/40x40/ffd700/000000?text=${investment.title.charAt(0)}`
                    }}
                  />
                  <h3 className="text-base md:text-lg font-bold text-gray-900 truncate">
                    {investment.title}
                  </h3>
                </div>
                <span className={`tag ml-2 flex-shrink-0 text-white text-xs px-2 py-1 rounded-full ${getSectorColor(investment.sector)}`}>
                  {investment.sector.charAt(0).toUpperCase() + investment.sector.slice(1)}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                {investment.description}
              </p>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {investment.tags.map((tag, idx) => (
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
                    {investment.sector === 'agriculture' ? 'Interest Rate' : 
                     ['sme', 'export'].includes(investment.sector) ? 'Support Range' : 'Min Investment'}
                  </div>
                  <div className="text-gray-700 text-xs md:text-sm">
                    {investment.minInvestment}
                  </div>
                </div>
                <div className="info-box">
                  <div className="font-semibold text-xs md:text-sm text-gray-900">
                    {investment.sector === 'agriculture' ? 'Loan Range' : 
                     ['sme'].includes(investment.sector) ? 'Interest Rate' :
                     ['export'].includes(investment.sector) ? 'Markets' :
                     ['infrastructure'].includes(investment.sector) ? 'Contract Period' :
                     ['energy'].includes(investment.sector) ? 'Feed-in Tariff' :
                     ['healthcare'].includes(investment.sector) ? 'Tax Benefits' : 'Support'}
                  </div>
                  <div className="text-gray-700 text-xs md:text-sm">
                    {investment.support}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="contact-info">
                  <EnvelopeIcon className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
                  <span className="truncate text-gray-600">{investment.email}</span>
                </div>
                <div className="contact-info">
                  <PhoneIcon className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
                  <span className="text-gray-600">{investment.phone}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={() => handleCall(investment.phone, investment.title)}
                  className="btn-black flex-1"
                >
                  🎧 Call
                </button>
                <button 
                  onClick={() => handleEmail(investment.title, investment.email)}
                  className="btn-red flex-1"
                >
                  Email
                </button>
                <button 
                  onClick={() => handleWebsite(investment.website, investment.title)}
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
              Ready to Invest in Uganda?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Get personalized guidance on investment opportunities, tax incentives, 
              and regulatory requirements. Our experts will help you navigate the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleCall('+256775692335', 'Investment Consultation')}
                className="btn-primary"
              >
                Schedule Consultation
              </button>
              <button className="btn-secondary">
                Download Investment Guide
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Investments