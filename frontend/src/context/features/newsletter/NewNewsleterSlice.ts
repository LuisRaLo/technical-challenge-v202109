import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IUsuario from '../../../utils/interfaces/IUsuario'

export interface NewNewsletterState {
  users: IUsuario[]
}

const initialState: NewNewsletterState = {
  users: []
}

export const NewNewsletterSlice = createSlice({
  name: 'newNewsletter',
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<IUsuario[]>) => {
      state.users = action.payload
    },
    removeUser: (state, action: PayloadAction<IUsuario>) => {
      state.users = state.users.filter(user => user.email !== action.payload.email)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addUsers, removeUser } = NewNewsletterSlice.actions

export default NewNewsletterSlice.reducer