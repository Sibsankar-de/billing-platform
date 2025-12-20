import { UserDto } from "@/types/dto/userDto";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {} as UserDto,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      if (action.payload) state.data = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
