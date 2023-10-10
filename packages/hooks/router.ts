import { useNavigate } from 'react-router-dom'

export function useOpenRoute() {
  const navigate = useNavigate()

  const openRoute = (path: string, options: Record<string, any> = {}) => {
    navigate(path, options)
  }

  const openTab = (path: string, options: Record<string, any> = {}) => {
    window.open(path)
  }

  return { openRoute, openTab }
}
