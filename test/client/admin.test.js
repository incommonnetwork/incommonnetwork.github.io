/* global location */
const puppeteer = require('puppeteer');
const env = require('../setup.env')(6032);
const { getPage, getPathname } = env;


describe('/admin', () => {
    beforeAll(async () => {
        this.browser = await puppeteer.launch({});
        await env.before();
    });

    afterAll(async () => {
        await env.after();
        await this.browser.close();
    });

    beforeEach(async () => {
        this.context = await this.browser.createIncognitoBrowserContext();
        this.app = await env.initApi();
        this.page = await this.context.newPage();
        await this.page.goto(getPage('/admin'));
    });

    afterEach(async () => {
        await this.page.close();
        await this.context.close();
        this.app = null;
    });

    it('loads', async () => {
        expect.assertions(1);
        const content = await this.page.content();
        expect(content.indexOf('<!DOCTYPE html')).toBe(0);
    });

    it('redirects to sign in', async () => {
        await this.page.waitFor((pathname) => pathname === location.pathname, { timeout: 60000 }, getPathname('/sign_in'));
    });

    it('redirects to home if not admin', async () => {

        await this.page.waitFor((pathname) => pathname === location.pathname, { timeout: 60000 }, getPathname('/sign_in'));
        const form = await this.page.$('#sign_in_form');
        const rand = `${Math.random()}`;
        const good_input = {
            email: `${rand}@test.com`,
            password: rand,
            confirm_password: rand,
        };

        await this.app.service('users').create(good_input);

        await this.page.type('#root_email', good_input.email);
        await this.page.type('#root_password', good_input.password);

        const submit_button = await form.$('button.is-primary');
        await submit_button.click();

        await this.page.waitFor((pathname) => pathname === location.pathname, { timeout: 5000 }, getPathname('/home'));
    });

    describe('tabs', () => {
        beforeEach(async () => {
            await this.page.waitFor((pathname) => pathname === location.pathname, { timeout: 5000 }, getPathname('/sign_in'));
            const form = await this.page.$('#sign_in_form');
            const good_input = {
                email: 'admin@mock.admin',
                password: 'admin123',
            };

            await this.page.type('#root_email', good_input.email);
            await this.page.type('#root_password', good_input.password);

            const submit_button = await form.$('button.is-primary');
            await submit_button.click();

            await this.page.waitFor((pathname) => pathname === location.pathname, { timeout: 5000 }, getPathname('/admin'));
        });

        it('has tabs', async () => {
            await this.page.waitFor('#admin_tabs', {});
        });

        describe('users', async () => {
            beforeEach(async () => {
                const tab = await this.page.waitFor('#users_tab');
                await tab.click();
            });

            it('has tab', async () => {
                await this.page.waitFor('#users_tab', {});
            });

            it('has tab content', async () => {
                await this.page.waitFor('#users_tab_content', {});
            });

            it('has table', async () => {
                await this.page.waitFor('#users_table');
            });

            it('has filter dropdown', async () => {
                await this.page.waitFor('#users_filter_dropdown');
            });

            it('can filter based on id', async () => {
                expect.assertions(1);
                const dropdown = await this.page.waitFor('#users_filter_dropdown');
                await dropdown.click();
                const id_selector = await this.page.waitFor('#users_id_selector');
                await id_selector.click();
                await this.page.type('#users_filter', '1');
                const submit_button = await this.page.waitFor('#users_filter_submit');
                await submit_button.click();
                await this.page.waitFor('#users_table_body');
                const total = await this.page.$eval('#users_table_body', (node) => node.getAttribute('total'));

                expect(total).toBe('1');
            });



        });
    });

});