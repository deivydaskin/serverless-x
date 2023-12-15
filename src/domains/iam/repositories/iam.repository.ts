import { dynamoCommands } from '../../../core/aws/dynamoDB';

import { IUserDAO, UserDTO } from '../types';

const table = 'users';

export const getUser = async (query: IUserDAO): Promise<UserDTO | null> => {
	const params = {
		username: query.username,
	};

	return await dynamoCommands.getItem<UserDTO, IUserDAO>(table, params);
};
