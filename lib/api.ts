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

// axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";
axios.defaults.baseURL = "https://69625c65d9d64c761907adb2.mockapi.io";

export const getCampers = async () => {
    const res = await axios.get<CampersResponse>("/campers");
    return res.data;
};

// const instance = axios.create({
//   baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
// });

// отримання списку кемперів
// export const getCampers = async (page = 1, limit = 4) => {
//   try {
//     const res = await instance.get<Camper[]>("/campers", {
//       params: {
//         page,
//         limit,
//       },
//     });
    
//     // Якщо MockAPI повертає просто масив, ми самі формуємо структуру
//     return {
//       items: res.data,
//       total: res.data.length // Або інше значення, якщо API не дає total
//     };
//   } catch (error) {
//     console.error("Помилка при завантаженні кемперів:", error);
//     throw error;
//   }
// };

// функція для одного кемпера (якщо є сторінка деталей)
// export const getCamperById = async (id: string) => {
//   const res = await instance.get<Camper>(`/campers/${id}`);
//   return res.data;
// };