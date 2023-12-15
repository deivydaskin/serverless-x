export type IMessageDAO = {
	id: string;
	countryCode: string;
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
