import { logger } from '../../../core/logger';
import { ManualLambdaEvent } from '../types';

import { streamsService } from '../services';


export const streamsController = async (event: ManualLambdaEvent.Streamer) => {
	logger.info(event, 'Streams controller invoked');

	const { keywords, streamId, action } = event;

	const filters: string[] = Array.isArray(keywords) && keywords.length > 0 ? keywords : [];

	await streamsService.handleStream({ keywords: filters, streamId, action });
};
