import {Command, Flags} from '@oclif/core'
import {prompt} from 'enquirer'
import {resolve} from 'node:path'
import c from 'ansi-colors'
import fs from 'fs-extra'
import {getSubdirectories} from '../helpers'
import {RsxConfig, Style} from '../utils/config'

const DEFAULT_CONFIG: RsxConfig = {
    dest: 'src/components',
    typescript: false,
    style: Style.css,
}

const CONFIG_PATH_AT_ROOT = resolve(process.cwd(), '.rsxrc')
const configExistsAtRoot = () => fs.pathExistsSync(CONFIG_PATH_AT_ROOT)

export default class Init extends Command {
    static description = "Initialize react-scaffold's config file (.rsxrc)"

    static flags = {
        yes: Flags.boolean({
            char: 'y',
            description: "accept default config values ('assume YES')",
            required: false,
        }),
    }

    public async _promptOverwriteConfig(): Promise<boolean> {
        const {overwrite}: Record<string, any> = await prompt({
            name: 'overwrite',
            type: 'confirm',
            message: c.bold.yellow('config file already exists! Overwrite?'),
        })
        if (!overwrite) {
            console.log('🚫 canceled')
            return false
        }
        return true
    }

    public async run(): Promise<void> {
        const {flags} = await this.parse(Init)
        if (flags.yes) {
            this._generateRsxConfig(DEFAULT_CONFIG)
            return
        }

        const allowOverwrite = await this._promptOverwriteConfig()
        if (configExistsAtRoot() && !allowOverwrite) return

        const pathChoices = await getSubdirectories(process.cwd())
        const configQuestions = [
            {
                name: 'dest',
                type: 'autocomplete',
                message: c.bold(
                    `Choose default destination (${c.underline(
                        'TYPE',
                    )} to filter. ${c.underline('ENTER')} to continue)`,
                ),
                choices: pathChoices,
                limit: 7,
                footer: c.bold('Scroll ⬆ and ⬇ with arrow keys'),
            },
            {
                name: 'typescript',
                message: 'Are you using TypeScript?',
                type: 'toggle',
                enabled: 'Yes',
                disabled: 'No',
            },
            {
                name: 'style',
                type: 'select',
                message: 'How would you like to style your components?',
                choices: [
                    {message: 'CSS', name: 'css'},
                    {message: 'SCSS', name: 'scss'},
                    {message: 'Styled Components 💅', name: 'styled-components'},
                    {message: 'None (e.g. for Tailwind)', name: 'none'},
                ],
            },
            {
                name: 'extraOptions',
                type: 'multiselect',
                message: c.bold(
                    `Other options (${c.underline('SPACE')} to select, ${c.underline(
                        'ENTER',
                    )} to continue)`,
                ),
                choices: [
                    {name: 'includeTest', message: 'Unit tests (Jest)', value: true},
                    {name: 'includeIndex', message: 'include `index.js`', value: true},
                ],
                result(choices: any[]) {
                    const extraOptions: Record<string, boolean> = {}
                    for (const choice of choices) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const currChoice = this.find(choice)
                        extraOptions[currChoice.name] = currChoice.value
                    }
                    return extraOptions
                },
            },
        ]
        const response = await prompt(configQuestions as any[])

        this._generateRsxConfig(response)
    }

    public async _generateRsxConfig(configChoices: Record<string, any>): Promise<void> {
        try {
            await fs.writeFile(
                CONFIG_PATH_AT_ROOT,
                JSON.stringify(configChoices, null, '\t'),
            )
            console.log(c.greenBright('✅ Config (.rsxrc) generated successfully'))
        } catch (error: any) {
            console.log(c.bold.red('Failed to create .rsxrc'))
            console.log(error.message)
        }
    }
}
