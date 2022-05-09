import {expect, test} from '@oclif/test'
import * as fs from 'fs-extra'

describe('component', () => {
  const TEST_DIR = 'mock/src'

  beforeEach(() => {
    // Delete the following test folders, if present
    fs.remove('mock').catch()
    fs.remove('src/components').catch()
  })
  afterEach(() => {
    fs.remove('mock').catch()
    fs.remove('src/components').catch()
  })

  test
  .stdout()
  .command(['component'])
  .it('should expect a <ComponentName> argument', ctx => {
    expect(ctx.stdout).to.contain('Missing Argument: <ComponentName>')
  })

  test
  .stdout()
  .command(['component', 'MyComponent'])
  .it('should create a component named MyComponent.js in src/components by default', async _ctx => {
    const jsFilePath = 'src/components/MyComponent/MyComponent.js'
    const jsFilePathExists = await fs.pathExists(jsFilePath)
    expect(jsFilePathExists).to.be.true

    const jsFileContent = await fs.readFile(jsFilePath, 'utf-8')
    const expectedFileContent =
`export default function MyComponent() {
  return <div>MyComponent</div>
}`
    expect(jsFileContent).to.eql(expectedFileContent)
  })

  test
  .stdout()
  .command(['component', 'TestComponent', '--dest', `${TEST_DIR}/components`])
  .it('should create a component named TestComponent.js in mock directory', async _ctx => {
    const parentFolder = await fs.pathExists(TEST_DIR)
    const targetJsFile = await fs.pathExists(`${TEST_DIR}/components/TestComponent/TestComponent.js`)

    expect(parentFolder).to.be.true
    expect(targetJsFile).to.be.true
  })
})
