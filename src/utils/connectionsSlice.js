import { createSlice } from "@reduxjs/toolkit";

const connectionSLice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnections: () => null,
  },
});

export const { addConnections, removeConnections } = connectionSLice.actions;

export default connectionSLice.reducer;
