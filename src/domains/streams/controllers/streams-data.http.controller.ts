import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { streamsDataService } from '../services';
import { BadRequestError, ErrorResponse } from '../../../libs/errors';
import { logger } from '../../../core/logger';

export const getTweetController = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		const { id } = event.pathParameters as any;

		const result = await streamsDataService
			.getTweet(id);

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: result }),
		};
	} catch (error) {
		if (!(error instanceof ErrorResponse)) {
			logger.error({ error }, 'Unhandled error returned');

			return new ErrorResponse();
		}

		return error;
	}
};

export const getTweetsController = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		const { countryCode } = event.queryStringParameters as any;

		if (!countryCode) {
			return new BadRequestError();
		}

		const result = await streamsDataService
			.getTweets({ countryCode });

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: result }),
		};
	} catch (error) {
		if (!(error instanceof ErrorResponse)) {
			logger.error({ error }, 'Unhandled error returned');

			return new ErrorResponse();
		}

		return error;
	}
};
