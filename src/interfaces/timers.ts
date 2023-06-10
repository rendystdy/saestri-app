import { IDataContraction } from 'src/screens/ContractionTimer';

export interface TimerState {
  currentTimer: IDataContraction[]
  loading: boolean
}
