'use client';

import React, { Fragment, useState } from 'react';
import { Combobox, ComboboxOption, ComboboxInput, ComboboxOptions, ComboboxButton, Transition } from '@headlessui/react';
import Image from 'next/image';
import { categories } from '@/constants';
import { SearchCategoryProps } from '@/types';

const SearchCategory = ({ category, setCategory }: SearchCategoryProps) => {
  const [query, setQuery] = useState<string>('');

  const filteredCategories =
    query === ''
      ? categories
      : categories.filter((item) =>
          item.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className='search-category'>
      <Combobox value={category} onChange={setCategory}>
        <div className='relative w-full'>
          <ComboboxButton className='absolute top-[15px]'>
            <Image src='/category-logo.svg' alt='Category Logo' width={20} height={20} className='ml-4' />
          </ComboboxButton>

          <ComboboxInput
            className='search-category__input'
            placeholder='Category'
            displayValue={(category: string) => category}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <ComboboxOptions
              className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
              static
            >
              {filteredCategories.length === 0 && query !== '' ? (
                <ComboboxOption value={query} className='search-category__option'>
                  no match for '{query}'
                </ComboboxOption>
              ) : (
                filteredCategories.map((item) => (
                  <ComboboxOption
                    key={item}
                    value={item}
                    className='relative search-category__option data-[focus]:bg-primary-blue data-[focus]:text-white text-gray-900'
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {item}
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
    </div>
  );
};

export default SearchCategory;
