import authAction from './auth/auth.action';
import authReducers from './auth/auth.reducer';

import miscAction from './misc/misc.action';
import miscReducers from './misc/misc.reducer';

import contactAction from './contact/contact.action';
import contactReducers from './contact/contact.reducer';

import timerAction from './timers/timer.action';
import timerReducers from './timers/timer.reducers';

const Actions = {
	authAction,
	miscAction,
	contactAction,
	timerAction,
};

const Reducers = {
	authReducers,
	miscReducers,
	contactReducers,
	timerReducers,
};

export {
	Actions,
	Reducers,
};
