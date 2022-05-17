/* eslint-disable unicorn/prefer-spread */

const cssTemplate = '.TemplateName {}'

const jsTemplate = `import React from 'react';
import styles from './TemplateName.module.CSS_EXT';

function TemplateName() {
  return <div className={styles.TemplateName}>TemplateName</div>
}

export default TemplateName;
`

const tsTemplate = `import React from 'react';
import styles from './TemplateName.module.CSS_EXT';

interface TemplateNameProps {}

function TemplateName(): JSX.Element {
  return <div className={styles.TemplateName}>TemplateName</div>
}

export default TemplateName;
`

export function createJsTemplate(componentName: string, scssImport?: boolean): string {
  const templateCopy = jsTemplate.slice()
  const cssExt = scssImport ? 'scss' : 'css'
  return templateCopy.replace(/TemplateName/g, componentName).replace(/CSS_EXT/g, cssExt)
}

export function createTsTemplate(componentName: string, scssImport?: boolean): string {
  const templateCopy = tsTemplate.slice()
  const cssExt = scssImport ? 'scss' : 'css'
  return templateCopy.replace(/TemplateName/g, componentName).replace(/CSS_EXT/g, cssExt)
}

export function createCssTemplate(componentName: string): string {
  return cssTemplate.slice().replace(/TemplateName/g, componentName)
}

