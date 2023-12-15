export type Rules = {
	value: string;
	tag: string;
}[];

type IStream = {
	id: string;
	text: string;
	public_metrics: {
		retweet_count: number;
		reply_count: number;
		like_count: number;
		quote_count: number;
	}
}

export type StreamResponse = {
	data: IStream[];
	includes: {
		places: {
			country_code: string;
		}[];
	};
};
