import * as tweetRepo from '../repositories';
import { OMessageDTO, IMessageDAO } from '../repositories/types';

import { NotFoundError } from '../../../libs/errors';

export async function getTweet(id: string): Promise<OMessageDTO> {
	const result = await tweetRepo.getTweet({ id });

	if (!result) {
		throw new NotFoundError('Tweet not found');
	};

	return result;
};

export async function getTweets({ countryCode }: Pick<IMessageDAO, 'countryCode'>): Promise<OMessageDTO[]> {
	const result = await tweetRepo.getTweets({ countryCode });

	if (!result) {
		return [];
	};

	return result;
};
