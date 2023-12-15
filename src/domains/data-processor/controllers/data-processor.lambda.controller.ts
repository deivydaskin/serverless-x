import { SQSEvent } from 'aws-lambda';

import { logger } from '../../../core/logger';
import { IDataDTO } from '../types';

import { dataProcessorService } from '../services';

export const dataProcessorController = async (event: SQSEvent) => {
		logger.info(event, 'Worker controller invoked');

		for (const record of event.Records) {
				const payload = JSON.parse(record.body) as IDataDTO;

				await dataProcessorService.processMessage(payload);
			};

		return;
};
