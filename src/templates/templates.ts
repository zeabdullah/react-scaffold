export const cssTemplate = '.TemplateName {}'

export const jsTemplate = `import React from 'react';
import styles from './TemplateName.module.CSS_EXT';

function TemplateName() {
  return <div className={styles.TemplateName}>TemplateName</div>
}

export default TemplateName;
`

export const tsTemplate = `import React from 'react';
import styles from './TemplateName.module.CSS_EXT';

interface TemplateNameProps {}

function TemplateName(): JSX.Element {
  return <div className={styles.TemplateName}>TemplateName</div>
}

export default TemplateName;
`
