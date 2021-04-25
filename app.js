const runCliPrompts = require('./prompts/cli-prompts');
const connectToMongo = require('./db/db');

// Block main thread, connect to mongo, then run app
connectToMongo(runCliPrompts);
