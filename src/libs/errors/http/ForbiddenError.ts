import { ErrorResponse } from './ErrorResponse';

export class ForbiddenError extends ErrorResponse {
	static HTTP_MESSAGE = 'Forbidden';
	static STATUS_CODE = 403;

	constructor(
		public detail: string = '',
	) {
		super(
			detail,
			ForbiddenError.HTTP_MESSAGE,
			ForbiddenError.STATUS_CODE,
		);
	};
};
