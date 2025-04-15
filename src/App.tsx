import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import theme from './styles/theme'
import Header from './components/layout/Header'
import HeroSection from './components/layout/HeroSection'
import AboutSection from './components/layout/AboutSection'
import ServicesSection from './components/layout/ServicesSection'
import CoursesSection from './components/layout/CoursesSection'
import TestimonialsSection from './components/layout/TestimonialsSection'
import CertificateSection from './components/layout/CertificateSection'
import ContactSection from './components/layout/ContactSection'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'
import ScrollProgress from './components/ui/ScrollProgress'

function App() {
  useEffect(() => {
    // Загружаем шрифты для проекта
    const loadFonts = async () => {
      const linkCormorant = document.createElement('link')
      linkCormorant.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap'
      linkCormorant.rel = 'stylesheet'
      document.head.appendChild(linkCormorant)

      const linkInter = document.createElement('link')
      linkInter.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap'
      linkInter.rel = 'stylesheet'
      document.head.appendChild(linkInter)
    }

    loadFonts()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CoursesSection />
        <TestimonialsSection />
        <CertificateSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop showBelow={300} />
    </ThemeProvider>
  )
}

export default App
