import React from 'react'
import SliderPage from './SliderPage'
import images from "../images/images"
import HistoryPage from './HistoryPage'
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

const Index = () => {
  return (
    <div>
      <Header/>
      <LandingPage/>
      <HistoryPage id="history" />
      <Events id="events"/>
      <DetailsPage id="details"/>
      <ManagementPage id="management"/>
      <SliderPage id="gallery">
        {images.map((image, index) => (
          <img 
            className='w-full h-60 object-cover' 
            key={index} 
            src={image.imgURL} 
            alt={image.imgAlt} 
          />
        ))}
      </SliderPage>
      {/* <GalleryPage id="gallery" /> */}
      <MandapPage id="booking" />
      <ContactPage id="contact" />
      <Footer/>
      <DonateSection />
    </div>
  )
}

export default Index
