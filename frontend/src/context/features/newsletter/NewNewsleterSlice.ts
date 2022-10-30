import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IUsuario from '../../../utils/interfaces/IUsuario'
import { ContenidoTotal } from '../../../components/newsletter/FormContentNewsletterComponent'
import { ProgramingNewsletterProps } from '../../../components/newsletter/FormProgramingNewsletterComponent'

export interface NewNewsletterState {
  users: IUsuario[],
  contenido: ContenidoTotal,
  programing: ProgramingNewsletterProps
}

const initialState: NewNewsletterState = {
  users: [],
  contenido: {
    titulo: '',
    asunto: '',
    contenido: '',
    attachments: []
  },
  programing: {
    sendNow: true,
    fecha: '',
    hora: '',
  }

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
    },
    addContenido: (state, action: PayloadAction<ContenidoTotal>) => {
      state.contenido = action.payload
    },
    addPrograming: (state, action: PayloadAction<{ fecha: string, hora: string, sendNow: boolean }>) => {
      state.programing = action.payload
    },
    resetNewNewsletter: (state) => {
      state.users = []
      state.contenido = {
        titulo: '',
        asunto: '',
        contenido: '',
        attachments: []
      }
      state.programing = {
        sendNow: true,
        fecha: '',
        hora: ''
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addUsers, removeUser, addContenido, addPrograming, resetNewNewsletter } = NewNewsletterSlice.actions

export default NewNewsletterSlice.reducer