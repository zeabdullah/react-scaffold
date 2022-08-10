export const cssTemplate = '.COMPONENT_NAME {}'

export const jsTemplate =
`import React from 'react';
import styles from './COMPONENT_NAME.module.CSS_EXT';

function COMPONENT_NAME() {
  return <div className={styles.COMPONENT_NAME}>COMPONENT_NAME</div>
}

export default COMPONENT_NAME;
`

export const tsTemplate =
`import React from 'react';
import styles from './COMPONENT_NAME.module.CSS_EXT';

interface COMPONENT_NAMEProps {}

function COMPONENT_NAME(): JSX.Element {
  return <div className={styles.COMPONENT_NAME}>COMPONENT_NAME</div>
}

export default COMPONENT_NAME;
`
