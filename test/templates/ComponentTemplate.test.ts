/* eslint-disable unicorn/filename-case */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {expect, test} from '@oclif/test'
import ComponentTemplate from '../../src/templates/ComponentTemplate'

describe('ComponentTemplate Class', () => {
  it('should return a CSS+JavaScript template by default', () => {
    const tp =  new ComponentTemplate('Example')
    const expectedJsTemplate =
`import React from 'react';
import styles from './Example.module.css';

function Example() {
  return <div className={styles.Example}>Example</div>
}

export default Example;
`
    expect(tp.getScriptTemplate()).to.eql(expectedJsTemplate)
  })

  it('should return a template including a SCSS import when set in the config', () => {
    const tp = new ComponentTemplate('Example', {isScss: true})
    expect(tp.getScriptTemplate()).to.contain("import styles from './Example.module.scss';")
    expect(tp.getScriptTemplate()).to.not.contain("import styles from './Example.module.css';")
  })

  it('should return a TypeScript template when set in the config', () => {
    const tp =  new ComponentTemplate('Example', {isTypescript: true})
    const expectedTsTemplate =
`import React from 'react';
import styles from './Example.module.css';

interface ExampleProps {}

function Example(): JSX.Element {
  return <div className={styles.Example}>Example</div>
}

export default Example;
`

    expect(tp.getScriptTemplate()).to.eql(expectedTsTemplate)
  })

  it('should automatically modify the template if config is changed after creation', () => {
    const tp = new ComponentTemplate('Example')
    const expectedFirstTemplate =
`import React from 'react';
import styles from './Example.module.css';

function Example() {
  return <div className={styles.Example}>Example</div>
}

export default Example;
`
    const expectedSecondTemplate =
`import React from 'react';
import styles from './Example.module.scss';

interface ExampleProps {}

function Example(): JSX.Element {
  return <div className={styles.Example}>Example</div>
}

export default Example;
`

    expect(tp.getScriptTemplate()).to.eql(expectedFirstTemplate)
    expect(tp.getScriptTemplate()).to.contain("import styles from './Example.module.css';")
    tp.setSass()
    expect(tp.getScriptTemplate()).to.contain("import styles from './Example.module.scss';")
    tp.setTypescript()
    expect(tp.getScriptTemplate()).to.eql(expectedSecondTemplate)
  })
})
