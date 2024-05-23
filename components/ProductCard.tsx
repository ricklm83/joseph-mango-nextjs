'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProductProps } from '@/types';
import CustomButton from './CustomButton';
import { calculateProductPrice, getCurrencyByCountry } from '@/utils';
import ProductDetails from './ProductDetails';

interface ProductCardProps {
    product: ProductProps;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [productPrice, setProductPrice] = useState(0);
    const [currency, setCurrency] = useState('');

    const { make, model, year, gearbox, displacement, engine } = product;

    useEffect(() => {
        const fetchProductDetails = async () => {
            const price = await calculateProductPrice(100, year);
            const currencySymbol = await getCurrencyByCountry();

            setProductPrice(price);
            setCurrency(currencySymbol);
        };

        // Fetch the initial PRODUCT List 
        fetchProductDetails();

        console.log('Product Card Component mounted...');
    }, []);

    const handleViewMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('View More clicked');
        setIsOpen(true);
    };

    // Extract displacement value
    const match = displacement?.match(/(\d+\.\d+ ccm)/);
    const extractedDisplacement = match ? match[0] : '';

    return (
        <div className='product-card group'>
            <div className='product-card__content'>
                <h2 className='product-card__content-title'>
                    {make} {model}
                </h2>
            </div>

            <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
                <span className='self-start text-[14px] leading-[17px] font-semibold'>
                    {currency}
                </span>
                <span>
                    {productPrice}
                </span>
            </p>

            <div className='product-card__image'>
                <Image src='/hero.png' alt='product photo' width={250} height={200} priority className='object-contain' />
            </div>

            <div className='relative flex w-full mt-2'>
                <div className='flex group-hover:invisible w-full justify-between text-grey'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src="/engine.svg" width={20} height={20} alt="seat" />
                        <p className="product-card__icon-text">{extractedDisplacement}</p>
                    </div>
                    <div className="product-card__icon">
                        <Image src="/gearbox.svg" width={20} height={20} alt="seat" />
                        <p className="product-card__icon-text">{gearbox}</p>
                    </div>
                    <div className="product-card__icon">
                        <Image src="/calendar.svg" width={20} height={20} alt="seat" />
                        <p className="product-card__icon-text">{year}</p>
                    </div>
                </div>

                <div className="product-card__btn-container">
                    <CustomButton
                        title='View More'
                        containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
                        textStyles='text-white text-[14px] leading-[17px] font-bold'
                        icon='/right-arrow.svg'
                        handleClick={handleViewMoreClick}
                    />
                </div>
            </div>

            <ProductDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} product={product} />
        </div>
    );
};

export default ProductCard;
