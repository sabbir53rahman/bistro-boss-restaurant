import React from 'react'
import Banner from './Banner'
import Category from './Category'
import PopularMenu from './PopularMenu'
import Featured from './Featured'
import ServicesSection from './ServicesSection'
import GalleryPage from '../GalleryPage/GalleryPage'
import Testimonials from './Testimonials'

function Home() {
  return (
    <>
      <Banner/> 
      <Category/> 
      <ServicesSection/>
      <Featured/>
      <PopularMenu/>
      <Testimonials/> 
      
    </>
  )
}

export default Home