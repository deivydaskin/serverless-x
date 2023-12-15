export namespace ManualLambdaEvent {
	export type Streamer = {
		keywords: string[];
		streamId: string,
		action: 'initiate' | 'terminate',
	};
};
