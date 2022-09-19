import mock, { load } from 'mock-fs'
import { expect, test } from '@oclif/test'
import fs from 'fs-extra'
import { resolve } from 'node:path'
import ComponentTemplate from '../../src/templates/ComponentTemplate'

// ? Deletes the following test folders, if present
function purgeTestFolders() {
    fs.rm('tmp', { recursive: true, force: true }).catch()
    fs.rm('src/components', { recursive: true, force: true }).catch()
}

function mockFolders() {
    mock(
        {
            'package.json': load(resolve(__dirname, '../../package.json')),
            'tsconfig.json': load(resolve(__dirname, '../../tsconfig.json')),
            node_modules: load(resolve(__dirname, '../../node_modules')),
            src: load(resolve(__dirname, '../../src')),
        },
        { createCwd: false },
    )
}

describe('rsx component', () => {
    const TEST_DIR = 'tmp/src'

    before(mockFolders)
    beforeEach(purgeTestFolders)
    afterEach(purgeTestFolders)
    after(mock.restore)

    test.stdout()
        .command(['component'])
        .it('should expect a <ComponentName> argument', ctx => {
            expect(ctx.stdout).to.contain('Missing Argument')
            expect(ctx.stdout).to.not.contain('Created')
        })

    test.stdout()
        .command(['component', '3componentName'])
        .it('should expect <ComponentName> to be a valid variable name', ctx => {
            expect(ctx.stdout).to.contain('Invalid Argument')
            expect(ctx.stdout).to.not.contain('Created componentName')
        })

    test.stdout()
        .command(['component', 'MyComponent'])
        .it(
            "given '<ComponentName>', should create it in 'src/components' by default",
            async ctx => {
                const componentPath = 'src/components/MyComponent'

                const jsFileContent = fs.readFileSync(
                    `${componentPath}/MyComponent.js`,
                    'utf-8',
                )
                const cssFileContent = fs.readFileSync(
                    `${componentPath}/MyComponent.module.css`,
                    'utf-8',
                )
                const tp = new ComponentTemplate('MyComponent')

                expect(ctx.stdout).to.contain(
                    "Created 'MyComponent' at 'src/components/MyComponent'",
                )
                expect(jsFileContent).to.eql(tp.getScriptTemplate())
                expect(cssFileContent).to.eql(tp.getCssTemplate())
            },
        )

    const COMP_PATH = `${TEST_DIR}/components/TestComponent`

    test.stdout()
        .command(['component', 'TestComponent', `--dest=${TEST_DIR}/components`])
        .it('should be able to create a component in a chosen directory', async _ctx => {
            expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.js`)).to.be.true
            expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.module.css`)).to.be.true
        })

    test.stdout()
        .command([
            'component',
            'TestComponent',
            `--dest=${TEST_DIR}/components`,
            '--typescript',
        ])
        .it(
            'should create a typescript component if the `--typescript` flag is set',
            async _ctx => {
                expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.tsx`)).to.be.true
                expect(
                    fs.pathExistsSync(`${COMP_PATH}/TestComponent.js`),
                    'TestComponent.js exists...?',
                ).to.be.false
            },
        )

    describe('--style flag', () => {
        test.stdout()
            .command(['component', 'TestComponent', `--dest=${TEST_DIR}/components`])
            .it(
                'should create a css stylesheet when `--style` is not specified',
                async _ctx => {
                    expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.js`)).to.be.true
                    expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.module.css`)).to
                        .be.true
                    const targetJsFileContent = fs.readFileSync(
                        `${TEST_DIR}/components/TestComponent/TestComponent.js`,
                        'utf-8',
                    )
                    expect(targetJsFileContent).to.contain(
                        "import styles from './TestComponent.module.css'",
                    )
                },
            )

        test.stdout()
            .command([
                'component',
                'TestComponent',
                `--dest=${TEST_DIR}/components`,
                '--style=css',
            ])
            .it('should create a css stylesheet when `--style=css`', async _ctx => {
                expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.js`)).to.be.true
                expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.module.css`)).to.be
                    .true
                const targetJsFileContent = fs.readFileSync(
                    `${TEST_DIR}/components/TestComponent/TestComponent.js`,
                    'utf-8',
                )
                expect(targetJsFileContent).to.contain(
                    "import styles from './TestComponent.module.css'",
                )
            })

        test.stdout()
            .command([
                'component',
                'TestComponent',
                `--dest=${TEST_DIR}/components`,
                '--style=scss',
            ])
            .it('should create a scss stylesheet when `--style=scss`', async _ctx => {
                expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.js`)).to.be.true
                expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.module.scss`)).to.be
                    .true
                const targetJsFileContent = fs.readFileSync(
                    `${TEST_DIR}/components/TestComponent/TestComponent.js`,
                    'utf-8',
                )
                expect(targetJsFileContent).to.contain(
                    "import styles from './TestComponent.module.scss'",
                )
            })

        test.stdout()
            .command([
                'component',
                'TestComponent',
                `--dest=${TEST_DIR}/components`,
                '--style=styled-components',
            ])
            .it(
                'should create a styled component when `--style=styled-components`',
                async _ctx => {
                    expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.js`)).to.be.true
                    expect(
                        fs.pathExistsSync(`${COMP_PATH}/TestComponent.module.scss`),
                        'TestComponent.module.scss exists...?',
                    ).to.be.false
                    expect(
                        fs.pathExistsSync(`${COMP_PATH}/TestComponent.module.css`),
                        'TestComponent.module.css exists...?',
                    ).to.be.false
                    const targetJsFileContent = fs.readFileSync(
                        `${TEST_DIR}/components/TestComponent/TestComponent.js`,
                        'utf-8',
                    )
                    expect(targetJsFileContent).to.contain(
                        "import styled from 'styled-components'",
                    )
                },
            )

        test.stdout()
            .command([
                'component',
                'TestComponent',
                `--dest=${TEST_DIR}/components`,
                '--style=none',
            ])
            .it('should create no stylesheet when `--style=none`', async _ctx => {
                expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.js`)).to.be.true
                expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.module.scss`)).to.be
                    .false
                expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.module.css`)).to.be
                    .false
                const targetJsFileContent = fs.readFileSync(
                    `${TEST_DIR}/components/TestComponent/TestComponent.js`,
                    'utf-8',
                )
                expect(targetJsFileContent).to.not.contain('import styles from')
            })
    })
    test.stdout()
        .command(['component', 'TestComponent', 'AnotherComponent', 'Andanotherone'])
        .it(
            'should be able to create multiple components in the same directory when given multiple arguments',
            async _ctx => {
                const prePath = 'src/components'
                expect(fs.pathExistsSync(`${prePath}/TestComponent/TestComponent.js`)).to
                    .be.true
                expect(
                    fs.pathExistsSync(`${prePath}/AnotherComponent/AnotherComponent.js`),
                ).to.be.true
                expect(fs.pathExistsSync(`${prePath}/Andanotherone/Andanotherone.js`)).to
                    .be.true
            },
        )
})
