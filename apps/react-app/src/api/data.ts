import type { Request, Response, Config } from '@packages/types'
import { requests } from './base'

export function getList(config?: Config): Promise<any> {
  return requests.get('/api/mock/data/list', config)
}
