import { SendMessageCommand } from '@aws-sdk/client-sqs';

import { logger } from '../../../core/logger';

import { clientSQS } from './client';


export const sendMessage = async (queueUrl: string, body: Record<string, any>, delay: number = 0) => {
	logger.info({ body, queueUrl, delay }, 'SQS Message send, start');

	const command = new SendMessageCommand({
		QueueUrl: queueUrl,
		DelaySeconds: delay,
		MessageBody: JSON.stringify(body),
	});

	const response = await clientSQS.send(command);

	logger.info(response, 'SQS Message send, end');

	return response;
};
