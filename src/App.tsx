import { SplashIntro } from './components/SplashIntro'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { AboutJosi } from './components/AboutJosi'
import { Services } from './components/Services'
import { FeaturedService } from './components/FeaturedService'
import { BookingProcess } from './components/BookingProcess'
import { OnSite } from './components/OnSite'
import { BookingForm } from './components/BookingForm'
import { Portfolio } from './components/Portfolio'
import { FAQ } from './components/FAQ'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import { BackToTop } from './components/BackToTop'

function App() {
  return (
    <>
      <SplashIntro />
      <Header />
      <main>
        <Hero />
        <AboutJosi />
        <Services />
        <FeaturedService />
        <BookingProcess />
        <OnSite />
        <BookingForm />
        <Portfolio />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </>
  )
}

export default App
