import { DeviceEventEmitter } from 'react-native';

const interval = 1000; // ms
let expected = Date.now() + interval;
let elapsed = Date.now();
// setTimeout(step, interval);

const drift_history:number[] = [];
const drift_history_samples = 10;
let drift_correction = 0;

let timerId = 0;
let isContraction = false;

// coba tambah logic machine learning yak
// fungsi calc_drift dipake utk cari median value dari drift history
// kenapa median? karena ini akan lebih akurat dan ketika ada banyak perbedaan value pada data dalam jumlah banyak
// median tidak akan terlalu berbeda jauh nilainya
// output: Overtime , perbedaan detik akan di koreksi secara otomatis oleh algoritma ini

export function calc_drift(arr: number[]) {

	const values = arr.concat();
  
	values.sort(function(a, b) {
		return a - b;
	});
	if (values.length === 0) { return 0; }
	const half = Math.floor(values.length / 2);
	if (values.length % 2) { return values[half]; }
	const median = (values[half - 1] + values[half]) / 2.0;
  
	return median;
}
DeviceEventEmitter.addListener('set_timer_id', timerData => {
	timerId = timerData.id;
	isContraction = timerData.isContraction;
});

export function step() {
	const dt = Date.now() - expected;
	if (dt > interval) {
		// jika terjadi ini gaswat banget nih
	}
	DeviceEventEmitter.emit('tick', { timerId, isContraction });
       
	// don't update the history for exceptionally large values
	// hanya update history ketika value dari drift tidak terlalu besar / lebih besar dari interval
	if (dt <= interval) {
		drift_history.push(dt + drift_correction);

		// prediksi jumlah koreksi berdasarkan drift history
		drift_correction = calc_drift(drift_history);

		if (drift_history.length >= drift_history_samples) {
			drift_history.shift();
		}
	}
   
	expected += interval;

	elapsed = Date.now();

	setTimeout(step, Math.max(0, interval - dt - drift_correction));
}
