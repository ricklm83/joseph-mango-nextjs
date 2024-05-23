'use client';
import React, { useState, Fragment } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import Image from 'next/image';
import { ProductProps } from '@/types';

interface SearchProductProps {
  query: string;
  setQuery: (query: string) => void;
  products: ProductProps[];
}

const SearchProduct = ({ query, setQuery, products }: SearchProductProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <Combobox value={query} onChange={setQuery}>
      <div className='relative w-full'>
        <ComboboxButton className='absolute top-[15px]'>
          <Image src='/moto2.png' alt='Product Icon' width={50} height={50} className='ml-4' />
        </ComboboxButton>

        <ComboboxInput
          className='searchbar__input'
          placeholder='Search for a product...'
          displayValue={(product: string) => product}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <Transition
          as={Fragment}
          show={isFocused && products.length > 0}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <ComboboxOptions
            className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
            static
          >
            {products.length === 0 && query !== '' ? (
              <ComboboxOption value={query} className='search-product__option'>
                no match for '{query}'
              </ComboboxOption>
            ) : (
              products.map((product) => (
                <ComboboxOption
                  key={`${product.make}-${product.model}-${product.year}-${product.transmission}`}
                  value={product.model}
                  className='relative search-product__option data-[focus]:bg-primary-blue data-[focus]:text-white text-gray-900'
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {product.model}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-primary-purple'>
                        </span>
                      ) : null}
                    </>
                  )}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </Transition>
      </div>
    </Combobox>
  );
};

export default SearchProduct;
