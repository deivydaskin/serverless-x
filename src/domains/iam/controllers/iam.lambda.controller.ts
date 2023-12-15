import { APIGatewayRequestAuthorizerEvent, APIGatewaySimpleAuthorizerResult } from 'aws-lambda';

import { logger } from '../../../core/logger';

import { iamService } from '../services';

export const iamController = async (event: APIGatewayRequestAuthorizerEvent): Promise<APIGatewaySimpleAuthorizerResult> => {
	logger.info({ headers: event.headers }, 'Auth request');

	const basicAuth = event.headers?.authorization;

	if (!basicAuth) {
		return {
			isAuthorized: false,
		};
	};

	const [, base64Credentials] = basicAuth.split(' ');
	const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
	const [username, password] = credentials.split(':');

	try {
		await iamService.authenticateUser({ username, password });
	} catch (error) {
		logger.error({ error }, 'Error during authorization');

		return {
			isAuthorized: false,
		};
	}

	return {
		isAuthorized: true,
	};
};
