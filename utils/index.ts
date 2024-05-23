const axios = require('axios');
import { countryToCurrencyMap, categories } from "@/constants";
import { ProductProps, QueryProductProps } from "@/types";

// Old fetchProducts CARS API --> Cars by API-Ninjas (https://rapidapi.com/apininjas/api/cars-by-api-ninjas)
// url: `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&model=${model}&limit=${limit}&year=${year}&fuel_type=${fuel}`,

export async function fetchProducts(query : QueryProductProps, ) {
    const { make, model, year } = query;

    const options = {
        method: 'GET',
        url: `https://cars-by-api-ninjas.p.rapidapi.com/v1/motorcycles?make=${make}&model=${model}`,
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
            'X-RapidAPI-Host': 'motorcycles-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }

}

// New fetchProducts PRODUCT API - Limit is 100 API call month on free plan :(
// export const fetchProducts = async (category_id: string = '2478868012', query: string = '') => {
//     const options = {
//       method: 'GET',
//       url: 'https://real-time-amazon-data.p.rapidapi.com/products-by-category',
//       params: {
//         category_id,
//         page: '1',
//         country: 'US',
//         query
//       },
//       headers: {
//         'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
//         'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
//       }
//     };

//     try {
//       const response = await axios.request(options);
//       return response.data.data.products;
//     } catch (error) {
//       console.error(error);
//       return [];
//     }
//   };

export async function calculateProductPrice(city_mpg?: number, year?: number) {
    // Generate a base price between $200 and $300
    let basePrice = 200 + Math.random() * 100;

    // Adjust price based on city MPG (if provided)
    if (city_mpg) {
        const mpgFactor = city_mpg * 10;
        basePrice += mpgFactor;
    }

    // Adjust price based on year (if provided)
    if (year) {
        const currentYear = new Date().getFullYear();
        const age = currentYear - year;
        const ageFactor = Math.max(0, (15 - age)) * 10;
        basePrice += ageFactor;
    }

    // Ensure price is not negative
    if (basePrice < 0) {
        basePrice = 0;
    }

    return Math.round(basePrice); // Return the calculated price rounded to the nearest dollar
}


export async function getCountryFromIP(): Promise<string> {
    // const options = {
    //     method: 'GET',
    //     url: 'https://ip-geo-location.p.rapidapi.com/ip/check',
    //     params: { format: 'json' },
    //     headers: {
    //         'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    //         'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
    //     }
    // };

    try {
        // const response = await axios.request(options);
        // const country = response.data.country.name;
        // return country.toLowerCase(); // Return the country name in lowercase
        return 'brazil';
    } catch (error) {
        console.error('Error fetching country from IP:', error);
        return 'united states'; // Default to 'united states' in case of an error
    }
}

export async function getCurrencyByCountry(country?: string): Promise<string> {
    let countryLowerCase: string;

    if (country) {
        // Convert the provided country name to lowercase
        countryLowerCase = country.toLowerCase();
    } else {
        // Fetch the country based on IP if no country is provided
        countryLowerCase = await getCountryFromIP();
    }

    // Retrieve the currency from the map, defaulting to US dollar if not found
    const currency = countryToCurrencyMap[countryLowerCase] || '$';

    return currency;
}

export const generateProductImageUrl = (product: ProductProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = product;

    url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append('angle', `${angle}`);

    return `${url}`;
}

// Based using Real-Time Amazon Data Sample from Rapid API  --> https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-amazon-data
// export const fetchCategoryList = async () => {

//     const options = {
//         method: 'GET',
//         url: 'https://real-time-amazon-data.p.rapidapi.com/product-category-list',
//         params: { country: 'US' },
//         headers: {
//             'X-RapidAPI-Key': 'f42936c26bmsh9844c26c6d016f6p15d984jsn3dc1f1d114ba',
//             'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await axios.request(options);
//         return response.data.data.map((item: { name: string }) => item.name);
//     } catch (error) {
//         console.error(error);
//         return [];
//     }

// }

export const fetchCategoryList = async () => {
    try {
        const response = categories;
        return response;
    } catch (error) {
        console.error(error);
        return [];
    }
}