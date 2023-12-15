import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { logger } from '../../../core/logger';
import { streamsManagementService } from '../services';
import { BadRequestError, ErrorResponse } from '../../../libs/errors';

export const streamInitiationController = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		const keywords = JSON.parse(event.body || '')?.keywords as any;

		const result = await streamsManagementService
			.startStream(keywords);

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: 'Stream initialized successfully', data: result }),
		};
	} catch (error) {
		if (!(error instanceof ErrorResponse)) {
			logger.error({ error }, 'Unhandled error returned');

			return new ErrorResponse();
		}

		return error;
	}
};

export const streamTerminationController = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		const streamId = JSON.parse(event.body || '')?.streamId as any;

		if (!streamId) {
			return new BadRequestError('streamId missing');
		};

		await streamsManagementService
		.endStream(streamId);

		return {
			statusCode: 204,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		};
	} catch (error) {
		if (!(error instanceof ErrorResponse)) {
			logger.error({ error }, 'Unhandled error returned');

			return new ErrorResponse();
		}

		return error;
	}
};
