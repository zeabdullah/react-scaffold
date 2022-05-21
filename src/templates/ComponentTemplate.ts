/* eslint-disable unicorn/filename-case */
/* eslint-disable unicorn/prefer-spread */
import {cssTemplate, jsTemplate, tsTemplate} from './templates'

export default class ComponentTemplate {
  private componentName: string
  private config: TemplateConfig

  constructor(componentName: string, config?: TemplateConfig) {
    this.componentName = componentName
    this.config = config ?? {
      isTypescript: false,
      isScss: false,
    }
  }

  public getComponentName(): string {
    return this.componentName
  }

  public setComponentName(value: string): ComponentTemplate {
    this.componentName = value
    return this
  }

  public setTypescript(): ComponentTemplate {
    this.config.isTypescript = true
    return this
  }

  public setJavascript(): ComponentTemplate {
    this.config.isTypescript = false
    return this
  }

  public setSass(): ComponentTemplate {
    this.config.isScss = true
    return this
  }

  public setCss(): ComponentTemplate {
    this.config.isScss = false
    return this
  }

  public getMainTemplate(): string {
    const {isTypescript, isScss} = this.config
    const templateCopy: string = (isTypescript ? tsTemplate : jsTemplate).concat()
    const cssExt = isScss ? 'scss' : 'css'

    return templateCopy.replace(/TemplateName/g, this.componentName).replace(/CSS_EXT/g, cssExt)
  }

  public getCssTemplate(): string {
    return cssTemplate.slice().replace(/TemplateName/g, this.componentName)
  }
}

interface TemplateConfig {
  isTypescript?: boolean
  isScss?: boolean
}
