type IData = {
	id: string;
	text: string;
	public_metrics: {
		retweet_count: number;
		reply_count: number;
		like_count: number;
		quote_count: number;
	}
}

export type IDataDTO = {
	data: IData[];
	includes: {
		places: {
			country_code: string;
		}[];
	};
};
