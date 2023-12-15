import 'jest';

import { handleStream } from '../streams.service';
import { getStreamMock } from '../../externals/x/api';
import { sendMessage } from '../../../../core/aws/sqs/commands';

jest.mock('../../externals/x/api', () => {
	return {
		getStreamMock: jest.fn(() => Promise.resolve()),
	};
});

jest.mock('../../../../core/aws/sqs/commands', () => {
	return {
		sendMessage: jest.fn(() => Promise.resolve()),
	};
});

const getStreamMockMocked = jest.mocked(getStreamMock);
const sendMessageMocked = jest.mocked(sendMessage);

describe('domains/services/streams.service', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('startStream()', () => {
		it('should handle 2nd request, even when first fails', async () => {
			getStreamMockMocked.mockImplementationOnce(() => Promise.reject()).mockImplementation(() => Promise.resolve({ test: 'test'}) as any);
			sendMessageMocked.mockImplementation(() => Promise.resolve() as any);

			await handleStream({ keywords: [], action: 'initiate', streamId: '1' });

			expect(getStreamMockMocked).toHaveBeenCalledTimes(2);
			expect(sendMessageMocked).toHaveBeenCalledTimes(1);
		});

		it('should terminate lambda execution, when action = terminate', async () => {
			getStreamMockMocked.mockImplementationOnce(() => Promise.reject()).mockImplementation(() => Promise.resolve({ test: 'test'}) as any);
			sendMessageMocked.mockImplementation(() => Promise.resolve() as any);

			await handleStream({ keywords: [], action: 'terminate', streamId: '1' });

			expect(getStreamMockMocked).toHaveBeenCalledTimes(0);
			expect(sendMessageMocked).toHaveBeenCalledTimes(0);
		});
	});
});
