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
    const expectedJsFileContent =
`export default function MyComponent() {
  return <div>MyComponent</div>
}`

    const cssFileContent = await fs.readFile(`${componentPath}/MyComponent.css`, 'utf-8')
    const expectedCssFileContent =
`.MyComponent {

}`

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
    const targetCssFile = await fs.pathExists(`${TEST_DIR}/components/TestComponent/TestComponent.css`)

    expect(parentFolder).to.be.true
    expect(targetJsFile).to.be.true
    expect(targetCssFile).to.be.true
  })

  test
  .stdout()
  .command(['component', 'TestComponent', '--dest', `${TEST_DIR}/components`, '--typescript'])
  .it('should create a typescript component if given the `--typescript` flag', async _ctx => {
    const parentFolder = await fs.pathExists(TEST_DIR)
    const targetTsFile = await fs.pathExists(`${TEST_DIR}/components/TestComponent/TestComponent.ts`)
    const targetJsFile = await fs.pathExists(`${TEST_DIR}/components/TestComponent/TestComponent.js`)
    const targetCssFile = await fs.pathExists(`${TEST_DIR}/components/TestComponent/TestComponent.css`)

    expect(parentFolder).to.be.true
    expect(targetTsFile).to.be.true
    expect(targetJsFile).to.be.false
    expect(targetCssFile).to.be.true
  })

  test
  .skip()
  .stdout()
  .command(['component', 'TestComponent', '--dest', `${TEST_DIR}/components`, '--typescript'])
  .it('should create a .scss stylesheet if given the `--sass` or `--scss` flag', async _ctx => {
    // TODO: implementation
  })
})
