import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  items: string[];
}

const initialState: FavoritesState = {
  items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('favorites') || '[]') : [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter(favId => favId !== id);
      } else {
        state.items.push(id);
      }
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;