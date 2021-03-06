/* global jest*/
const url = require('url');
const fetch = require('node-fetch');
const feathers = require('@feathersjs/feathers');
const auth = require('@feathersjs/authentication-client');
const rest = require('@feathersjs/rest-client');

jest.setTimeout(40000);

const initApi = (url) => {
    const app = feathers();
    const restClient = rest(url);
    app.configure(restClient.fetch(fetch));
    app.configure(auth({}));

    return app;
};

const testDev = () => {
    const api_url = 'http://localhost:3030';
    const before = (done) => {
        // fighting race condition with hot-reload builds
        setTimeout(done, 5000);
    };// (done) => { setTimeout(done, 1000); };
    const after = () => { };//(done) => { setTimeout(done, 1000); };

    const getPathname = pathname => pathname;

    const getApi = pathname => url.format({
        hostname: 'localhost',
        protocol: 'http',
        port: 3030,
        pathname
    });

    const getPage = getApi;
    return { getPathname, getPage, getApi, before, after, initApi: () => initApi(api_url) };
};

const testStaging = () => {
    const api_url = 'https://staging.incommon.dev';

    const before = () => {
    };
    const after = () => { };

    const getPathname = pathname => `/staging${pathname === '/' ? pathname : `${pathname}/`}`;

    const getPage = pathname => url.format({
        hostname: 'www.incommon.dev',
        protocol: 'https',
        pathname: getPathname(pathname)
    });

    const getApi = pathname => url.format({
        hostname: 'staging.incommon.dev',
        protocol: 'https',
        pathname,
    });

    return { getPathname, getPage, getApi, before, after, initApi: () => initApi(api_url) };
};

const testCI = () => {
    const api_url = 'http://localhost:3030';


    const getPathname = pathname => pathname;

    const getApi = pathname => url.format({
        hostname: 'localhost',
        protocol: 'http',
        port: 3030,
        pathname
    });

    const getPage = getApi;


    const before = async () => {

    };

    const after = async () => {

    };


    return { getPathname, getPage, getApi, before, after, initApi: () => initApi(api_url) };
};



module.exports = (port) => {
    let env = null;
    switch (process.env.TEST_ENV) {
        case 'dev':
            env = testDev(port);
            break;
        case 'ci':
            env = testCI(port);
            break;
        case 'staging':
            env = testStaging(port);
            break;
        default:
            env = testCI(port);
    }
    return env;
};

if (require.main === module) {
    (async function () {
        const env = testCI(3030);
        await env.before();
    })();//.catch(e => {console.error(e);});
}