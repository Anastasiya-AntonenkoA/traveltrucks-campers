import axios from "axios";

export type Camper = {
    id: string;
    name: string;
    price: number;
    rating: number;
    location: string;
    description: string;
    form: "alcove" | "fullyIntegrated" | "panelTruck";
    length: string;
    width: string;
    height: string;
    tank: string;
    consumption: string;
    transmission: "manual" | "automatic";
    engine: "diesel" | "petrol" | "hybrid";
    AC: boolean;
    bathroom: boolean;
    kitchen: boolean;
    TV: boolean;
    radio: boolean;
    refrigerator: boolean;
    microwave: boolean;
    gas: boolean;
    water: boolean;
  
    gallery: {
        thumb: string;
        original: string;
    }[];
    reviews: {
        reviewer_name: string;
        reviewer_rating: number;
        comment: string;
    }[];
};

export type FilterParams = {
    location?: string;
    form?: string;
    AC?: boolean;
    transmission?: string;
    kitchen?: boolean;
    TV?: boolean;
    bathroom?: boolean;
};

export type CampersResponse = {
    total: number;
    items: Camper[];
};

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io"; //мій
// axios.defaults.baseURL = "https://69625c65d9d64c761907adb2.mockapi.io";

export const getCampers = async (
    page: number = 1, 
    limit: number = 4, 
    filters: FilterParams = {} 
) => {
    const params: Record<string, string | number | boolean> = {
        page,
        limit,
    };

    if (filters.location) params.location = filters.location;
    if (filters.form) params.form = filters.form;
    
    if (filters.AC) params.AC = true;
    if (filters.kitchen) params.kitchen = true;
    if (filters.TV) params.TV = true;
    if (filters.bathroom) params.bathroom = true;
    
    try {
        const res = await axios.get<CampersResponse>("/campers", { params });
        return res.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return { items: [], total: 0 };
        }
        console.error("API error:", error);
        throw error;
    }
};

export const getCamperById = async (id: string) => {
    try {
        const res = await axios.get<Camper>(`/campers/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching camper by id:", error);
        return null;
    }
};