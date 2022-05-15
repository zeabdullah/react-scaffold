export function isPascalCase(str: string): boolean {
  const pascalCaseRegex = /^(?:[A-Z][a-z]+)+$/
  return pascalCaseRegex.test(str)
}
