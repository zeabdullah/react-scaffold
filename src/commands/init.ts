/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Command, Flags} from '@oclif/core'
import {prompt} from 'enquirer'
import {resolve} from 'node:path'
import c from 'ansi-colors'
import fs from 'fs-extra'
import {getSubdirectories} from '../helpers'
import type {RsxConfig} from '../types'

const DEFAULT_CONFIG_CHOICES: RsxConfig = {
  defaultDir: 'src/components',
  lang: 'JavaScript',
  style: 'css',
}

export default class Init extends Command {
  static description = "Initialize react-scaffold's config file (.rsxrc)"

  static flags = {
    yes: Flags.boolean({
      char: 'y',
      description: "accept default config values ('assume YES')",
      required: false,
    }),
  }

  public async _overwriteConfig(): Promise<boolean> {
    const {overwrite}: Record<string, any> = await prompt({
      name: 'overwrite',
      type: 'confirm',
      message: 'config file already exists! Overwrite?',
    })
    if (!overwrite) {
      console.log('🚫 Config canceled')
      return false
    }

    return true
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Init)
    if (flags.yes) {
      this.generateRsxConfig(DEFAULT_CONFIG_CHOICES)
      return
    }

    const configExistsAtRoot = () => fs.pathExistsSync(resolve(process.cwd(), '.rsxrc'))
    if (configExistsAtRoot() && !(await this._overwriteConfig())) {
      return
    }

    const pathChoices = await getSubdirectories(process.cwd())
    const configQuestions = [
      {
        name: 'defaultDir',
        type: 'autocomplete',
        message: c.bold(`Choose a default path (${c.underline('ENTER')} to continue)`),
        choices: pathChoices,
        // @ts-ignore
        limit: 7,
        footer: c.bold('Scroll ⬆ and ⬇ with arrow keys'),
      },
      {
        name: 'lang',
        type: 'select',
        message: 'JavaScript or TypeScript?',
        choices: ['JavaScript', 'TypeScript'],
      },
      {
        name: 'style',
        type: 'select',
        message: 'How would you like to style your components?',
        choices: [
          {name: 'CSS', value: 'css'},
          {name: 'Sass', value: 'scss'},
          {name: 'Styled Components', value: 'styled-components', disabled: true},
          {name: 'None (e.g. Tailwind)', value: 'none'},
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
          {name: 'Unit tests (Jest)', value: 'jest'},
          {name: 'include `index.js`', value: 'includeIndex'},
        ],
      },
    ]
    const response = await prompt(configQuestions)

    this.generateRsxConfig(response)
  }

  async generateRsxConfig(configChoices: Record<string, any>): Promise<void> {
    const configPathAtRoot = resolve(process.cwd(), '.rsxrc')

    try {
      await fs.writeFile(configPathAtRoot, JSON.stringify(configChoices, null, '\t'))
      console.log('✅ Config (.rsxrc) generated successfully')
    } catch (error: any) {
      console.log(c.bold.red('Failed to create .rsxrc'))
      console.log(error.message)
    }
  }
}
