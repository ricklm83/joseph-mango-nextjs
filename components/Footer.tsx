import Image from 'next/image'
import Link from 'next/link'

import { footerLinks } from '@/constants'

const Footer = () => {
    return (
        <footer className='flex flex-col text-black-100  mt-5 border-t border-gray-100'>
            {/* Logo and company name - First part of the Footer */}
            <div className='flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10'>
                <div className='flex flex-col justify-start items-start gap-6'>
                    <Image src='/logo.svg' alt='logo' width={110} height={30} className='object-contain' />
                    <p className='text-base text-gray-700'>
                        Joseph Mango 2024 <br />
                    </p>
                </div>
                {/* Columns with Footer Links - Getting data from the CONSTANTS - Second part of the Footer */}
                <div className='footer__links'>
                    {footerLinks.map((link) => (
                        <div key={link.title} className='footer__link'>
                            <h3 className='font-bold'>
                                {link.title}
                            </h3>
                            {link.links.map((item) => (
                                <Link key={item.title} href={item.url} className='text-gray-500'>
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            {/* last part of the footer  */}
            <div className='flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10'>
                <p>2024 Joseph Mango. All rights reserved</p>

                <div className="footer__copyrights-link">
                    <Link href="/" className="text-gray-500">
                        Privacy & Policy
                    </Link>
                    <Link href="/" className="text-gray-500">
                        Terms & Condition
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer