import {Command, Flags} from '@oclif/core'
import * as fs from 'fs-extra'

export default class Component extends Command {
  static description = 'Scaffold a React component';

  // static examples = ['<%= config.bin %> <%= command.id %> '];

  static flags = {
    dest: Flags.string({char: 'd', description: 'Destination folder', required: false, default: 'src/components'}),
    type: Flags.string({char: 't', description: 'File type (ts|js)', required: false, default: 'js'}),
  };

  static args = [{name: 'ComponentName'}];

  private async createComponent(compName: string, config: {destination: string}) {
    const dest = config.destination

    const jsContent = `export default function ${compName}() {
  return <div>${compName}</div>
}`

    await fs.mkdirp(`${dest}/${compName}`)
    await fs.writeFile(`${dest}/${compName}/${compName}.js`, jsContent)

    this.log(`✔ Created ${compName} at ${dest}/${compName}`)
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Component)

    if (args.ComponentName) {
      const dest = flags.dest || 'src/components'

      await this.createComponent(args.ComponentName, {destination: dest})
    } else {
      this.log('Missing Argument: <ComponentName>')
    }
  }
}
