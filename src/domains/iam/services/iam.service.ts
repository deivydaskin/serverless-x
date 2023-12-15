import { logger } from '../../../core/logger';
import { ForbiddenError, NotFoundError } from '../../../libs/errors';
import * as usersRepo from '../repositories';
import { UserDTO } from '../types';

export async function authenticateUser({ username, password }: { username: string, password: string }): Promise<UserDTO> {
	logger.info({ username }, 'Authenticating user');

	const result = await usersRepo.getUser({ username });

	if (!result) {
		logger.warn({ username }, 'User not found');

		throw new NotFoundError('User not found');
	};

	if (result.username !== username || result.password !== password) {
		logger.warn({ username }, 'Incorrect username or password');

		throw new ForbiddenError('Bad username or password');
	}

	logger.info({ username }, 'User authenticated successfully');

	return result;
};
