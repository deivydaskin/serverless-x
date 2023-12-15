import { ErrorResponse } from './ErrorResponse';


export class NotFoundError extends ErrorResponse {
	static HTTP_MESSAGE = 'NotFound';
	static STATUS_CODE = 404;

	constructor(
		public detail: string = '',
	) {
		super(
			detail,
			NotFoundError.HTTP_MESSAGE,
			NotFoundError.STATUS_CODE,
		);
	};
};
