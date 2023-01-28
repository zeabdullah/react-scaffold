import { expect } from '@oclif/test'
import ComponentTemplate from '../../src/templates/ComponentTemplate'
import { Style } from '../../src/utils/config'

const jsxTemplate = `
import React from 'react';
import styles from './Example.module.css';

function Example() {
  return <div className={styles.Example}>Example</div>
}

export default Example;
`

const testTemplate = `
import React from 'react';

describe('Example', () => {
  it('case', () => {

  });
});
`
const tsxTemplateWithCss = `
import React from 'react';
import styles from './Example.module.css';

interface ExampleProps {}

function Example(props: ExampleProps): JSX.Element {
  return <div className={styles.Example}>Example</div>
}

export default Example;
`

const tsxTemplateWithScss = `
import React from 'react';
import styles from './Example.module.scss';

interface ExampleProps {}

function Example(props: ExampleProps): JSX.Element {
  return <div className={styles.Example}>Example</div>
}

export default Example;
`

describe('ComponentTemplate Class', () => {
    it('should return a CSS+JavaScript template by default', () => {
        const tp = new ComponentTemplate('Example')
        const expectedJsTemplate = jsxTemplate.trimStart()
        expect(tp.getScriptTemplate()).to.eql(expectedJsTemplate)
    })

    it('should return a template including a SCSS import when set in the config', () => {
        const tp = new ComponentTemplate('Example', { style: Style.scss })
        expect(tp.getScriptTemplate()).to.contain(
            "import styles from './Example.module.scss';",
        )
        expect(tp.getScriptTemplate()).to.not.contain(
            "import styles from './Example.module.css';",
        )
    })

    it('should return a template including a unit test when set in the config', () => {
        const tp = new ComponentTemplate('Example')

        const expectedTemplate = testTemplate.trimStart()

        expect(tp.getTestTemplate()).to.eql(expectedTemplate)
    })

    it('should return a template including an index when set in the config', () => {
        const tp = new ComponentTemplate('Example')
        const expectedTemplate = "export { default } from './Example'\n"

        expect(tp.getIndexTemplate()).to.eql(expectedTemplate)
    })

    it('should return a TypeScript template when set in the config', () => {
        const tp = new ComponentTemplate('Example', { typescript: true })
        const expectedTsTemplate = tsxTemplateWithCss.trimStart()

        expect(tp.getScriptTemplate()).to.eql(expectedTsTemplate)
    })

    it('should automatically modify the template if config is changed after creation', () => {
        const tp = new ComponentTemplate('Example')
        const expectedFirstTemplate = jsxTemplate.trimStart()

        const expectedSecondTemplate = tsxTemplateWithScss.trimStart()

        expect(tp.getScriptTemplate()).to.eql(expectedFirstTemplate)
        expect(tp.getScriptTemplate()).to.contain(
            "import styles from './Example.module.css';",
        )
        tp.setStyleType(Style.scss)
        expect(tp.getScriptTemplate()).to.contain(
            "import styles from './Example.module.scss';",
        )
        tp.setScriptType('ts')
        expect(tp.getScriptTemplate()).to.eql(expectedSecondTemplate)
    })
})
