import 'jest';

import { authenticateUser } from '../iam.service';
import { getUser } from '../../repositories/iam.repository';
import { ForbiddenError, NotFoundError } from '../../../../libs/errors';

jest.mock('../../repositories/iam.repository', () => {
	return {
		getUser: jest.fn(() => Promise.resolve()),
	};
});

const getUserMocked = jest.mocked(getUser);

describe('domains/services/iam.service', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('authenticateUser()', () => {
		it('should throw error, when user not found', async () => {
			getUserMocked.mockImplementation(() => Promise.resolve(null));

			const promise = authenticateUser({ username: 'testas', password: 'testas' });

			await expect(promise).rejects.toEqual(new NotFoundError('User not found'));
			expect(getUserMocked).toHaveBeenCalledTimes(1);
		});

		it('should throw error, when password does not match', async () => {
			getUserMocked.mockImplementation(() => Promise.resolve({ username: 'testas', password: 'invalid' }) as any);

			const promise = authenticateUser({ username: 'testas', password: 'testas' });

			await expect(promise).rejects.toEqual(new ForbiddenError('Bad username or password'));
			expect(getUserMocked).toHaveBeenCalledTimes(1);
		});

		it('should return user, when password does match', async () => {
			getUserMocked.mockImplementation(() => Promise.resolve({ username: 'testas', password: 'testas' }) as any);

			const result = await authenticateUser({ username: 'testas', password: 'testas' });

			expect(result).toEqual({ username: 'testas', password: 'testas' });
			expect(getUserMocked).toHaveBeenCalledTimes(1);
		});
	});
});
