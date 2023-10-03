export interface Item {
	name: string;
	category: 'Fruit' | 'Candy' | 'Dairy';
}

export const items: Item[] = [
	{
		name: 'Pineapple',
		category: 'Fruit'
	},
	{
		name: 'Chocolate Bar',
		category: 'Candy'
	},
	{
		name: 'Apple',
		category: 'Fruit'
	},
	{
		name: 'Gummy Bears',
		category: 'Candy'
	},
	{
		name: 'Milk',
		category: 'Dairy'
	},
	{
		name: 'Banana',
		category: 'Fruit'
	},
	{
		name: 'Cheese',
		category: 'Dairy'
	},
	{
		name: 'Lollipop',
		category: 'Candy'
	},
	{
		name: 'Orange',
		category: 'Fruit'
	},
	{
		name: 'Yogurt',
		category: 'Dairy'
	}
];
