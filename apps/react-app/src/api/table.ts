import type { Request, Response, Config } from '@packages/types'
import { requests } from './base'

export function getData(data: Request, config?: Config): Promise<Response> {
  return requests.post('/api/table/data', data, config)
}
