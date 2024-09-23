# deep-print

Displays a tree structure in the console, supporting both binary trees and trees with an arbitrary number of children.

## Installation

To install the package, use npm:

```bash
pnpm add deep-print

yarn install deep-print

npm install deep-print
```

## Usage

```tsx
// Deep Print

import React from "react";
import { dp } from "deep-print";

const str = 'start' + dp('', [
   (tab) => 'line 1',
   (tab) => 'line 2' + dp(tab, [
      (tab) => 'line 2.1',
      (tab) => 'line 2.2',
   ])
   (tab) => 'line 3',
]);

console.log(str);
// start
// ├── line 1
// │
// ├── line 2
// │   ├── line 2.1
// │   └── line 2.2
// └── line 3
```

```tsx
// Deep Print Binary

import React from "react";
import { dpd } from "deep-print";

const str =
  "Node" +
  dpd("", [
    (tab) => "left" + printBinary(tab, [() => "left 1", () => "right 1"]),
    (tab) => "right" + printBinary(tab, [() => "left 2", () => "right 2"]),
  ]);

console.log(str);
// Node
// ← left
//   ← left 1
//   → right 1
// → right
//   ← left 2
//   → right 2
```

## tsup

Bundle your TypeScript library with no config, powered by esbuild.

https://tsup.egoist.dev/

## How to use this

1. install dependencies

```
# pnpm
$ pnpm install

# yarn
$ yarn install

# npm
$ npm install
```

2. Add your code to `src`
3. Add export statement to `src/index.ts`
4. Test build command to build `src`.
   Once the command works properly, you will see `dist` folder.

```zsh
# pnpm
$ pnpm run build

# yarn
$ yarn run build

# npm
$ npm run build
```

5. Publish your package

```zsh
$ npm publish
```

## test package

https://www.npmjs.com/package/deep-print
