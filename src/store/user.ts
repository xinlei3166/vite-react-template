import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

let seed = 0

function getUserinfo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      seed += 1
      resolve({ user: '用户' + seed })
    }, 2000)
  })
}

export const setUserinfo = createAsyncThunk('user/setUserinfo', async () => {
  return await getUserinfo()
})

export interface UserState {
  name: string
}

const initialState: UserState = {
  name: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserinfo(state: UserState, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload }
    }
  },
  extraReducers: builder => {
    builder.addCase(setUserinfo.fulfilled, (state, action) => {
      const dispatch = useDispatch()
      dispatch({ type: 'user/changeUserinfo', payload: action.payload })
    })
  }
})

export const { changeUserinfo } = userSlice.actions

export default userSlice.reducer
