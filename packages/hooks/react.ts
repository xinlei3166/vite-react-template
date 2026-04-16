import type { SetStateAction } from 'react'
import { useEffect, useState, useRef } from 'react'

type Callback<S> = (state: S) => void

export function useCallbackState<S>(
  initialState?: S | (() => S)
): [S, (state: SetStateAction<S>, callback?: Callback<S>) => void] {
  const cbRef = useRef<Callback<S> | undefined>(undefined)
  const [state, _setState] = useState<S>(initialState!)

  useEffect(() => {
    cbRef.current?.(state)
    cbRef.current = undefined
  }, [state])

  const setState = (state: SetStateAction<S>, callback?: Callback<S>) => {
    cbRef.current = callback
    _setState(state)
  }

  return [state, setState]
}
