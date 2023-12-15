import { PutMetricDataCommand } from '@aws-sdk/client-cloudwatch';

import { logger } from '../../../core/logger';

import { cloudwatchClient } from './client';

export type IMetricDTO = {
	name: string;
	value: number;
	unit:
		| 'Seconds'
		| 'Microseconds'
		| 'Milliseconds'
		| 'Bytes'
		| 'Kilobytes'
		| 'Megabytes'
		| 'Gigabytes'
		| 'Terabytes'
		| 'Bits'
		| 'Kilobits'
		| 'Megabits'
		| 'Gigabits'
		| 'Terabits'
		| 'Percent'
		| 'Count'
		| 'Bytes/Second'
		| 'Kilobytes/Second'
		| 'Megabytes/Second'
		| 'Gigabytes/Second'
		| 'Terabytes/Second'
		| 'Bits/Second'
		| 'Kilobits/Second'
		| 'Megabits/Second'
		| 'Gigabits/Second'
		| 'Terabits/Second'
		| 'Count/Second'
		| 'None';
}[];

export const namespace = 'CarverticalHW';

export const sendMetric = async (metrics: IMetricDTO) => {
	logger.info({ namespace, metrics }, 'CloudWatch metric send, start');

	const command = new PutMetricDataCommand({
		Namespace: namespace,
		MetricData: metrics.map((metric) => ({
			MetricName: metric.name,
			Value: metric.value,
			Unit: metric.unit,
		})),
	});

	const response = await cloudwatchClient.send(command);

	logger.info(response, 'CloudWatch metric send, end');

	return response;
};
