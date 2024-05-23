'use client'
import CustomButton from './CustomButton'
import Image from 'next/image'

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("showProducts");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className='hero'>
      <div className='flex-1 pt-36 padding-x'>
        <h1 className='hero__title'>Find your Products here</h1>
        <p className='hero__subtitle'> Sample product showcase application</p>

        <CustomButton
          title='Explore Products'
          buttonType='button'
          containerStyles='bg-primary-blue text-white rounded-full mt-10'
          handleClick={handleScroll}
        />
      </div>

      <div className='hero__image-container'>
        <div className='hero__image'>
          <Image src='/hero.png' alt='hero' fill className='object-contain' />
        </div>
        <div className='hero__image-overlay' />

      </div>
    </div>
  )
}

export default Hero