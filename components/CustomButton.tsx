'use client';
import { CustomButtonProps } from '@/types';
import Image from 'next/image';

const CustomButton = ({ title, buttonType, containerStyles, textStyles, icon, isDisabled, handleClick }: CustomButtonProps) => (
    <button
        disabled={isDisabled}
        type={buttonType || 'button'}
        className={`custom-btn ${containerStyles}`}
        onClick={(e) => {
            console.log('Button clicked');
            if (handleClick) {
                handleClick(e);
            }
        }}
    >
        <span className={`flex-1 ${textStyles}`}>
            {title}
        </span>
        {icon && (
            <div className='relative w-6 h-6'>
                <Image src={icon} alt='icon' fill className='object-contain' />
            </div>
        )}
    </button>
);

export default CustomButton;
