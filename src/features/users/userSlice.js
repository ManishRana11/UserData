import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    editUser: (state, action) => {
      const { id, firstname, lastname, group, permissions } = action.payload;
      const existingUser = state.find(user => user.id === id);
      if(existingUser) {
        existingUser.firstname = firstname;
        existingUser.lastname = lastname;
        existingUser.group = group;
        existingUser.permissions = permissions;
      }
    },
    // deleteUser: (state, action) => {
    //   const { id } = action.payload;
    //   const existingUser = state.find(user => user.id === id);
    //   if(existingUser) {
    //     return state.filter(user => user.id !== id);
    //   }
    // }
  }
});

export const { addUser, editUser } = userSlice.actions;
export default userSlice.reducer;