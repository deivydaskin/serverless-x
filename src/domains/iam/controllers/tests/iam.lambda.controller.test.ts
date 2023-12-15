import 'jest';

import { APIGatewayRequestAuthorizerEvent } from 'aws-lambda';

import { iamController } from '../iam.lambda.controller';
import { authenticateUser } from '../../services/iam.service';

jest.mock('../../services/iam.service', () => {
	return {
		authenticateUser: jest.fn(() => Promise.reject()),
	};
});

const authenticateUserMocked = jest.mocked(authenticateUser);

describe('domains/controllers/iam.lambda.controller', () => {
	describe('iamController()', () => {
		afterEach(() => {
			jest.clearAllMocks();
		});

		it('should return isAuthorizer: false, when auth header is not provided', async () => {
			const event  = {
				headers: {
					authorization: undefined,
				},
			} as unknown as APIGatewayRequestAuthorizerEvent;

			const result = await iamController(event);

			expect(result).toEqual({
				isAuthorized: false,
			});
		});

		it('should return isAuthorizer: false, when service throws error', async () => {
			const event  = {
				headers: {
					authorization: `Basic ${Buffer.from('test:test').toString('base64')}`,
				},
			} as unknown as APIGatewayRequestAuthorizerEvent;

			const result = await iamController(event);

			expect(result).toEqual({
				isAuthorized: false,
			});
			expect(authenticateUserMocked).toHaveBeenCalledTimes(1);
		});

		it('should return isAuthorizer: true, when service resolves', async () => {
			authenticateUserMocked.mockImplementation(() => Promise.resolve() as any);

			const event  = {
				headers: {
					authorization: `Basic ${Buffer.from('test:test').toString('base64')}`,
				},
			} as unknown as APIGatewayRequestAuthorizerEvent;

			const result = await iamController(event);

			expect(result).toEqual({
				isAuthorized: true,
			});
			expect(authenticateUserMocked).toHaveBeenCalledTimes(1);
		});
	});
});
