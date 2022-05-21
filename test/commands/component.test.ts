import {expect, test} from '@oclif/test'
import * as fs from 'fs-extra'

describe('react-scaffold component', () => {
  const TEST_DIR = 'tmp/src'

  beforeEach(() => {
    // ? Deletes the following test folders, if present
    fs.remove('tmp').catch()
    fs.remove('src/components').catch()
  })
  afterEach(() => {
    fs.remove('tmp').catch()
    fs.remove('src/components').catch()
  })

  test
  .stdout()
  .command(['component'])
  .it('should expect a <ComponentName> argument', ctx => {
    expect(ctx.stdout).to.contain('Missing Argument: <ComponentName>')
    expect(ctx.stdout).to.not.contain('✅ Created')
  })

  test
  .stdout()
  .command(['component', 'componentName'])
  .it('should expect <ComponentName> argument to be PascalCase', ctx => {
    expect(ctx.stdout).to.contain('Invalid Argument: componentName must be in PascalCase')
    expect(ctx.stdout).to.not.contain('✅ Created')
  })

  test
  .stdout()
  .command(['component', 'MyComponent'])
  .it('should create a component named MyComponent in src/components by default', async ctx => {
    const componentPath = 'src/components/MyComponent'

    const jsFileContent = await fs.readFile(`${componentPath}/MyComponent.js`, 'utf-8')
    const expectedJsFileContent = `import React from 'react';
import styles from './MyComponent.module.css';

function MyComponent() {
  return <div className={styles.MyComponent}>MyComponent</div>
}

export default MyComponent;
`

    const cssFileContent = await fs.readFile(`${componentPath}/MyComponent.module.css`, 'utf-8')
    const expectedCssFileContent = '.MyComponent {}'

    expect(ctx.stdout).to.contain('✅ Created MyComponent at src/components/MyComponent')
    expect(ctx.stdout).to.not.contain('Will create a typescript component')
    expect(jsFileContent).to.eql(expectedJsFileContent)
    expect(cssFileContent).to.eql(expectedCssFileContent)
  })

  test
  .stdout()
  .command(['component', 'TestComponent', '--dest', `${TEST_DIR}/components`])
  .it('should create a component named TestComponent in a given directory', async _ctx => {
    const parentFolder = await fs.pathExists(TEST_DIR)
    const targetJsFile = await fs.pathExists(`${TEST_DIR}/components/TestComponent/TestComponent.js`)
    const targetCssFile = await fs.pathExists(`${TEST_DIR}/components/TestComponent/TestComponent.module.css`)

    expect(parentFolder).to.be.true
    expect(targetJsFile).to.be.true
    expect(targetCssFile).to.be.true
  })

  test
  .stdout()
  .command(['component', 'TestComponent', '--dest', `${TEST_DIR}/components`, '--typescript'])
  .it('should create a typescript component when the `--typescript` flag is set', async _ctx => {
    const parentFolder = await fs.pathExists(TEST_DIR)
    const targetTsFile = await fs.pathExists(`${TEST_DIR}/components/TestComponent/TestComponent.tsx`)

    expect(parentFolder).to.be.true
    expect(targetTsFile).to.be.true

    const targetJsFile = await fs.pathExists(`${TEST_DIR}/components/TestComponent/TestComponent.js`)
    expect(targetJsFile).to.be.false
  })

  test
  .stdout()
  .command(['component', 'TestComponent', '--dest', `${TEST_DIR}/components`, '--scss'])
  .it('should create a .scss stylesheet if the `--scss` flag is set', async _ctx => {
    const parentFolder = await fs.pathExists(TEST_DIR)
    const targetJsFile = await fs.pathExists(`${TEST_DIR}/components/TestComponent/TestComponent.js`)
    const targetCssFile = await fs.pathExists(`${TEST_DIR}/components/TestComponent/TestComponent.module.scss`)
    expect(parentFolder).to.be.true
    expect(targetJsFile).to.be.true
    expect(targetCssFile).to.be.true

    const targetJsFileContent = await fs.readFile(`${TEST_DIR}/components/TestComponent/TestComponent.js`, 'utf-8')
    expect(targetJsFileContent).to.contain("import styles from './TestComponent.module.scss';")
  })
})
