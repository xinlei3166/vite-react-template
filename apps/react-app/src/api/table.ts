import type { Config } from '../lib/requests'
import requests from '../lib/requests'
import type { Request, Response } from '../interface'

export function getData(data: Request, config?: Config): Promise<Response> {
  return requests.post('/api/table/data', data, config)
}
