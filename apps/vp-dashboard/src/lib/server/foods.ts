import dayjs from 'dayjs'

export interface Item {
	name: string;
	category: 'Fruit' | 'Candy' | 'Dairy';
	expirationDate: Date
}

export const items: Item[] = [
	{
		name: 'Pineapple',
		category: 'Fruit',
		expirationDate: dayjs().add(1, 'day').toDate(),
	},
	{
		name: 'Chocolate Bar',
		category: 'Candy',
		expirationDate: dayjs().add(5, 'day').toDate()
	},
	{
		name: 'Apple',
		category: 'Fruit',
		expirationDate: dayjs().add(8, 'day').toDate()
	},
	{
		name: 'Gummy Bears',
		category: 'Candy',
		expirationDate: dayjs().add(2, 'day').toDate()
	},
	{
		name: 'Milk',
		category: 'Dairy',
		expirationDate: dayjs().add(10, 'day').toDate()
	},
	{
		name: 'Banana',
		category: 'Fruit',
		expirationDate: dayjs().add(3, 'day').toDate()
	},
	{
		name: 'Cheese',
		category: 'Dairy',
		expirationDate: dayjs().add(2, 'day').toDate()
	},
	{
		name: 'Lollipop',
		category: 'Candy',
		expirationDate: dayjs().add(4, 'day').toDate()
	},
	{
		name: 'Orange',
		category: 'Fruit',
		expirationDate: dayjs().add(4, 'day').toDate()
	},
	{
		name: 'Yogurt',
		category: 'Dairy',
		expirationDate: dayjs().add(8, 'day').toDate()
	}
];
