import {expect, test} from '@oclif/test'
import * as fs from 'fs-extra'
import ComponentTemplate from '../../src/templates/ComponentTemplate'

// ? Deletes the following test folders, if present
function purgeTestFolders() {
  fs.rm('tmp', {recursive: true, force: true}).catch()
  fs.rm('src/components', {recursive: true, force: true}).catch()
}

describe('rsx component', () => {
  const TEST_DIR = 'tmp/src'

  beforeEach(purgeTestFolders)
  afterEach(purgeTestFolders)

  test
  .stdout()
  .command(['component'])
  .it('should expect a <ComponentName> argument', ctx => {
    expect(ctx.stdout).to.contain('❌ Missing Argument: <ComponentName>')
    expect(ctx.stdout).to.not.contain('✅ Created')
  })

  test
  .stdout()
  .command(['component', 'componentName'])
  .it('should expect <ComponentName> argument to be PascalCase', ctx => {
    expect(ctx.stdout).to.contain('❌ Invalid Argument: componentName must be in PascalCase')
    expect(ctx.stdout).to.not.contain('✅ Created')
  })

  test
  .stdout()
  .command(['component', 'MyComponent'])
  .it('should create a component named MyComponent in src/components by default', async ctx => {
    const componentPath = 'src/components/MyComponent'

    const jsFileContent = fs.readFileSync(`${componentPath}/MyComponent.js`, 'utf-8')
    const cssFileContent = fs.readFileSync(`${componentPath}/MyComponent.module.css`, 'utf-8')
    const compTemplate = new ComponentTemplate('MyComponent')

    expect(ctx.stdout).to.contain('✅ Created MyComponent at src/components/MyComponent')
    expect(ctx.stdout).to.not.contain('Will create a typescript component')
    expect(jsFileContent).to.eql(compTemplate.getScriptTemplate())
    expect(cssFileContent).to.eql(compTemplate.getCssTemplate())
  })

  const COMP_PATH = `${TEST_DIR}/components/TestComponent`
  test
  .stdout()
  .command(['component', 'TestComponent', '--dest', `${TEST_DIR}/components`])
  .it('should create a component named TestComponent in a given directory', async _ctx => {
    expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.js`)).to.be.true
    expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.module.css`)).to.be.true
  })

  test
  .stdout()
  .command(['component', 'TestComponent', '--dest', `${TEST_DIR}/components`, '--typescript'])
  .it('should create a typescript component when the `--typescript` flag is set', async _ctx => {
    expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.tsx`)).to.be.true
    expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.js`)).to.be.false
  })

  test
  .stdout()
  .command(['component', 'TestComponent', '--dest', `${TEST_DIR}/components`, '--scss'])
  .it('should create a .scss stylesheet if the `--scss` flag is set', async _ctx => {
    expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.js`)).to.be.true
    expect(fs.pathExistsSync(`${COMP_PATH}/TestComponent.module.scss`)).to.be.true
    const targetJsFileContent = fs.readFileSync(`${TEST_DIR}/components/TestComponent/TestComponent.js`, 'utf-8')
    expect(targetJsFileContent).to.contain("import styles from './TestComponent.module.scss';")
  })

  test
  .stdout()
  .command(['component', 'TestComponent', 'AnotherComponent', 'Andanotherone'])
  .it('should be able to create multiple components in the same directory when given multiple arguments', async _ctx => {
    const prePath = 'src/components'
    expect(fs.pathExistsSync(`${prePath}/TestComponent/TestComponent.js`)).to.be.true
    expect(fs.pathExistsSync(`${prePath}/AnotherComponent/AnotherComponent.js`)).to.be.true
    expect(fs.pathExistsSync(`${prePath}/Andanotherone/Andanotherone.js`)).to.be.true
  })
})
