import { configureStore } from '@reduxjs/toolkit'
import newNewsletterReducer from './features/newsletter/NewNewsleterSlice'

export const store = configureStore({
  reducer: {
    newNewsletter: newNewsletterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch