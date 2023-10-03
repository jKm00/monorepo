import { writable } from 'svelte/store';

export interface Company {
	id: number;
	name: string;
	slogan: string;
	gradient: {
		from: string;
		to: string;
	};
	pinned: boolean;
	warehouses: {
		name: string;
	}[];
}

const initCompanies: Company[] = [
	{
		id: 0,
		name: 'ASKO',
		slogan: 'Vi forsyner Norge med mat',
		gradient: {
			from: 'rgba(136,0,56,1)',
			to: 'rgba(136,0,102,1)'
		},
		pinned: true,
		warehouses: [
			{
				name: 'Vestby'
			},
			{
				name: 'Trondheim'
			}
		]
	},
	{
		id: 1,
		name: 'Rema 1000',
		slogan: 'Det enkle er ofte det beste',
		gradient: {
			from: 'rgba(0,81,153,1)',
			to: 'rgba(0, 154, 153)'
		},
		pinned: false,
		warehouses: [
			{
				name: 'Østland'
			},
			{
				name: 'Nordland'
			},
			{
				name: 'Bergen'
			},
			{
				name: 'Midtland'
			}
		]
	}
];

const createCompanies = () => {
	const { subscribe, update } = writable<Company[]>(initCompanies);

	const togglePinned = (id: number) => {
		update((value) => {
			const index = value.findIndex((c) => c.id === id);

			if (index === -1) return value;

			value[index].pinned = !value[index].pinned;

			return value;
		});
	};

	return {
		subscribe,
		togglePinned
	};
};

export const companies = createCompanies();
