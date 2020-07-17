# Adding eslint

## Install 
```sh
npm install eslint @react-native-community/eslint-config --save-dev
```

This will add two packages to your dev dependencies:

- **eslint** - the code linter for JavaScript
- **@react-native-community/eslint-config** - a community-built eslint configuration for React Native

## Adding the configuration files
```js
// .eslintrc.js

module.exports = {
  root: true,
  extends: '@react-native-community',
};
```
```js
// .prettierrc.js

module.exports = {
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
};
```
- `bracketSpacing` - adding a space around brackets, e.g. `import { useState } from 'react';` vs `import {useState} from 'react';`
- `singleQuote` - using single quotes for strings, e.g. `import React from 'react'` vs `import React from "react"`
- `trailingComma` - adding a trailing comma after array arguments (the default is not to have a trailing comma for the last element of the array)

## Adding eslint - adding the run script
Now we have eslint installed and configured. But how to actually run it? Open the `package.json` in your project and add the following under the `scripts` section:

```json
"lint": "eslint ."
```

Now you can run `npm run lint` or `yarn lint` in your terminal and the linter will report both eslint and prettier issues.

## Adding eslint - adding it to your code editor

It's all well and good to lint your code on the command line, but ideally you'd have instant feedback while you're writing your code. Thankfully most code editors have an integration option for this.

### VSCode

File => Preferences => Extentions => ESLint

### Atom

Atom => Preferences => Install => linter-eslint

You may have to close and reopen your code editor for the package to start working, but that's it! You now have the optimal working environment.