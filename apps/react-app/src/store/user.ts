import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPermissions, getUserinfo } from '@/api'

export interface UserState {
  userinfo: Record<string, any>
  permissions: Record<string, any>[]
}
const initialState: UserState = {
  userinfo: {},
  permissions: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserinfo(
      state: UserState,
      action: PayloadAction<UserState['userinfo']>
    ) {
      return { ...state, userinfo: action.payload }
    },
    setPermissions(
      state: UserState,
      action: PayloadAction<UserState['permissions']>
    ) {
      return { ...state, permissions: action.payload }
    },
    cleanupUser(state: UserState) {
      return { ...state, userinfo: {}, permissions: [] }
    }
  }
  // extraReducers: builder => {
  //   builder.addCase(setUserinfo.fulfilled, (state, action) => {})
  // }
})

export const { setUserinfo, setPermissions, cleanupUser } = userSlice.actions
export default userSlice.reducer

export const fetchUserinfo = createAsyncThunk(
  'user/fetchUserinfo',
  async (_, { dispatch }) => {
    const res: any = await getUserinfo()
    if (!res || res.code !== 0) return
    dispatch(setUserinfo(res.data))
  }
)

export const fetchPermissions = createAsyncThunk(
  'user/fetchPermissions',
  async (_, { dispatch }) => {
    const res: any = await getPermissions()
    if (!res || res.code !== 0) return
    dispatch(setPermissions(res.data.list))
  }
)
