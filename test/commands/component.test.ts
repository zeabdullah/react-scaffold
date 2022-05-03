import {expect, test} from '@oclif/test'
import * as fs from 'fs-extra'

describe('component', () => {
  test
  .stdout()
  .command(['component'])
  .it('should expect a <ComponentName> argument', ctx => {
    expect(ctx.stdout).to.contain('Missing Argument: <ComponentName>')
  })

  test
  .stdout()
  .command(['component', 'MyComponent'])
  .it('should create a component named MyComponent.js in src/components by default', _ctx => {
    expect(fs.pathExistsSync('src/components/MyComponent/')).to.be.true
    expect(fs.pathExistsSync('src/components/MyComponent/MyComponent.ts')).to.be.true
  })

// test
//   .stdout()
//   .command(["component", "ComponentName", "--dest", "testSrc/components"])
//   .it("runs hello --name jeff", (ctx) => {
//     expect(ctx.stdout).to.contain("hello jeff");
//   });
})
