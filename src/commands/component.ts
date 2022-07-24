import {Command, Flags} from '@oclif/core'
import * as fs from 'node:fs'
import {isPascalCase} from '../helpers'
import ComponentTemplate from '../templates/ComponentTemplate'

export default class Component extends Command {
  static description = 'Create/Scaffold a React component';
  static strict = false
  static examples = [
    '<%= config.bin %> <%= command.id %> ComponentOne ComponentTwo',
    '<%= config.bin %> <%= command.id %> ComponentOne --typescript -scss --dest src/components/layout',
  ];

  static flags = {
    dest: Flags.string({char: 'd', description: 'Destination folder', required: false, default: 'src/components'}),
    typescript: Flags.boolean({description: 'Create a TypeScript component', required: false}),
    scss: Flags.boolean({description: 'Use scss as the stylesheet', required: false}),
  };

  private async createComponent(config: {
    componentName: string,
    destination: string,
    isTypescript?: boolean
    isScss?: boolean
  }): Promise<void> {
    const {componentName, destination, isTypescript, isScss} = config

    const compTemplate = new ComponentTemplate(componentName, {
      isTypescript,
      isScss,
    })

    const ext = isTypescript ? 'tsx' : 'js'
    const cssExt = isScss ? 'scss' : 'css'
    fs.mkdirSync(`${destination}/${componentName}`, {recursive: true})
    fs.writeFileSync(`${destination}/${componentName}/${componentName}.${ext}`, compTemplate.getScriptTemplate())
    fs.writeFileSync(`${destination}/${componentName}/${componentName}.module.${cssExt}`, compTemplate.getCssTemplate())

    this.log(`✅ Created ${componentName} at ${destination}/${componentName}`)
  }

  public async run(): Promise<void> {
    const {flags, argv} = await this.parse(Component)

    if (this.argv.length === 0) {
      this.log('❌ Missing Argument: <ComponentName>')
      return
    }

    for await (const arg of argv) {
      if (!isPascalCase(arg)) {
        this.log(`❌ Invalid Argument: ${arg} must be in PascalCase`)
        return
      }

      await this.createComponent({
        componentName: arg,
        destination: flags.dest || 'src/components',
        isTypescript: flags.typescript,
        isScss: flags.scss,
      })
    }
  }
}
