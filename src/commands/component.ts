import {Command, Flags} from '@oclif/core'
import fs from 'fs-extra'
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

  private async createComponent(name: string, config: {
    destination: string,
    isTypescript?: boolean
    isScss?: boolean
  }): Promise<void> {
    const {destination, isTypescript, isScss} = config

    const compTemplate = new ComponentTemplate(name, {
      isTypescript,
      isScss,
    })

    const ext = isTypescript ? 'tsx' : 'js'
    const cssExt = isScss ? 'scss' : 'css'
    fs.mkdirSync(`${destination}/${name}`, {recursive: true})
    fs.writeFileSync(`${destination}/${name}/${name}.${ext}`, compTemplate.getScriptTemplate())
    fs.writeFileSync(`${destination}/${name}/${name}.module.${cssExt}`, compTemplate.getCssTemplate())

    this.log(`✅ Created ${name} at ${destination}/${name}`)
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

      await this.createComponent(arg, {
        destination: flags.dest || 'src/components',
        isTypescript: flags.typescript,
        isScss: flags.scss,
      })
    }
  }
}
