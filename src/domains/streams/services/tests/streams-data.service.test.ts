import 'jest';

import { getTweet, getTweets } from '../streams-data.service';
import { getTweet as getTweetDB, getTweets as getTweetsDB } from '../../repositories/tweets.repository';
import { NotFoundError } from '../../../../libs/errors';

jest.mock('../../repositories/tweets.repository', () => {
	return {
		getTweet: jest.fn(() => Promise.resolve()),
		getTweets: jest.fn(() => Promise.resolve()),
	};
});

const getTweetDBMocked = jest.mocked(getTweetDB);
const getTweetsDBMocked = jest.mocked(getTweetsDB);

describe('domains/services/streams-data.service', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getTweet()', () => {
		it('should throw error, when DB repo returns null', async () => {
			getTweetDBMocked.mockImplementation(() => Promise.resolve(null));

			const promise = getTweet('123');

			await expect(promise).rejects.toEqual(new NotFoundError('Tweet not found'));
			expect(getTweetDBMocked).toHaveBeenCalledTimes(1);
		});

		it('should return result, on success', async () => {
			getTweetDBMocked.mockImplementation(() => Promise.resolve({ id: '123', text: 'test' } as any));

			const result = await getTweet('123');

			expect(result).toEqual({ id: '123', text: 'test' });
			expect(getTweetDBMocked).toHaveBeenCalledTimes(1);
		});
	});

	describe('getTweets()', () => {
		it('should return [], when DB repo returns null', async () => {
			getTweetsDBMocked.mockImplementation(() => Promise.resolve(null));

			const result = await getTweets({ countryCode: 'LT' });

			expect(result).toEqual([]);
			expect(getTweetsDBMocked).toHaveBeenCalledTimes(1);
		});

		it('should return result, on success', async () => {
			getTweetsDBMocked.mockImplementation(() => Promise.resolve([{ id: '123', text: 'test' }, { id: '1234', text: 'test1' }] as any));

			const result = await getTweets({ countryCode: 'LT' });

			expect(result).toEqual([{ id: '123', text: 'test' }, { id: '1234', text: 'test1' }]);
			expect(getTweetsDBMocked).toHaveBeenCalledTimes(1);
		});
	});
});
