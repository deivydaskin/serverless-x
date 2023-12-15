import { logger } from '../../../core/logger';
import { cloudwatchCommands } from '../../../core/aws/cloudwatch';

import { IDataDTO } from '../types';
import * as tweetRepo from '../repositories';

export const processMessage = async (payload: IDataDTO) => {
	logger.info({ payload }, 'Message received, processing');

	const data = payload.data.map((tweet) => ({
		id: tweet.id,
		text: tweet.text,
		countryCode: payload.includes?.places?.[0]?.country_code || 'N/A',
		metrics: {
			retweets: tweet.public_metrics.retweet_count,
			replies: tweet.public_metrics.reply_count,
			likes: tweet.public_metrics.like_count,
			quotes: tweet.public_metrics.quote_count,
		},
	}));

	for (const record of data) {
		await tweetRepo.uploadTweet(record);

		const metrics = Object.entries(record.metrics).map((metric) => ({ name: `${metric[0]}Count`, value: metric[1], unit: 'Count'})) as cloudwatchCommands.IMetricDTO;

		await cloudwatchCommands.sendMetric(metrics);
	};

	await cloudwatchCommands.sendMetric([{ name: 'tweetsCount', value: data.length, unit: 'Count' }]);

	logger.info('Message processing ended');

	return;
};
