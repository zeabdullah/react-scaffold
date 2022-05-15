import {expect, test} from '@oclif/test'
import * as fs from 'fs-extra'

describe('component', () => {
  const TEST_DIR = 'mock/src'

  beforeEach(() => {
    // ? Deletes the following test folders, if present
    fs.remove('mock').catch()
    fs.remove('src/components').catch()
  })
  afterEach(() => {
    fs.remove('mock').catch()
    fs.remove('src/components').catch()
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
    expect(jsFileContent).to.eql(expectedJsFileContent)
    expect(cssFileContent).to.eql(expectedCssFileContent)
  })

  test
  .stdout()
  .command(['component', 'TestComponent', '--dest', `${TEST_DIR}/components`])
  .it('should create a component named TestComponent in a given directory', async _ctx => {
    const parentFolder = await fs.pathExists(TEST_DIR)
    const targetJsFile = await fs.pathExists(`${TEST_DIR}/components/TestComponent/TestComponent.js`)

    expect(parentFolder).to.be.true
    expect(targetJsFile).to.be.true
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
})
