import mitt from 'mitt'

const bus = mitt<any>()
export const useBus = () => bus
