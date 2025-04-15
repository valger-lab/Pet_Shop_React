import { createSlice } from "@reduxjs/toolkit";

const discountSlice = createSlice({
  name: "discount",
  initialState: {
    userData: { name: "", phone: "", email: "" }, // Данные пользователя
    discountApplied: false, // Применена ли скидка
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload; // Сохраняем данные пользователя
    },
    applyDiscount: (state) => {
      state.discountApplied = true; // Применяем скидку
    },
  },
});

export const { setUserData, applyDiscount } = discountSlice.actions;
export default discountSlice.reducer;
