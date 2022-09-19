import { Style, type RsxConfig } from '../utils/config'
import * as tpStrings from './template-strings'

type TemplateConfig = Partial<RsxConfig>

export default class ComponentTemplate {
    private componentName: string
    private config: TemplateConfig

    constructor(componentName: string, config?: TemplateConfig) {
        this.componentName = componentName
        this.config = config ?? {
            typescript: false,
            style: Style.css,
            dest: 'src/components',
        }
    }

    public setStyleType(styleType: Style): ComponentTemplate {
        this.config.style = styleType
        return this
    }

    public setScriptType(scriptType: 'js' | 'ts'): ComponentTemplate {
        this.config.typescript = scriptType === 'ts'
        return this
    }

    public getStyleType(): Style {
        return this.config.style ?? Style.css
    }

    public getCssTemplate(): string {
        return tpStrings.cssTemplate.replace(/#COMPONENT_NAME#/g, this.componentName)
    }

    public getScriptTemplate(): string {
        const { typescript } = this.config
        const styleType = this.getStyleType()

        if (styleType === Style.styledComponents) {
            return tpStrings.styledComponentTemplate.replace(
                /#COMPONENT_NAME#/g,
                this.componentName,
            )
        }

        const template = typescript ? tpStrings.tsTemplate : tpStrings.jsTemplate
        if (styleType === Style.none) {
            return template
                .replace(/#CSS_IMPORT#/g, '')
                .replace(/#CLASS_NAME#/g, '')
                .replace(/#COMPONENT_NAME#/g, this.componentName)
        }

        return template
            .replace(/#CSS_IMPORT#/g, tpStrings.cssImportString)
            .replace(/#CLASS_NAME#/g, tpStrings.classNamePropString)
            .replace(/#COMPONENT_NAME#/g, this.componentName)
            .replace(/#CSS_EXT#/g, styleType)
    }

    public getTestTemplate(): string {
        return tpStrings.testTemplate.replace(/#COMPONENT_NAME#/g, this.componentName)
    }

    public getIndexTemplate(): string {
        return tpStrings.indexTemplate.replace(/#COMPONENT_NAME#/g, this.componentName)
    }
    // TODO: storybook template
    // public getStorybookTemplate(): string {
    //     return storybookTemplate.replace(/#COMPONENT_NAME#/g, this.componentName)
    // }
}
