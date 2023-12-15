import { dynamoCommands } from '../../../core/aws/dynamoDB';

import { OMessageDTO, IMessageDAO } from './types';

const table = 'tweets';

export const getTweet = async (query: Pick<IMessageDAO, 'id'>): Promise<OMessageDTO | null> => {
	const params = {
		id: query.id,
	};

	return await dynamoCommands.getItem<OMessageDTO, Pick<IMessageDAO, 'id'>>(table, params);
};


export const getTweets = async (query: Pick<IMessageDAO, 'countryCode'>): Promise<OMessageDTO[] | null> => {
	const params = {
		countryCode: query.countryCode,
	};

	return await dynamoCommands.scanItems<OMessageDTO, Pick<IMessageDAO, 'countryCode'>>(table, params);
};
