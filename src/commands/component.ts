import {Command, Flags} from '@oclif/core'
import * as fs from 'fs-extra'
import * as templates from '../templates'
import {isPascalCase} from '../helpers'

export default class Component extends Command {
  static description = 'Scaffold a React component';

  // static examples = ['<%= config.bin %> <%= command.id %> '];

  static flags = {
    dest: Flags.string({char: 'd', description: 'Destination folder', required: false, default: 'src/components'}),
    typescript: Flags.boolean({description: 'Create a TypeScript component', required: false}),
    scss: Flags.boolean({description: 'Use scss as the stylesheet', required: false}),
  };

  static args = [{name: 'componentName'}];

  private async createComponent(config: {
    componentName: string,
    destination: string,
    isTypescript?: boolean
    isScss?: boolean
  }): Promise<void> {
    const {componentName, destination, isTypescript, isScss} = config

    const jsContent = templates.createJsTemplate(componentName, isScss)
    const tsContent = templates.createTsTemplate(componentName, isScss)
    const cssContent = templates.createCssTemplate(componentName)

    const ext = isTypescript ? 'ts' : 'js'
    const cssExt = isScss ? 'scss' : 'css'
    await fs.mkdirp(`${destination}/${componentName}`)
    await fs.writeFile(`${destination}/${componentName}/${componentName}.${ext}`, isTypescript ? tsContent : jsContent)
    await fs.writeFile(`${destination}/${componentName}/${componentName}.module.${cssExt}`, cssContent)

    this.log(`✅ Created ${componentName} at ${destination}/${componentName}`)
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Component)

    if (!args.componentName) {
      this.log('Missing Argument: <ComponentName>')
      return
    }

    if (!isPascalCase(args.componentName)) {
      this.log(`Invalid Argument: ${args.componentName} must be in PascalCase`)
      return
    }

    await this.createComponent({
      componentName: args.componentName,
      destination: flags.dest || 'src/components',
      isTypescript: flags.typescript,
      isScss: flags.scss,
    })
  }
}
