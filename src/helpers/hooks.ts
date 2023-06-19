/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppState, AppStateStatus } from 'react-native';

import { ReduxConfig } from '@config';

const useAppDispatch = (action: any) => {
	const dispatch = useDispatch();

	return useCallback((param?: any, callback?: any) => dispatch(action(param, callback)), [dispatch, action]);
};

const useAppSelector: TypedUseSelectorHook<ReduxConfig.RootState> = useSelector;

const useIsForeground = (): boolean => {
	const [isForeground, setIsForeground] = useState(true);

	useEffect(() => {
		const onChange = (state: AppStateStatus): void => {
			setIsForeground(state === 'active');
		};
		const listener = AppState.addEventListener('change', onChange);
		return () => listener.remove();
	}, [setIsForeground]);

	return isForeground;
};

export { useAppDispatch, useAppSelector, useIsForeground };
