import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { AboutJosi } from './components/AboutJosi'
import { Services } from './components/Services'
import { FeaturedService } from './components/FeaturedService'
import { BookingProcess } from './components/BookingProcess'
import { BookingForm } from './components/BookingForm'
import { Portfolio } from './components/Portfolio'
import { FAQ } from './components/FAQ'
import { FinalCta } from './components/FinalCta'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import { BackToTop } from './components/BackToTop'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutJosi />
        <Services />
        <FeaturedService />
        <BookingProcess />
        <BookingForm />
        <Portfolio />
        <FAQ />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </>
  )
}

export default App
