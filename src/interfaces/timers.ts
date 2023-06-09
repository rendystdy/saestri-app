import { Dayjs } from 'dayjs';
import { IDataContraction } from 'src/screens/ContractionTimer';

export interface TimerState {
  timerHistories: ITimerLog[]
  currentTimer: IDataContraction[]
  loading: boolean
  isSuspended: boolean
  counter: number,
}

export interface ITimerLog {
  date: Dayjs,
  entries: IDataContraction[]
  sessions: number
}
