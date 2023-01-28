import { type PathLike } from 'fs-extra'
import readdirp from 'readdirp'

/*!
 * is-var-name | ISC (c) Shinnosuke Watanabe
 * https://github.com/shinnn/is-var-name
 */
export function isVarName(str: string): boolean {
    if (typeof str !== 'string' || str.trim() !== str) {
        return false
    }

    try {
        // eslint-disable-next-line no-new-func, no-new
        new Function(str, 'var ' + str)
    } catch {
        return false
    }

    return true
}

type GetSubDirectoriesOptions = {
    directoryFilter?: string | string[]
}

export async function getSubdirectories(
    dirPath: PathLike,
    options?: GetSubDirectoriesOptions,
): Promise<string[]> {
    try {
        const dirs = await readdirp.promise(dirPath.toString(), {
            directoryFilter: options?.directoryFilter ?? ['!.*', '!*modules'],
            type: 'directories',
        })
        return dirs.map(dir => dir.path.replace(/\\/g, '/'))
    } catch (error) {
        console.warn(error)
        return []
    }
}
