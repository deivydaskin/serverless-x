import { InvokeCommand, InvocationType, LogType, InvokeCommandOutput } from '@aws-sdk/client-lambda';

import { logger } from '../../../core/logger';

import { lambdaClient } from './client';

export const invokeLambda = async (lambdaName: string, payload?: Record<string, any>): Promise<InvokeCommandOutput> => {
	logger.info({ payload, lambdaName }, 'Invoke lambda, start');

	const command = new InvokeCommand({
		FunctionName: lambdaName,
		Payload: JSON.stringify(payload || {}),
		LogType: LogType.Tail,
		InvocationType: InvocationType.Event,
	});

	const result = await lambdaClient.send(command);

	logger.info(result, 'Invoke lambda, end');

	return result as InvokeCommandOutput;
};
