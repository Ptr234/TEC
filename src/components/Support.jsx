import React from 'react'
import { motion } from 'framer-motion'
import { 
  PhoneIcon, 
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  DocumentArrowDownIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

const Support = () => {
  const contactMethods = [
    {
      icon: PhoneIcon,
      title: "Call Us",
      description: "Speak directly with our experts",
      action: "Call +256 775 692 335",
      href: "tel:+256775692335",
      color: "from-green-500 to-green-600"
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "WhatsApp Chat",
      description: "Get instant support via WhatsApp",
      action: "Start Chat",
      href: "https://wa.me/+256775692335",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: EnvelopeIcon,
      title: "Email Support",
      description: "Send us detailed inquiries",
      action: "Send Email",
      href: "mailto:support@onestopcentre.ug",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: DocumentArrowDownIcon,
      title: "Download Resources",
      description: "Access guides and documentation",
      action: "Download PDF",
      href: "#",
      color: "from-orange-500 to-orange-600"
    }
  ]

  const faqs = [
    {
      question: "How long does business registration take?",
      answer: "Business registration typically takes 3-5 business days through our streamlined process."
    },
    {
      question: "What are the minimum investment requirements for ATMS sectors?",
      answer: "Requirements vary: Agriculture ($500K), Tourism ($1M), Minerals ($2M), ICT ($250K)."
    },
    {
      question: "Can I track my application status?",
      answer: "Yes, you'll receive regular updates and can track progress through our online portal."
    },
    {
      question: "What documents do I need for tax registration?",
      answer: "You'll need business registration certificate, memorandum of association, and ID copies."
    }
  ]

  const handleContact = (href, title) => {
    if (href.startsWith('tel:')) {
      window.location.href = href
    } else if (href.startsWith('https://wa.me/')) {
      window.open(href, '_blank')
    } else if (href.startsWith('mailto:')) {
      window.location.href = href
    } else {
      // Handle download or other actions
      console.log(`Action for ${title}`)
    }
  }

  return (
    <section className="py-12 md:py-20 px-4 hero-bg">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Get <span className="text-yellow-400">Support</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Our dedicated team is here to help you navigate Uganda's business environment. 
            Reach out through your preferred channel.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => handleContact(method.href, method.title)}
              className="card card-hover group cursor-pointer text-center"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                <method.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {method.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                {method.description}
              </p>
              
              <button className="btn-primary text-sm w-full py-2">
                {method.action}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Business Hours & Location */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 md:mb-16"
        >
          <div className="card">
            <div className="flex items-center mb-4">
              <ClockIcon className="w-6 h-6 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Business Hours</h3>
            </div>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="font-medium">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium">9:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium">Closed</span>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  <strong>24/7 Online Services:</strong> Access our digital platforms anytime
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <MapPinIcon className="w-6 h-6 text-red-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Location</h3>
            </div>
            <div className="text-gray-700">
              <p className="mb-2">OneStopCentre Uganda</p>
              <p className="mb-2">Kampala Business District</p>
              <p className="mb-4">Uganda</p>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Multiple Locations:</strong> We serve clients nationwide through our network
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <h4 className="font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 md:p-8 border border-gray-200">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Business Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of successful businesses who have simplified their operations through OneStopCentre Uganda. 
              Let's build Uganda's economy together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleContact('tel:+256775692335', 'Call')}
                className="btn-primary"
              >
                Get Started Today
              </button>
              <button 
                onClick={() => handleContact('https://wa.me/+256775692335', 'WhatsApp')}
                className="btn-secondary"
              >
                Ask Questions
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Support