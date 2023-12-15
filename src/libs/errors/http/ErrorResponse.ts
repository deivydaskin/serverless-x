export class ErrorResponse {
	static MESSAGE = 'Internal Server Error';
	static STATUS_CODE = 500;

	public statusCode;
	public body;
	public headers;

	constructor(
		public detail: string = '',
		protected message: string = ErrorResponse.MESSAGE,
		public status: number = ErrorResponse.STATUS_CODE,
	) {
		const body = JSON.stringify({ message, detail });

		this.statusCode = status;
		this.body = body;
		this.headers = {
		  'Content-Type': 'application/json',
		};
	  }
};
