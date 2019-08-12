const feathers = require( '@feathersjs/feathers');
const auth = require( '@feathersjs/authentication-client');
const rest = require( '@feathersjs/rest-client');

async function init() {
    const app = feathers();
    const _fetch = require('node-fetch'); // eslint-disable-line no-undef
    const api = `https://api.incommon.dev`
    const restClient = rest(api);
    app.configure(restClient.fetch(_fetch));
    const authConfig = {}; // eslint-disable-line no-undef
    app.configure(auth(authConfig));
    await app.authenticate({strategy: 'local', email: 'ryan@incommon.dev', password: process.env.RYAN_INCOMMON_ROOT})

    return app;
}

export default async (req) => {
    if (!app) {
        app = await init(req);
    }

    return app;
};