import needle from 'needle';

import { logger } from '../../../../core/logger';
import { config } from '../../../../core/config';
import { Rules, StreamResponse } from './types';

export async function getStreamMock(keywords: string[]): Promise<StreamResponse> {
	const filters: Rules = keywords.map((word) => ({ value: word, tag: word }));

	const url = `${config.x.urlBase}/2/tweets/search/stream?tweet.fields=public_metrics&place.fields=country_code`;

	logger.info({ keywords, filters, url, method: 'GET' }, 'X Request');

	const { body: response } = await needle('get', url, {
		headers: {
			'User-Agent': 'CarverticalHW',
			'x-api-key': config.x.token,
		},
	});

	logger.info({ response }, 'X Response');

	return response;
};
