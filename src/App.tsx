import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import theme from './styles/theme'
import Header from './components/layout/Header'
import HeroSection from './components/layout/HeroSection'
import AboutSection from './components/layout/AboutSection'
import ServicesSection from './components/layout/ServicesSection'
import CoursesSection from './components/layout/CoursesSection'
import TestimonialsSection from './components/layout/TestimonialsSection'
import TeachersSection from './components/layout/TeachersSection'
import CertificateSection from './components/layout/CertificateSection'
import ContactSection from './components/layout/ContactSection'
import Footer from './components/layout/Footer'
import ScrollProgress from './components/ui/ScrollProgress'
import { MobileMenuContext } from './components/layout/CoursesSection'

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Прокручиваем страницу вверх при загрузке/обновлении
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MobileMenuContext.Provider value={isMobileMenuOpen}>
        <ScrollProgress />
        <Header onMenuToggle={setIsMobileMenuOpen} />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <CoursesSection />
          <TeachersSection />
          <TestimonialsSection />
          <CertificateSection />
          <ContactSection />
        </main>
        <Footer />
      </MobileMenuContext.Provider>
    </ThemeProvider>
  )
}

export default App
