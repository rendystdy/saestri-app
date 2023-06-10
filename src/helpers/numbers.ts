export const padLeft = (value:number|string, len: number):string => {
	const str = value.toString();
	return str.length < len ? padLeft('0' + str, len) : str;
};
