import React from 'react'
import GalleryPage from './GalleryPage'
import ContactPage from './ContactPage'
import LandingPage from './LandingPage'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Events from './EventsPage'
import DetailsPage from './DetailsPage'
import ManagementPage from './ManagementPage'
import DonateSection from '../components/DonateSection'
import MandapPage from './MandapPage'
import VideoPage from './VideoPage'

const Index = () => {
  return (
    <div>
      <Header/>
      <LandingPage/>
      <VideoPage id="video" />
      <Events id="events"/>
      <DetailsPage id="details"/>
      <ManagementPage id="management"/>
      <GalleryPage id="gallery" />
      <MandapPage id="booking" />
      <ContactPage id="contact" />
      <Footer/>
      <DonateSection />
    </div>
  )
}

export default Index
