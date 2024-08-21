export interface IBoardData {
  title: string,
  id: number,
  status: 0 | 1 | 2,
  time?: number
}

export const statusConf = {
  0: '需求',
  1: 'bug'
}