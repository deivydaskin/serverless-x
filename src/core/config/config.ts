import dotenv from 'dotenv';
dotenv.config();

export const config = {
	x: {
		token: process.env.X_TOKEN,
		urlBase: process.env.X_URL_BASE,
	},
	aws: {
		sqs: {
			tweetsQueueUrl: process.env.SQS_TWEETS_QUEUE_URL,
		},
		lambdas: {
			streamerName: process.env.STREAMER_LAMBDA_NAME,
		},
	},
};
