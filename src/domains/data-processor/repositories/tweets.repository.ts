import { v4 as uuidv4 } from 'uuid';

import { dynamoCommands } from '../../../core/aws/dynamoDB';

import { IMessageDTO, OMessageDTO } from './types';

const table = 'tweets';

export const uploadTweet = async (payload: IMessageDTO): Promise<void> => {
	const data = {
		id: uuidv4(),
		tweetId: payload.id,
		text: payload.text,
		countryCode: payload.countryCode,
		metrics: {
			retweets: payload.metrics.retweets,
			replies: payload.metrics.replies,
			likes: payload.metrics.likes,
			quotes: payload.metrics.quotes,
		},
	};

	await dynamoCommands.uploadItem<OMessageDTO>(table, data);
};
