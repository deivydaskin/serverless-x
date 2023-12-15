import { v4 as uuidv4 } from 'uuid';

import { logger } from '../../../core/logger';
import { config } from '../../../core/config';
import { lambdaCommands } from '../../../core/aws/lambda';

import { ErrorResponse } from '../../../libs/errors';

const lambdaName = config.aws.lambdas.streamerName || '';

export async function startStream(
	keywords: string[],
): Promise<{ streamId: string }> {
	logger.info('Signal to start the stream');

	const streamId = uuidv4();

	const result = await lambdaCommands.invokeLambda(lambdaName, { keywords, streamId, action: 'initiate' });

	if (result.StatusCode !== 202) {
		logger.error({ result }, 'Signal not sent');

		throw new ErrorResponse('Something went wrong');
	};

	logger.info({ result }, 'Signal sent successfully');

	return { streamId };
};

export async function endStream(streamId: string): Promise<void> {
	logger.info('Signal to end the stream');

	const result = await lambdaCommands.invokeLambda(lambdaName, { streamId, action: 'terminate' });

	if (result.StatusCode !== 202) {
		logger.error({ result }, 'Signal not sent');

		throw new ErrorResponse('Something went wrong');
	};

	logger.info({ result }, 'Signal sent successfully');

	return;
};
