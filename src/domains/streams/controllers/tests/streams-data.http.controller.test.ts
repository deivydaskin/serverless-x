import 'jest';

import { APIGatewayProxyEvent } from 'aws-lambda';

import { getTweetController, getTweetsController } from '../streams-data.http.controller';
import { getTweet, getTweets } from '../../services/streams-data.service';

jest.mock('../../services/streams-data.service', () => {
	return {
		getTweet: jest.fn(() => Promise.resolve({})),
		getTweets: jest.fn(() => Promise.resolve([{}])),
	};
});

const getTweetMocked = jest.mocked(getTweet);
const getTweetsMocked = jest.mocked(getTweets);

describe('#domains/controllers/private-api.http.controller', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getTweetController()', () => {
		it('should return statusCode = 200, when service resolves', async () => {
			const event  = {
				pathParameters: {
					id: '123',
				},
			} as unknown as APIGatewayProxyEvent;

			const result = await getTweetController(event);

			expect(result).toEqual({
				statusCode: 200,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ data: {}}),
			});
			expect(getTweetMocked).toHaveBeenCalledTimes(1);
		});

		it('should return statusCode = 500, when service throws error', async () => {
			getTweetMocked.mockImplementation(() => Promise.reject());

			const event  = {
				pathParameters: {
					id: '123',
				},
			} as unknown as APIGatewayProxyEvent;

			const result = await getTweetController(event);

			expect(result).toMatchObject({
				statusCode: 500,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: 'Internal Server Error', detail: '' }),
			});
			expect(getTweetMocked).toHaveBeenCalledTimes(1);
		});
	});

	describe('getTweetsController()', () => {
		it('should return statusCode = 200, when service resolves', async () => {
			const event  = {
				queryStringParameters: {
					countryCode: 'TT',
				},
			} as unknown as APIGatewayProxyEvent;

			const result = await getTweetsController(event);

			expect(result).toEqual({
				statusCode: 200,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ data: [{}] }),
			});
			expect(getTweetsMocked).toHaveBeenCalledTimes(1);
		});

		it('should return statusCode = 400, when queryParams are missing', async () => {
			const event  = {
				queryStringParameters: {},
			} as unknown as APIGatewayProxyEvent;

			const result = await getTweetsController(event);

			expect(result).toMatchObject({
				statusCode: 400,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: 'BadRequest', detail: '' }),
			});
			expect(getTweetsMocked).toHaveBeenCalledTimes(0);
		});

		it('should return statusCode = 500, when service throws error', async () => {
			getTweetsMocked.mockImplementation(() => Promise.reject());

			const event  = {
				queryStringParameters: {
					countryCode: 'TT',
				},
			} as unknown as APIGatewayProxyEvent;

			const result = await getTweetsController(event);

			expect(result).toMatchObject({
				statusCode: 500,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: 'Internal Server Error', detail: '' }),
			});
			expect(getTweetsMocked).toHaveBeenCalledTimes(1);
		});
	});
});
