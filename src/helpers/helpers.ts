import {type PathLike} from 'fs-extra'
import readdirp from 'readdirp'

export function isPascalCase(str: string): boolean {
  const pascalCaseRegex = /^(?:[A-Z][a-z]+)+$/
  return pascalCaseRegex.test(str)
}

type FilterOptions = {
  directoryFilter?: string | string[]
}
export async function getSubdirectories(
  dirPath: PathLike,
  options?: FilterOptions,
): Promise<string[]> {
  try {
    const dirs = await readdirp.promise(dirPath.toString(), {
      directoryFilter: options?.directoryFilter ?? ['!.*', '!*modules'],
      type: 'directories',
    })
    return dirs.map(dir => dir.path.replace(/\\/g, '/'))
  } catch (error) {
    console.log(error)
    return []
  }
}
