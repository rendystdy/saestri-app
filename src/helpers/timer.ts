// Self-correcting setInterval
// intended for long intervals
// returns an object which "_id" property is the inner timeout id, so it can be canceled by clearInterval
export const selfCorrectingInterval = (cb:()=>void, ms:number) => {

	const innerTimeout = ms < 1000 ? 100 : 1000; // fire every ?s
	let begin = performance.now(), // what time is it?
		last = begin + ms, // when should all this end?
		next = Math.min(innerTimeout, ms),
		prev = begin,
	
		passed = true; // a flag to avoid try-catch the callback

	const 	result = {
		_id: setTimeout(inner, next),
	};
	return result;

	function inner() {
		if (!passed) { return; }
		passed = false; // set up the callback trap

		let shouldCall = false;
		const now = performance.now(),
			delay = (now - prev) - innerTimeout;
		prev += innerTimeout; // fixed increment

		if (last - now < 6) {
			shouldCall = true;
			begin = last; // start a new interval
			last += ms;
		}

		next = Math.min(innerTimeout - delay, last - now);
		result._id = setTimeout(inner, next);
		// call it at the end so we can cancel inside the callback
		if (shouldCall) {
			cb();
		}
		passed = true; // didn't throw we can continue
	}
};
