# react-scaffold
⚛️ Scaffold your React app from the command line ⚛️.

[![Downloads/week](https://img.shields.io/npm/dm/react-scaffoldx?color=black)](https://npmjs.org/package/react-scaffoldx)
[![Build status](https://img.shields.io/github/workflow/status/abdullahzeidan/react-scaffold/react-scaffold%20CI%20Pipeline?label=build&logo=mocha&logoColor=white)](https://github.com/AbdullahZeidan/react-scaffold/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/react-scaffoldx?color=purple)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
- [react-scaffold](#react-scaffold)
- [Usage & Installation](#usage--installation)
- [Commands](#commands)
  - [`rsx component`](#rsx-component)
  - [`rsx init`](#rsx-init)
  - [`rsx help [COMMAND]`](#rsx-help-command)
<!-- tocstop -->

# Usage & Installation

It is recommended to install react-scaffoldx globally since it makes it easier for you to quickly type out.

<!-- usage -->
```sh-session
$ npm install -g react-scaffoldx
$ rsx COMMAND
running command...
$ rsx (--version)
react-scaffoldx/0.4.0 win32-x64 node-v16.13.1
$ rsx --help [COMMAND]
USAGE
  $ rsx COMMAND
...
```
<!-- usagestop -->


# Commands
<!-- commands -->
## `rsx component`

Create/Scaffold a React component.
this command also has aliases, `c` and `comp` (used as `rsx c ...`)

```
USAGE
  $ rsx component [-d <value>] [--typescript] [--style css|scss|styled-components|none]

FLAGS
  -d, --dest=<value>                         Destination folder
  --style=(css|scss|styled-components|none)  Choose which type of styling to use for your components  --typescript                               Create a TypeScript component

DESCRIPTION
  Create/Scaffold a React component
  
ALIASES
  $ rsx comp
  $ rsx c

EXAMPLES
  $ rsx component ComponentOne ComponentTwo

  $ rsx component ComponentOne --typescript --style=scss --dest src/components/layout
```

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

## `rsx help [COMMAND]`

Display help for rsx.

```
USAGE
  $ rsx help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

DESCRIPTION
  Display help for rsx.
```
<!-- commandsstop -->

