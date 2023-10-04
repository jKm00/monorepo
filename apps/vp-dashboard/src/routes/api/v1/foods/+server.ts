import { items, type Item } from '$lib/server/foods';
import { json } from '@sveltejs/kit';
import dayjs from 'dayjs'


export const GET = async ({ url }) => {
	let result = items;
	const searchParams = url.searchParams;

	const names = searchParams.getAll('name')?.map((n) => n.toLowerCase());
	if (names.length > 0) {
		let tmp: Item[] = [];
		names.forEach((name) => {
			tmp = [...tmp, ...result.filter((item) => item.name.toLowerCase().includes(name))];
		});
		result = tmp;
	}

	const categories = searchParams.getAll('category')?.map((c) => c.toLowerCase());
	if (categories.length > 0) {
		let tmp: Item[] = [];
		categories.forEach((category) => {
			tmp = [...tmp, ...result.filter((item) => item.category.toLowerCase().includes(category))];
		});
		result = tmp;
	}

	const expirationDate = searchParams.get('expiration-date')
	if (expirationDate) {
		result = [...result.filter((item) => dayjs(item.expirationDate).isBefore(dayjs(expirationDate).add(1, 'day')))]
	}

	const order = searchParams.get('order-by')
	if (order) {
 		result = result.sort((a, b) => {
			if (a.name > b.name) {
				return order === 'asc' ? 1 : -1
			} 
			if (a.name < b.name) {
				return order === 'asc' ? -1 : 1
			}
			return 0
		})
	}

	return json(result);
};
