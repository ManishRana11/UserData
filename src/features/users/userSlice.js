import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const url = 'http://localhost:8000'

const initialState = [];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
      console.log(action, "state");
      const options = {
        url: `${url}/add`,
        method: 'post',
        data: {
          id: action.payload.id,
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          group: action.payload.group,
          permissions: action.payload.permissions,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      };
      axios(options)
      .then(() => {
        toast.success('User successfully created');
      })
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