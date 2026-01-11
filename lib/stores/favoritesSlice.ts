import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesState {
  items: string[];
  toggleFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      items: [],

      toggleFavorite: (id) =>
        set((state) => {
          const isFavorite = state.items.includes(id);
          const newItems = isFavorite
            ? state.items.filter((favId) => favId !== id)
            : [...state.items, id];
          
          return { items: newItems };
        }),
    }),
    {
      name: 'favorites',
      storage: createJSONStorage(() => localStorage),
    }
  )
);