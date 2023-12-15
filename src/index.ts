import { streamsController } from './domains/streams/controllers';
import { dataProcessorController } from './domains/data-processor/controllers';
import { streamInitiationController, streamTerminationController } from './domains/streams/controllers';
import { getTweetController, getTweetsController } from './domains/streams/controllers';
import { iamController } from './domains/iam/controllers';

export const iamHandler = iamController;
export const streamInitiationHandler = streamInitiationController;
export const streamTerminationHandler = streamTerminationController;
export const getTweetHandler = getTweetController;
export const getTweetsHandler = getTweetsController;
export const streamsHandler = streamsController;
export const dataProcessorHandler = dataProcessorController;
