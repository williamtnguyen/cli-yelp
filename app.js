const runCliPrompts = require('./cli-prompts');
const connectToMongo = require('./db');

// Block main thread, connect to mongo, then run app
connectToMongo(runCliPrompts);
