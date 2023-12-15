import 'jest';

import { APIGatewayProxyEvent } from 'aws-lambda';

import { streamInitiationController, streamTerminationController } from '../streams-management.http.controller';
import { startStream, endStream } from '../../services/streams-management.service';

jest.mock('../../services/streams-management.service', () => {
	return {
		startStream: jest.fn(() => Promise.resolve({ streamId: '1' })),
		endStream: jest.fn(() => Promise.resolve({})),
	};
});

const startStreamMocked = jest.mocked(startStream);
const endStreamMocked = jest.mocked(endStream);

describe('#domains/controllers/private-api.http.controller', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('streamInitiationController()', () => {
		it('should return statusCode = 200, when service resolves', async () => {
			const event  = {
				body: JSON.stringify({
					keywords: [],
				}),
			} as unknown as APIGatewayProxyEvent;

			const result = await streamInitiationController(event);

			expect(result).toEqual({
				statusCode: 200,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: 'Stream initialized successfully', data: { streamId: '1' } }),
			});
			expect(startStreamMocked).toHaveBeenCalledTimes(1);
		});

		it('should return statusCode = 500, when service throws error', async () => {
			startStreamMocked.mockImplementation(() => Promise.reject());

			const event  = {
				body: JSON.stringify({
					keywords: [],
				}),
			} as unknown as APIGatewayProxyEvent;

			const result = await streamInitiationController(event);

			expect(result).toMatchObject({
				statusCode: 500,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: 'Internal Server Error', detail: '' }),
			});
			expect(startStreamMocked).toHaveBeenCalledTimes(1);
		});
	});

	describe('streamTerminationController()', () => {
		it('should return statusCode = 204, when service resolves', async () => {
			const event  = {
				body: JSON.stringify({
					streamId: '1',
				}),
			} as unknown as APIGatewayProxyEvent;

			const result = await streamTerminationController(event);

			expect(result).toEqual({
				statusCode: 204,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({}),
			});
			expect(endStreamMocked).toHaveBeenCalledTimes(1);
		});

		it('should return statusCode = 500, when service throws error', async () => {
			endStreamMocked.mockImplementation(() => Promise.reject());

			const event  = {
				body: JSON.stringify({
					streamId: '1',
				}),
			} as unknown as APIGatewayProxyEvent;

			const result = await streamTerminationController(event);

			expect(result).toMatchObject({
				statusCode: 500,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: 'Internal Server Error', detail: '' }),
			});
			expect(endStreamMocked).toHaveBeenCalledTimes(1);
		});
	});
});
