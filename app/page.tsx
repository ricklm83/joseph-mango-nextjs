'use client';

import { useEffect, useCallback, useState } from 'react';
import CustomFilter from '@/components/CustomFilter';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import { HomeProps, ProductProps } from '@/types';
import { fetchProducts } from '@/utils';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Home({ searchParams } : HomeProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isProductEmpty, setIsProductEmpty] = useState<boolean>(false);
  const [customFilter, setCustomFilter] = useState<string>('');

  // Fetch products whenever searchParams change
  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const fetchedProducts = await fetchProducts({
        make: searchParams.make || 'ducati',
        model: searchParams.model || ' ',
        year: searchParams.year || 2022,
        limit: searchParams.limit || 12,
      });

      setProducts(fetchedProducts);
      setIsProductEmpty(!fetchedProducts || !Array.isArray(fetchedProducts) || fetchedProducts.length < 1);
    };

    fetchAndSetProducts();
  }, [searchParams]);

  // Restore scroll position on mount
  useEffect(() => {
    const persistentScroll = sessionStorage.getItem('persistentScroll');
    if (persistentScroll !== null) {
      window.scrollTo({ top: Number(persistentScroll) });
      sessionStorage.removeItem('persistentScroll');
    }
  }, []);

  // Save scroll position before navigating
  const setSearchParam = useCallback(
    (key: string, value: string) => {
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set(key, value);

      sessionStorage.setItem('persistentScroll', window.scrollY.toString());
      router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  const handleFilterChange = (filterKey: string, filterValue: string) => {
    setSearchParam(filterKey, filterValue);
  };

  return (
    <main className='overflow-hidden'>
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='showProducts'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Product Catalog</h1>
          <p>Explore the products you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar onSearch={(key: string, value: string) => handleFilterChange(key, value)} />
          {/* <div className='home__filter-containers'>
            <CustomFilter 
              filter={customFilter} 
              setFilter={setCustomFilter} 
              onFilterChange={(key: string, value: string) => handleFilterChange(key, value)} 
            />
          </div> */}
        </div>

        {!isProductEmpty ? (
          <section>
            <div className='home__products-wrapper'>
              {products?.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>No Products to show</h2>
          </div>
        )}
      </div>
    </main>
  );
}
