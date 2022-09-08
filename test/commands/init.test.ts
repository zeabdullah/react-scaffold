import {expect, test} from '@oclif/test'

describe('rsx init', () => {
    test.stdout()
        .skip()
        .command(['init'])
        .it(
            'should start the init prompt, which asks to fill the config file (.rsxrc)',
            ctx => {
                // expect(ctx.stdout).to.contain('Choose a default path')
                expect.fail('I think this is not testable...')
            },
        )

    test.stdout()
        .skip()
        .command(['init', '-y'])
        .it("should create .rsxrc if it doesn't exist (.rsxrc)", _ => {
            expect.fail('I think this is not testable...')
        })

    test.stdout()
        .skip()
        .command(['init'])
        .it('should warn if the config file already exists', ctx => {
            // expect(ctx.stdout).to.contain('config file already exists')
            expect.fail('I think this is not testable...')
        })

    test.skip()
        .stdout()
        .command(['init', '-y'])
        .it(
            'should initialize .rsxrc to the defaults if the `-y` flag is passed',
            ctx => {
                //
            },
        )
})
