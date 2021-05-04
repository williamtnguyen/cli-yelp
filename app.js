const runCliPrompts = require('./prompts/cli-prompts');
const connectToMongo = require('./db/connect-to-mongo');

// Block main thread, connect to mongo, then run app
connectToMongo(runCliPrompts);
