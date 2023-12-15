import 'jest';

import { startStream, endStream } from '../streams-management.service';
import { invokeLambda } from '../../../../core/aws/lambda/commands';
import { ErrorResponse } from '../../../../libs/errors';

jest.mock('../../../../core/aws/lambda/commands', () => {
	return {
		invokeLambda: jest.fn(() => Promise.resolve({ StatusCode: 202 } as any)),
	};
});

const invokeLambdaMocked = jest.mocked(invokeLambda);

describe('domains/services/streams-management.service', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('startStream()', () => {
		it('should throw error, when lambda invokation fails', async () => {
			invokeLambdaMocked.mockImplementation(() => Promise.resolve({ StatusCode: 404 }) as any);

			const promise = startStream([]);

			await expect(promise).rejects.toEqual(new ErrorResponse('Something went wrong'));
			expect(invokeLambdaMocked).toHaveBeenCalledTimes(1);
		});

		it('should return, when when lambda invokation succeeds', async () => {
			invokeLambdaMocked.mockImplementation(() => Promise.resolve({ StatusCode: 202 }) as any);

			const result = await startStream([]);

			expect(result).toHaveProperty('streamId');
			expect(invokeLambdaMocked).toHaveBeenCalledTimes(1);
		});
	});

	describe('endStream()', () => {
		it('should throw error, when lambda invokation fails', async () => {
			invokeLambdaMocked.mockImplementation(() => Promise.resolve({ StatusCode: 404 }) as any);

			const streamId = '1';

			const promise = endStream(streamId);

			await expect(promise).rejects.toEqual(new ErrorResponse('Something went wrong'));
			expect(invokeLambdaMocked).toHaveBeenCalledTimes(1);
		});

		it('should return, when when lambda invokation succeeds', async () => {
			invokeLambdaMocked.mockImplementation(() => Promise.resolve({ StatusCode: 202 }) as any);

			const streamId = '1';

			const promise = endStream(streamId);

			await expect(promise).resolves.not.toThrow();
			expect(invokeLambdaMocked).toHaveBeenCalledTimes(1);
		});
	});
});
