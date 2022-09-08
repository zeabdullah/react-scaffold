import {Command, Flags} from '@oclif/core'
import c from 'ansi-colors'
import fs from 'fs-extra'
import {isPascalCase} from '../helpers'
import ComponentTemplate from '../templates/ComponentTemplate'
import {readRsxConfig, RsxConfig, Style} from '../utils/config'

export default class Component extends Command {
    static description = 'Create/Scaffold a React component'
    static strict = false
    static examples = [
        '<%= config.bin %> <%= command.id %> ComponentOne ComponentTwo',
        '<%= config.bin %> <%= command.id %> ComponentOne --typescript --style=scss --dest src/components/layout',
    ]

    static aliases: string[] = ['comp', 'c']

    static flags = {
        dest: Flags.directory({
            char: 'd',
            description: 'Destination folder',
            required: false,
            default: 'src/components',
        }),
        typescript: Flags.boolean({
            description: 'Create a TypeScript component',
            required: false,
        }),
        style: Flags.enum({
            description: 'Choose which type of styling to use for your components',
            options: ['css', 'scss', 'styled-components', 'none'],
            default: 'css',
            required: false,
        }),
    }

    private async createComponent(name: string, flags: Record<string, any>) {
        const config = await readRsxConfig()
        const options: RsxConfig = {
            dest: flags.dest ?? config.dest,
            typescript: flags.typescript ?? config.typescript,
            style: flags.style ?? config.style,
        }
        const {dest, typescript, style} = options

        const compTemplate = new ComponentTemplate(name, {typescript, style, dest})
        const ext = typescript ? 'tsx' : 'js'

        try {
            await fs.mkdir(`${dest}/${name}`, {recursive: true})
            await fs.writeFile(
                `${dest}/${name}/${name}.${ext}`,
                compTemplate.getScriptTemplate(),
                'utf-8',
            )
            if (style === Style.css || style === Style.scss) {
                const cssExt = compTemplate.getStyleType() as Style.css | Style.scss
                await fs.writeFile(
                    `${dest}/${name}/${name}.module.${cssExt}`,
                    compTemplate.getCssTemplate(),
                    'utf-8',
                )
            }
            this.log(c.greenBright(`✅ Created ${name} at ${dest}/${name}`))
        } catch (error: any) {
            console.log(c.bold.red(`Failed to create ${name}`))
            console.log(error.message)
        }
    }

    public async run(): Promise<void> {
        const {flags, argv} = await this.parse(Component)

        if (this.argv.length === 0) {
            this.log(c.bold.red('Missing Argument: <ComponentName>'))
            return
        }

        for await (const arg of argv) {
            if (!isPascalCase(arg)) {
                this.log(c.bold.red(`Invalid Argument: ${arg} must be in PascalCase`))
                continue
            }

            await this.createComponent(arg, flags)
        }
    }
}
