import { PutCommand, PutCommandInput, GetCommand, GetCommandInput, ScanCommand, ScanCommandInput } from '@aws-sdk/lib-dynamodb';

import { logger } from '../../../core/logger';

import { dbClient } from './client';

export const getItem = async <T, U = Partial<T>>(tableName: string, query: U): Promise<T | null> => {
		const params: GetCommandInput = {
			TableName: tableName,
			Key: query as Record<string, string | number | boolean>,
		};

		try {
			logger.info({ params, command: 'GET' }, 'Fetching from DB');

			const result = await dbClient.send(new GetCommand(params)) as any;

			logger.info({ params, command: 'GET' }, 'Fetching from DB done');

			return result.Item as T;
		} catch (error) {
			logger.error({ error, command: 'GET' }, 'Fetching from DB failed');

			throw error;
		};
};

/**
 *
 * Use with caution, generally would be considered a bad practice.
 * Since it scans whole table.
 */
export const scanItems = async <T, U = Partial<T>>(tableName: string, query: U): Promise<T[] | null> => {
	const queryKeyValuePairs = Object.entries(query as Record<string, string | number | boolean>);

	if (queryKeyValuePairs.length < 1) {
		logger.info({ query, command: 'SCAN' }, 'Fetching from DB, empty query');

		return null;
	};

	const filterExpValues = queryKeyValuePairs.map((pair) => `${pair[0]} = :${pair[0]}`);

	const expAttributeValues = queryKeyValuePairs.map((pair) => ({ [`:${pair[0]}`]: pair[1] }));

		const params: ScanCommandInput = {
			TableName: tableName,
			Limit: 100,
			FilterExpression: filterExpValues.join(' AND '),
			ExpressionAttributeValues: Object.assign({}, ...expAttributeValues),
		};

		try {
			logger.info({ params, command: 'SCAN' }, 'Fetching from DB');

			const result = await dbClient.send(new ScanCommand(params)) as any;

			logger.info({ params, result, command: 'SCAN' }, 'Fetching from DB done');

			return result.Items as T[];
		} catch (error) {
			logger.error({ error, command: 'SCAN' }, 'Fetching from DB failed');

			throw error;
		};
};

export const uploadItem = async <T>(tableName: string, data: T): Promise<void> => {
		const params: PutCommandInput = {
			TableName: tableName,
			Item: data as Record<string, any>,
		};

		try {
			logger.info({ params }, 'Uploading to DB');

			await dbClient.send(new PutCommand(params));

			logger.info({ params }, 'Upload to DB done');

			return;
		} catch (error) {
			logger.error({ error }, 'Upload to DB failed');

			throw error;
		};
};
