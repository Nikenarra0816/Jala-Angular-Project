import { lightenColor } from '@shared/function/colorFunction';

export function sortArrayChart( val: Bucket[] ) {
	return val.sort( ( a, b ) => b.value - a.value );
}

export function mutateArrayChart( val: Bucket[] ): Result {
	const label = val.map( value => {
		return { alias: value.alias, key: value.key };
	} );
	const data: ResultData[] = val
		.reduce( ( acc, cur ) => {
			cur.buckets.forEach( value1 => {
				const index = acc.findIndex( value => value.label.key === value1.key );
				if ( index === -1 ) {
					const obj = {
						label: { alias: value1.alias, key: value1.key },
						data: Array.from( Array( label.length ), () => 0 ),
						color: value1.color,
					};
					acc.push( obj );
				}
				return;
			} );
			return acc;
		}, [] )
		.sort( ( a, b ) => a.label.key - b.label.key );

	val.forEach( value => {
		const indexPunyaSiapa = label.findIndex(
			value2 => value2.key === value.key
		);
		value.buckets.forEach( value1 => {
			const index = data.findIndex( value2 => value2.label.key === value1.key );
			data[index].data[indexPunyaSiapa] = value1.value;
		} );
	} );

	return { label, data };
}

export function finalResultChart( val: Result ) {
	return {
		label: val.label.map( value => value.alias ),
		data: val.data.reduce( ( acc, cur ) => {
			const x = {
				label: cur.label.alias,
				backgroundColor: cur.color,
				borderColor: cur.color,
				hoverBackgroundColor: lightenColor( cur.color, 0.7 ),
				hoverBorderColor: cur.color,
				data: cur.data
			};
			acc.push( x );
			return acc;
		}, [] )
	};
}


export interface Bucket {
	key: number;
	value: number;
	alias: string;
	color: string;
	buckets?: ( BucketsEntity )[] | null;
}

export interface BucketsEntity {
	key: number;
	value: number;
	alias: string;
	color: string;
}

export interface Result {
	label: { alias: string; key: number }[];
	data: ResultData[];
}

export interface ResultData {
	label: { alias: string; key: number };
	color: string;
	data: number[];
}

export interface FinalResult {
	label: string[];
	data: {
		label: string;
		data: number[];
	}[];
}

