import { logger } from '../../../core/logger';
import { xApi } from '../externals/x';
import { sqsCommands } from '../../../core/aws/sqs';
import { config } from '../../../core/config';
import { ManualLambdaEvent } from '../types';

const queueUrl = config.aws.sqs.tweetsQueueUrl || '';

export const handleStream = async (payload: ManualLambdaEvent.Streamer) => {
	const { keywords, streamId, action } = payload;

	if (action === 'terminate') {
		logger.info({ streamId }, 'Stream has been terminated');

		return;
	}

	logger.info({ payload }, 'Starting the stream');

	// mocked polling of tweets
	for(let i = 0; i < 2; i++) {
		try {
			let body;
			try {
				body = await xApi.getStreamMock(keywords);
			} catch (error) {
				logger.error({ error, streamId }, 'Cannot establish connection to X');

				continue;
			};

			logger.info({ body, streamId }, 'New Tweet received');

			await sqsCommands.sendMessage(queueUrl, body);
		} catch (error) {
			logger.warn({ error, streamId }, 'Potentially lost a tweet');
		};
	};

	logger.info({ streamId }, 'Stream ended');

	return;
};
