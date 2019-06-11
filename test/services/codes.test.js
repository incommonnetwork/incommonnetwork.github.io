
const env = require('../setup.env.js')(4531);

describe('\'codes\' service', () => {
    beforeAll(env.before);
    afterAll(env.after);

    beforeEach(async () => {
        this.api = env.initApi();
        this.code = `${Math.floor(Math.random() * 1000000000)}`;
    });

    describe('unauthenticated', async () => {
        beforeEach(async () => {
            this.service = this.api.service('codes');
        });

        it('throws on get', async () => {
            expect.assertions(1);

            await this.service.get(1).catch(e => {
                expect(e.code).toBe(401);
            });
        });

        it('throws on find', async () => {
            expect.assertions(1);

            await this.service.find({}).catch(e => {
                expect(e.code).toBe(401);
            });
        });

        it('throws on create', async () => {
            expect.assertions(1);

            await this.service.create({
                text: this.code
            }).catch(e => {
                expect(e.code).toBe(401);
            });
        });

        it('throws on patch', async () => {
            expect.assertions(1);

            await this.service.patch(1, {
                text: this.code
            }).catch(e => {
                expect(e.code).toBe(401);
            });
        });


        it('throws on update', async () => {
            expect.assertions(1);

            await this.service.update(1, {
                text: this.code
            }).catch(e => {
                expect(e.code).toBe(401);
            });
        });

        it('throws on remove', async () => {
            expect.assertions(1);

            await this.service.remove(1).catch(e => {
                expect(e.code).toBe(401);
            });
        });
    });
});