export type IMessageDTO = {
	id: string;
	text: string;
	countryCode: string;
	metrics: {
		retweets: number;
		replies: number;
		likes: number;
		quotes: number;
	};
};

export type OMessageDTO = {
	id: string;
	tweetId: string;
	text: string;
	countryCode: string;
	metrics: {
		retweets: number;
		replies: number;
		likes: number;
		quotes: number;
	};
};
