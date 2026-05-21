import { useState } from 'react'
import Scene3D from './components/Scene3D'

function App() {
  const [activeFaq, setActiveFaq] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'We offer comprehensive accounting and tax services including non-audited and audited financial statement preparation, bookkeeping services, payroll support, and tax preparation and filing for both individuals and businesses.'
    },
    {
      question: 'Do you work with small businesses?',
      answer: 'Absolutely! We specialize in helping small and medium-sized businesses maintain accurate financial records, stay compliant with tax regulations, and make informed financial decisions.'
    },
    {
      question: 'How often should I update my books?',
      answer: 'We recommend updating your books at least monthly to ensure accurate financial reporting and timely tax filing. However, we can work with you to determine the best schedule for your business needs.'
    },
    {
      question: 'What documents do I need for tax preparation?',
      answer: 'You\'ll need income statements, expense receipts, bank statements, previous tax returns, and any relevant financial documents. We\'ll provide you with a detailed checklist based on your specific situation.'
    },
    {
      question: 'Are my financial information confidential?',
      answer: 'Yes, absolutely. We maintain strict confidentiality protocols and use secure systems to protect all client financial information. Your privacy and data security are our top priorities.'
    }
  ]

  const testimonials = [
    {
      text: 'Zen Accounting has transformed how we manage our finances. Their team is professional, responsive, and always available to answer our questions. Highly recommended!',
      author: 'Sarah Johnson, CEO - TechStart Inc.'
    },
    {
      text: 'The tax preparation service saved us so much time and stress. They caught deductions we would have missed and ensured everything was filed correctly.',
      author: 'Michael Chen, Owner - Chen Retail Group'
    },
    {
      text: 'As a small business owner, I was overwhelmed with bookkeeping. Zen Accounting simplified everything and now I have clear visibility into my finances.',
      author: 'Emily Rodriguez, Founder - Green Leaf Cafe'
    }
  ]

  return (
    <>
      <Scene3D />
      <div className="content-wrapper">
      {/* Navigation */}
      <nav>
        <div className="nav-content">
          <a href="#" className="logo">Zen Accounting</a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#why-us">Why Us</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Zen Accounting and Tax Consultancy</h1>
          <p>Your trusted partner for professional accounting, bookkeeping, and tax services. We help businesses and individuals maintain accurate financial records, stay compliant, and make informed financial decisions.</p>
          <a href="#contact" className="cta-button">Get Started Today</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <h2 className="section-title">About Us</h2>
        <div className="about-grid">
          <div className="about-card">
            <h3>Our Mission</h3>
            <p>To provide reliable, accurate, and professional accounting and tax solutions that help businesses maintain financial clarity, meet regulatory obligations, and achieve sustainable growth through exceptional service and integrity.</p>
          </div>
          <div className="about-card">
            <h3>Our Vision</h3>
            <p>To become a leading and trusted accounting and tax consultancy recognized for excellence, professionalism, and empowering businesses with sound financial management solutions.</p>
          </div>
          <div className="about-card">
            <h3>Our Goal</h3>
            <p>To simplify accounting and taxation for our clients by providing reliable, timely, and professional financial support tailored to their unique needs.</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Non-Audited Financial Statement Preparation</h3>
            <p>We prepare professional financial statements for businesses that do not require statutory audits. These reports help business owners understand their financial performance and position.</p>
            <ul>
              <li>Income Statement</li>
              <li>Statement of Financial Position</li>
              <li>Cash Flow Statement</li>
              <li>Financial Reports</li>
            </ul>
          </div>

          <div className="service-card">
            <h3>Audited Financial Statement Preparation</h3>
            <p>We assist businesses in preparing financial statements that are ready for independent audit examination in accordance with accounting standards and regulatory requirements.</p>
            <ul>
              <li>Improved credibility</li>
              <li>Regulatory compliance</li>
              <li>Better investor and lender confidence</li>
              <li>Accurate financial reporting</li>
            </ul>
          </div>

          <div className="service-card">
            <h3>Bookkeeping Services</h3>
            <p>We help businesses maintain accurate and organized financial records by recording daily financial transactions and managing accounting records efficiently.</p>
            <ul>
              <li>Sales and purchase recording</li>
              <li>Expense tracking</li>
              <li>Bank reconciliation</li>
              <li>Payroll support</li>
              <li>Financial record management</li>
            </ul>
          </div>

          <div className="service-card">
            <h3>Tax Preparation and Filing</h3>
            <p>We assist individuals and businesses in preparing and filing tax returns accurately and on time while ensuring compliance with tax laws and regulations.</p>
            <ul>
              <li>VAT returns</li>
              <li>Income tax returns</li>
              <li>PAYE filing</li>
              <li>Tax calculations</li>
              <li>Tax compliance support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <h4>Professional & Reliable</h4>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <h4>Accurate Reporting</h4>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <h4>Timely Tax Filing</h4>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <h4>Confidential Service</h4>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <h4>Client-Focused</h4>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <h4>Affordable Pricing</h4>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <h2 className="section-title">Client Testimonials</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">{testimonial.text}</p>
              <p className="testimonial-author">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeFaq === index ? 'active' : ''}`}
            >
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                <span>{faq.question}</span>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <strong>Address:</strong>
                <p>123 Business Street, Financial District</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <strong>Phone:</strong>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <strong>Email:</strong>
                <p>info@zenaccounting.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🕐</div>
              <div>
                <strong>Working Hours:</strong>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">f</a>
              <a href="#" className="social-link">in</a>
              <a href="#" className="social-link">𝕏</a>
              <a href="#" className="social-link">ig</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                placeholder="John Doe"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                placeholder="john@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleFormChange}
                required
                placeholder="How can we help?"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                required
                rows="5"
                placeholder="Tell us about your needs..."
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" style={{ textAlign: 'center', paddingBottom: '8rem' }}>
        <div className="hero-content" style={{ margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#667eea', marginBottom: '1.5rem' }}>Ready to Simplify Your Finances?</h2>
          <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>Let us handle your accounting and tax needs while you focus on growing your business.</p>
          <a href="#contact" className="cta-button">Schedule a Free Consultation</a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Zen Accounting and Tax Consultancy. All rights reserved.</p>
      </footer>
      </div>
    </>
  )
}

export default App
