import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addconnection: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => {
      return null;
    },
  },
});

export const { addconnection, removeConnection } = connectionsSlice.actions;
export default connectionsSlice.reducer;
