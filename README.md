react-scaffold
=================

### **_Please ignore this README for now._**

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g react-scaffold
$ react-scaffold COMMAND
running command...
$ react-scaffold (--version)
react-scaffold/0.1.0 win32-x64 node-v16.13.1
$ react-scaffold --help [COMMAND]
USAGE
  $ react-scaffold COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`react-scaffold hello PERSON`](#react-scaffold-hello-person)
* [`react-scaffold hello world`](#react-scaffold-hello-world)
* [`react-scaffold help [COMMAND]`](#react-scaffold-help-command)
* [`react-scaffold plugins`](#react-scaffold-plugins)
* [`react-scaffold plugins:install PLUGIN...`](#react-scaffold-pluginsinstall-plugin)
* [`react-scaffold plugins:inspect PLUGIN...`](#react-scaffold-pluginsinspect-plugin)
* [`react-scaffold plugins:install PLUGIN...`](#react-scaffold-pluginsinstall-plugin-1)
* [`react-scaffold plugins:link PLUGIN`](#react-scaffold-pluginslink-plugin)
* [`react-scaffold plugins:uninstall PLUGIN...`](#react-scaffold-pluginsuninstall-plugin)
* [`react-scaffold plugins:uninstall PLUGIN...`](#react-scaffold-pluginsuninstall-plugin-1)
* [`react-scaffold plugins:uninstall PLUGIN...`](#react-scaffold-pluginsuninstall-plugin-2)
* [`react-scaffold plugins update`](#react-scaffold-plugins-update)

## `react-scaffold hello PERSON`

Say hello

```
USAGE
  $ react-scaffold hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/AbdullahZeidan/react-scaffold/blob/v0.1.0/dist/commands/hello/index.ts)_

## `react-scaffold hello world`

Say hello world

```
USAGE
  $ react-scaffold hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `react-scaffold help [COMMAND]`

Display help for react-scaffold.

```
USAGE
  $ react-scaffold help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for react-scaffold.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `react-scaffold plugins`

List installed plugins.

```
USAGE
  $ react-scaffold plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ react-scaffold plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `react-scaffold plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ react-scaffold plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ react-scaffold plugins add

EXAMPLES
  $ react-scaffold plugins:install myplugin 

  $ react-scaffold plugins:install https://github.com/someuser/someplugin

  $ react-scaffold plugins:install someuser/someplugin
```

## `react-scaffold plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ react-scaffold plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ react-scaffold plugins:inspect myplugin
```

## `react-scaffold plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ react-scaffold plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ react-scaffold plugins add

EXAMPLES
  $ react-scaffold plugins:install myplugin 

  $ react-scaffold plugins:install https://github.com/someuser/someplugin

  $ react-scaffold plugins:install someuser/someplugin
```

## `react-scaffold plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ react-scaffold plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ react-scaffold plugins:link myplugin
```

## `react-scaffold plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ react-scaffold plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ react-scaffold plugins unlink
  $ react-scaffold plugins remove
```

## `react-scaffold plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ react-scaffold plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ react-scaffold plugins unlink
  $ react-scaffold plugins remove
```

## `react-scaffold plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ react-scaffold plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ react-scaffold plugins unlink
  $ react-scaffold plugins remove
```

## `react-scaffold plugins update`

Update installed plugins.

```
USAGE
  $ react-scaffold plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
