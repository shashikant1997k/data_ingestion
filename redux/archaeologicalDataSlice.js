import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  archaeologicaList: [],
  isLoading: false,
  error: "",
};

const archaeologicalDataSlice = createSlice({
  name: "archaeologicalData",
  initialState,
  reducers: {
    archaeologicalDataAdd: (state, { payload }) => {
      state.isLoading = false;
      state.archaeologicaList = [payload, ...state.archaeologicaList];
      state.error = "";
    },
    archaeologicalDataEdit: (state, { payload }) => {
      const newData = [...state.archaeologicaList];
      let index = state.archaeologicaList.findIndex(
        (item) => item.id === payload?.id
      );

      if (index !== -1) {
        newData[index] = payload;
      }

      state.isLoading = false;
      state.archaeologicaList = newData;
      state.error = "";
    },
    archaeologicalDataDelete: (state, { payload }) => {
      const newData = [...state.archaeologicaList];
      let index = state.archaeologicaList.findIndex(
        (item) => item.id === payload
      );
      if (index !== -1) {
        newData.splice(index, 1);
      }
      state.isLoading = false;
      state.archaeologicaList = newData;
      state.error = "";
    },
    archaeologicalDataClear: (state) => {
      state.isLoading = false;
      state.error = "";
      state.archaeologicaList = [];
    },
  },
});

export const {
  archaeologicalDataAdd,
  archaeologicalDataDelete,
  archaeologicalDataClear,
  archaeologicalDataEdit,
} = archaeologicalDataSlice.actions;

export default archaeologicalDataSlice.reducer;
