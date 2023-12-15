import 'jest';

import { processMessage } from '../data-processor.service';
import { uploadTweet } from '../../repositories/tweets.repository';
import { sendMetric } from '../../../../core/aws/cloudwatch/commands';

jest.mock('../../repositories/tweets.repository', () => {
	return {
		uploadTweet: jest.fn(() => Promise.resolve()),
	};
});

jest.mock('../../../../core/aws/cloudwatch/commands', () => {
	return {
		sendMetric: jest.fn(() => Promise.resolve()),
	};
});

const uploadTweetMocked = jest.mocked(uploadTweet);
const sendMetricMocked = jest.mocked(sendMetric);

describe('domains/services/data-processor.service', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('processMessage()', () => {
		it('should remap paylaod and send metrics', async () => {
			uploadTweetMocked.mockImplementation(() => Promise.resolve());
			sendMetricMocked.mockImplementation(() => Promise.resolve() as any);

			const payload = {
				data: [{
					id: '1',
					text: 'text',
					public_metrics: {
						retweet_count: 11,
						reply_count: 12,
						like_count: 13,
						quote_count: 14,
					},
				}],
				includes: {
					places: [{
						country_code: 'LT',
					}],
				},
			};

			await processMessage(payload);

			expect(uploadTweetMocked).toHaveBeenCalledTimes(1);
			expect(sendMetricMocked).toHaveBeenCalledTimes(2);
			expect(uploadTweetMocked.mock.calls[0][0]).toEqual({
				id: '1',
				text: 'text',
				countryCode: 'LT',
				metrics: {
					retweets: 11,
					replies: 12,
					likes: 13,
					quotes: 14,
				},
			});
			expect(sendMetricMocked.mock.calls[0][0]).toEqual([
				{
					name: 'retweetsCount',
					value: 11,
					unit: 'Count',
				},
				{
					name: 'repliesCount',
					value: 12,
					unit: 'Count',
				},
				{
					name: 'likesCount',
					value: 13,
					unit: 'Count',
				},
				{
					name: 'quotesCount',
					value: 14,
					unit: 'Count',
				},
			]);
			expect(sendMetricMocked.mock.calls[1][0]).toEqual([
				{
					name: 'tweetsCount',
					value: 1,
					unit: 'Count',
				},
			]);
		});
	});
});
