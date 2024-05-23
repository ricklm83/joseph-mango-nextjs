import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    buttonType?: "button" | "submit";
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    textStyles?: string;
    icon?: string;
    isDisabled?: boolean;
}

export interface SearchCategoryProps {
    category: string;
    setCategory: (category: string) => void;
}

export interface CustomFilterProps {
    filter: string;
    setFilter: (filter: string) => void;
    onFilterChange: (key: string, value: string) => void;
}

export interface QueryProductProps {
    make?: string;
    model?: string;
    year: number;
    limit?: number;
    fuel?: string;
}

export interface HomeProps {
    searchParams: QueryProductProps;
}

export interface ProductProps {
    make: string;
    model: string;
    transmission: string;
    year: number
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: string;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    // Motocycles
    engine: string;
    power: string;
    torque: string;
    compression: string;
    bore_stroke: string;
    valves_per_cylinder: string;
    fuel_system: string;
    fuel_control: string;
    ignition: string;
    cooling: string;
    gearbox: string;
    clutch: string;
    fuel_consumption: string;
    emission: string;
    frame: string;
    front_suspension: string;
    front_wheel_travel: string;
    rear_suspension: string;
    rear_wheel_travel: string;
    front_tire: string;
    rear_tire: string;
    front_brakes: string;
    rear_brakes: string;
    dry_weight: string;
    total_weight: string;
    seat_height: string;
    total_length: string;
    wheelbase: string;
    fuel_capacity: string;
    starter: string;

    // Real-Time Amazon Data
    asin: string;
    product_title: string;
    product_price: string;
    product_original_price: string | null;
    currency: string;
    product_star_rating: string;
    product_num_ratings: number;
    product_url: string;
    product_photo: string;
    product_num_offers: number;
    product_minimum_offer_price: string;
    is_best_seller: boolean;
    is_amazon_choice: boolean;
    is_prime: boolean;
    climate_pledge_friendly: boolean;
    sales_volume: string | null;
    delivery: string;
}