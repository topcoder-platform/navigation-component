# Topcoder Navigation React


### Build the components

Enter `navigation-component` and run:

- `npm install`
- `npm run build`

Due to this repo is not npm package, so keep `dist` folder for other project use it


## Getting Started

### Install

```
npm install git@github.com:username/navigation-component.git#develop --save
```

### Usage
- Example
```
import { TopNav } from 'navigation-component'
```

### Development

```shell
Install dependencies
$ npm install

# Run build
$ npm run build

#Go to other project which depends on the navigation-component, config its package.json so that the 'navigation-component' points to the local folder path of navigation-component:

# "dependencies": {
#  "navigation-component": "<local-path-to-navigation-component>",
#   ......
# }

# If you faced React Hook errors. Please remove 'node_modules', 'src' folder when you try it

```
