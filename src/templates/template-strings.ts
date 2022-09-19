export const cssTemplate = '.#COMPONENT_NAME# {}'
export const cssImportString = `
import styles from './#COMPONENT_NAME#.module.#CSS_EXT#';
`.trimStart()
export const classNamePropString = ' className={styles.#COMPONENT_NAME#}'

export const jsTemplate = `
import React from 'react';
#CSS_IMPORT#
function #COMPONENT_NAME#() {
  return <div#CLASS_NAME#>#COMPONENT_NAME#</div>
}

export default #COMPONENT_NAME#;
`.trimStart()

export const tsTemplate = `
import React from 'react';
#CSS_IMPORT#
interface #COMPONENT_NAME#Props {}

function #COMPONENT_NAME#(props: #COMPONENT_NAME#Props): JSX.Element {
  return <div#CLASS_NAME#>#COMPONENT_NAME#</div>
}

export default #COMPONENT_NAME#;
`.trimStart()

export const styledComponentTemplate = `
import styled from 'styled-components';

const #COMPONENT_NAME# = styled.div\`
  display: block 
\`;

export default #COMPONENT_NAME#;
`.trimStart()

export const indexTemplate = `export { default } from './#COMPONENT_NAME#'
`

export const testTemplate = `
import React from 'react';

describe('#COMPONENT_NAME#', () => {
  it('case', () => {

  });
});
`.trimStart()

export const storybookTemplate = `
import React from 'react';
import { #COMPONENT_NAME# } from './#COMPONENT_NAME#';

export default { title: '#STORY_PATH#' };

const defaultProps: React.ComponentProps<typeof #COMPONENT_NAME#> = {

};

export const Overview = () => {
    return (
        <#COMPONENT_NAME# {...defaultProps} />
    );
};
`.trimStart()
