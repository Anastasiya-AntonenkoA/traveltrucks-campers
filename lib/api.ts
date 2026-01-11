import axios from "axios";

// структура одного кемпера
export type Camper = {
    id: string;
    name: string;
    price: number;
    rating: number;
    location: string;
    description: string;
    form: "alcove" | "fullyIntegrated" | "panelTruck"; // типи кузова з макета (треба замінити)
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

// відповіді від бекенду
export type CampersResponse = {
    total: number;
    items: Camper[];
};

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io"; //мій
// axios.defaults.baseURL = "https://69625c65d9d64c761907adb2.mockapi.io";

export const getCampers = async (page: number = 1, limit: number = 4) => {
    const res = await axios.get<CampersResponse>("/campers", {
        params: {
            page: page,
            limit: limit
        }
    });
    return res.data;
};

// функція для одного кемпера (якщо є сторінка деталей)
// export const getCamperById = async (id: string) => {
//   const res = await instance.get<Camper>(`/campers/${id}`);
//   return res.data;
// };