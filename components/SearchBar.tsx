'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchCategory from "./SearchCategory";
import SearchProduct from "./SearchProduct";
import { fetchProducts } from "@/utils";
import { ProductProps, QueryProductProps } from "@/types";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className='object-contain'
    />
  </button>
);

const SearchBar = ({ onSearch }: { onSearch: (key: string, value: string) => void }) => {
  const [category, setCategory] = useState<string>('');
  const [productModel, setProductModel] = useState<string>('');
  const [products, setProducts] = useState<ProductProps[]>([]);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (category.trim() === "" && productModel.trim() === "") {
      return alert("Please provide some input");
    }

    onSearch('make', category ? category.toLowerCase() : '');
    onSearch('model', productModel ? productModel.toLowerCase() : '');
  };

  const fetchProductsFromApi = async (newCategory: string, newProductModel: string) => {
    const query: QueryProductProps = {
      make: newCategory || '',
      model: newProductModel || '',
      year: 2022,
      fuel: '',
      limit: 12,
    };
    return await fetchProducts(query);
  };

  const handleCategoryChange = async (newCategory: string) => {
    setCategory(newCategory);
    const newProducts = await fetchProductsFromApi(newCategory, productModel);
    setProducts(newProducts.slice(0, 12));
    onSearch('make', newCategory ? newCategory.toLowerCase() : '');
  };

  const handleProductChange = async (newProductModel: string) => {
    setProductModel(newProductModel);
    const newProducts = await fetchProductsFromApi(category, newProductModel);
    setProducts(newProducts.slice(0, 12));
    onSearch('model', newProductModel ? newProductModel.toLowerCase() : '');
  };

  useEffect(() => {
    const fetchInitialProducts = async () => {
      const newProducts = await fetchProductsFromApi(category, productModel);
      setProducts(newProducts.slice(0, 12));
    };

    fetchInitialProducts();
  }, [category, productModel]);

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <SearchCategory
          category={category}
          setCategory={handleCategoryChange}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <div className='searchbar__item'>
        <SearchProduct
          query={productModel}
          setQuery={handleProductChange}
          products={products}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <SearchButton otherClasses='max-sm:hidden' />
    </form>
  );
};

export default SearchBar;
