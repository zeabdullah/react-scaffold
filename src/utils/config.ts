import { readFile } from 'fs-extra'
import { resolve } from 'node:path'

export enum Style {
    css = 'css',
    scss = 'scss',
    styledComponents = 'styled-components',
    none = 'none',
}

export interface RsxConfig {
    dest: string
    typescript?: boolean
    style: Style
    extraOptions?: {
        test?: boolean
        includeIndex?: boolean
        storybook?: boolean
    }
}

type EmptyObject = Record<string, never> // TypeScript linter recommends this
export async function readRsxConfig(): Promise<RsxConfig | EmptyObject> {
    try {
        const configData = await readFile(resolve(process.cwd(), '.rsxrc'), 'utf-8')
        return JSON.parse(configData)
    } catch {
        return {}
    }
}
