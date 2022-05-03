import {Command, Flags} from '@oclif/core'
import * as fs from 'fs-extra'

export default class Component extends Command {
  static description = 'Scaffold a React component';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {
    dest: Flags.string({char: 'd', description: 'Destination folder', required: false, default: 'src/components'}),
    type: Flags.string({char: 't', description: 'File type (ts|js)', required: false, default: 'js'}),
  };

  static args = [{name: 'componentName'}];

  private async createComponent(name: string, config: {destination: string}) {
    const dest = config.destination
    if (!fs.pathExistsSync(dest)) fs.mkdir(dest)
    

    await fs.mkdir(`${dest}/${name}`)
    await fs.writeFile(`${dest}/${name}/${name}.js`, `${name} created using createComponent()`)
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Component)

    if (args.componentName) {
      const dest = flags.dest || 'src/components'
      this.createComponent(args.componentName, {
        destination: dest,
      })
    } else {
      this.log('Missing Argument: <ComponentName>')
    }
  }
}
