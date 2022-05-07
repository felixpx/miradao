import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../src/components/Header/Header'
import HeroSection from '../src/components/HeroSection'
import Dashboard from '../src/components/Dashboard/Dashboard'
import Footer from '../src/components/Footer/Footer'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <HeroSection
        title={'Mira Dashboard'}
        description={
          'Discover the key metrics of Mira. Here you can find total fund donations, your rewards, protocol TVL, and more'
        }
      />
      <Dashboard />
      <Footer />
    </div>
  )
}

export default Home
