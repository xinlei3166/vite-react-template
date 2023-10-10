import { useEffect, useState, useRef } from 'react'
import type { SetStateAction } from 'react'

type Callback<S> = (state: S) => void

export function useCallbackState<S>(
  initialState?: S | (() => S)
): [S, (state: SetStateAction<S>, callback?: Callback<S>) => void] {
  const cbRef = useRef<Callback<S>>()
  const [state, _setState] = useState<S>(initialState!)

  useEffect(() => {
    cbRef.current && cbRef.current(state)
  }, [state])

  const setState = (state: SetStateAction<S>, callback?: Callback<S>) => {
    cbRef.current = callback
    _setState(state)
  }

  return [state, setState]
}
