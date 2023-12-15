import { ErrorResponse } from './ErrorResponse';

export class BadRequestError extends ErrorResponse {
	static HTTP_MESSAGE = 'BadRequest';
	static STATUS_CODE = 400;

	constructor(
		public detail: string = '',
	) {
		super(
			detail,
			BadRequestError.HTTP_MESSAGE,
			BadRequestError.STATUS_CODE,
		);
	};
};
