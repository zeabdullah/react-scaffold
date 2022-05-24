/* eslint-disable unicorn/filename-case */
import {expect, test} from '@oclif/test'
import ComponentTemplate from '../../src/templates/ComponentTemplate'

describe('ComponentTemplate Class', () => {
  test
  .it('should return a CSS+JavaScript template by default', () => {
    const template =  new ComponentTemplate('ExampleComponent')

    const expectedJsTemplate =
`import React from 'react';
import styles from './ExampleComponent.module.css';

function ExampleComponent() {
  return <div className={styles.ExampleComponent}>ExampleComponent</div>
}

export default ExampleComponent;
`
    expect(template.getScriptTemplate()).to.eql(expectedJsTemplate)
  })

  test
  .skip()
  .it('should return', () => {
    expect.fail()
  })
})
