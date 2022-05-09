- Needs figma desktop app to create and manage plugins
  - Probably some embbed js framework like Electron because it allows to open the developer tools
  - In my machine it was being quite slow
  - Print of Figma: ![](2022-05-02-09-15-21.png)



- Provides some boilerplate code during creation of plugin on desktop app (code.ts, code.ts, manifest.json, package.json, README.md & tsconfig.json)

- Has it's own typings file (@figma/plugin-typings)

- The UI of the iFrame doesn't allow redirection (blank screen given) => prolly needs some additional settings to make it work

- Some properties (text size, text content etc) seems to have two-way data-binding. The asignment of values happens directly on properties and not through setters or any other function.
