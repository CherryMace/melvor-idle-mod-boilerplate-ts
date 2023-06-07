# Introduction
This is a boilerplate/template for Melvor Idle mods. Using TypeScript with Webpack, this will compile your mod to a single, uglified script file, largely reducing mod size and improving compatibilty with IDE features. The downside to this is it makes debugging in the browser a bit more difficult with the uglified source.

# Prerequisites
Requires [Node.js](https://nodejs.org/en/)

# Use
1. Fork and clone repository.
2. Run `npm install`
3. Update `package.json`'s `name` property to match your mod.
4. Update `manifest.json`'s `namespace` property.
5. Using the Creator Toolkit's [Directory Link](https://wiki.melvoridle.com/w/Mod_Creation/Creator_Toolkit) feature (Recommended)
   1. Run `npm run build`
   2. Point the Directory Link to the created `dist` folder
   3. Any further updates requires only a `npm run build` and a reload of the game
5. Uploading to mod.io or using the Creator Toolkit's modfile feature:
   1. Run `npm run buildzip`
   2. Upload the generated `.zip` file in the `package` folder.

# Features

## Included Melvor Idle Typing
The official Melvor Idle Typing project definitions are included as part of this repository. You should have access to types/autocomplete with things like the modding context API or `game` objects.

## HTML Templates
This repository automatically minifies and loads any HTML templates that are stored with a filename like `*.template.html`. This allows for better separation of templates in the source files but reduces package size and speeds up load times.
* If you utilize this pattern you should not add any of your individual `*.template.html` files to the `"load"` property of the `manifest.json` file.
* If you do not use any template files, remove the `templates.min.html` file from the `"load"` property of the `manifest.json` file.

# Important Notes/Caveats/Known Issues
* There are some oddities/type errors when referencing globally available 3rd party libraries like Swal ¯\\\_(ツ)\_/¯
* Don't use `loadModule` to import modules. Use ES6 `import` instead.
* Image files that you want to bundle with your mod **must** be in the `img` folder and be imported somewhere in the code.
* The `img` folder cannot have subdirectories.
* As mentioned above, the minification and uglification of code makes debugging error messages a bit more tedious.