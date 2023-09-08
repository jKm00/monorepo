export const deleteCookie = (name: string) => {
	document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
