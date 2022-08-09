react-scaffold
=================

### **_⚠ Documentation is a work in progress. Please ignore this README for now. ⚠_**

Scaffold your React app from the command line.

[![Downloads/week](https://img.shields.io/npm/dm/react-scaffoldx?color=black)](https://npmjs.org/package/react-scaffoldx)
[![Build status](https://img.shields.io/github/workflow/status/abdullahzeidan/react-scaffold/react-scaffold%20CI%20Pipeline?label=build&logo=mocha&logoColor=white)](https://github.com/AbdullahZeidan/react-scaffold/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/react-scaffoldx?color=purple)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g react-scaffoldx
$ rsx COMMAND
running command...
$ rsx (--version)
react-scaffoldx/0.3.0 win32-x64 node-v16.13.1
$ rsx --help [COMMAND]
USAGE
  $ rsx COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`rsx component`](#rsx-component)
* [`rsx help [COMMAND]`](#rsx-help-command)
* [`rsx init`](#rsx-init)

## `rsx component`

Create/Scaffold a React component

```
USAGE
  $ rsx component [-d <value>] [--typescript] [--scss]

FLAGS
  -d, --dest=<value>  [default: src/components] Destination folder
  --scss              Use scss as the stylesheet
  --typescript        Create a TypeScript component

DESCRIPTION
  Create/Scaffold a React component

EXAMPLES
  $ rsx component ComponentOne ComponentTwo

  $ rsx component ComponentOne --typescript -scss --dest src/components/layout
```

_See code: [dist/commands/component.ts](https://github.com/AbdullahZeidan/react-scaffold/blob/v0.3.0/dist/commands/component.ts)_

## `rsx help [COMMAND]`

Display help for rsx.

```
USAGE
  $ rsx help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for rsx.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `rsx init`

Initialize react-scaffold's config file (.rsxrc)

```
USAGE
  $ rsx init [-y]

FLAGS
  -y, --yes  accept default config values ('assume YES')

DESCRIPTION
  Initialize react-scaffold's config file (.rsxrc)
```

_See code: [dist/commands/init.ts](https://github.com/AbdullahZeidan/react-scaffold/blob/v0.3.0/dist/commands/init.ts)_
<!-- commandsstop -->
