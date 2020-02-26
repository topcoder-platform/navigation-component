# Topcoder Navigation React Component

![Dev Build Status](https://img.shields.io/circleci/project/github/topcoder-platform/navigation-component/develop.svg?label=develop)
![Master Build Status](https://img.shields.io/circleci/project/github/topcoder-platform/navigation-component/master.svg?label=master)
![Latest NPM Release](https://img.shields.io/npm/v/navigation-component.svg)
![NPM Downloads](https://img.shields.io/npm/dm/navigation-component.svg)

The [Topcoder](https://www.topcoder.com) header navigation component.

### Usage

- Example
```
import { TopNav } from 'navigation-component'
```

### Development

```shell
# Install dependencies
$ npm install

# Run build
$ npm run build

# Go to other project which depends on the navigation-component, config its package.json so 
# that the 'navigation-component' points to the local folder path of navigation-component:

# "dependencies": {
#  "navigation-component": "<local-path-to-navigation-component>",
#   ......
# }

# If you faced React Hook errors. Please remove 'node_modules', 'src' folder when you try it

```

### License
UNLICENSED &mdash; for internal Topcoder projects.
