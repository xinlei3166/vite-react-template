import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import COS from 'cos-js-sdk-v5'
import { getQcloudTmpkeys } from '@/api'
import type { Response } from '@packages/types'

export interface CosState {
  cosKeys: Record<string, any>
  cos: Record<string, any>
  expires: number | string
}
const initialState: CosState = {
  expires: '',
  cosKeys: {},
  cos: {}
}

const cosSlice = createSlice({
  name: 'cos',
  initialState,
  reducers: {
    setExpires(state: CosState, action: PayloadAction<Record<string, any>>) {
      const data = action.payload
      const timeDiff = data.expiredTime - data.startTime - 600
      const date = (new Date().getTime() / 1000) as any
      const dateNow = parseInt(date)
      const expires = dateNow + timeDiff
      return { ...state, expires }
    },
    setCosKeys(state: CosState, action: PayloadAction<Record<string, any>>) {
      const data = action.payload
      const cosKeys = {
        Bucket: data.bucket,
        Region: data.region
      }
      return { ...state, cosKeys }
    },
    setCos(state: CosState, action: PayloadAction<Record<string, any>>) {
      const data = action.payload
      const cos = new COS({
        getAuthorization(options, callback) {
          callback({
            TmpSecretId: data.tmpSecretId,
            TmpSecretKey: data.tmpSecretKey,
            XCosSecurityToken: data.sessionToken,
            ExpiredTime: data.expiredTime,
            StartTime: data.StartTime
          })
        }
      })
      return { ...state, cos }
    }
  }
})

export const { setExpires, setCosKeys, setCos } = cosSlice.actions
export default cosSlice.reducer

export const fetchTmpKeys = createAsyncThunk(
  'cos/fetchTmpKeys',
  async (_, { getState, dispatch }) => {
    const date = (new Date().getTime() / 1000) as any
    const dateNow = parseInt(date) // 当前时间戳
    const state = getState() as CosState
    console.log('cos-getState', state)
    if (dateNow > state.cos.expires) {
      // 初次和失效后调取
      const res = (await getQcloudTmpkeys()) as Response
      if (!res || res.code !== 0) return
      const data = res.data as Record<string, any>
      dispatch(setExpires(data))
      dispatch(setCosKeys(data))
      dispatch(setCos(data))
    }
  }
)
