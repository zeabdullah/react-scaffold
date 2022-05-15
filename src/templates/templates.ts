/* eslint-disable unicorn/prefer-spread */

const cssTemplate = '.TemplateName {}'

const jsTemplate = `import React from 'react';
import styles from './TemplateName.module.css'

function TemplateName() {
  return <div className={styles.TemplateName}>TemplateName</div>
}

export default TemplateName;
`

const tsTemplate = `import React from 'react';
import styles from './TemplateName.module.css';

interface TemplateNameProps {}

function TemplateName(): JSX.Element {
  return <div className={styles.TemplateName}>TemplateName</div>
}

export default TemplateName;
`

export function createJsTemplate(componentName: string): string {
  return jsTemplate.slice().replace(/TemplateName/g, componentName)
}

export function createTsTemplate(componentName: string): string {
  return tsTemplate.slice().replace(/TemplateName/g, componentName)
}

export function createCssTemplate(componentName: string): string {
  return cssTemplate.slice().replace(/TemplateName/g, componentName)
}

