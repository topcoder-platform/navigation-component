# Topcoder Navigation React

## Demo

### Build the components

Enter `navigation-component` and run:

- `npm install`
- `npm run build:lib`

### Run the demo

Run the following in the `navigation-component-demo` folder:

- `yarn`
- `yarn start`

### Troubleshooting

If you encounter invalid hook call error while running the demo, then:

  - delete navigation-component-demo/node_modules/navigation-component/node_modules/react
  - delete navigation-component-demo/node_modules/navigation-component/node_modules/react-dom

and try again.

## Getting Started

### Install

```
npm i -D navigation-component
```

### Assets

Copy `dist/font` and `dist/img` to web server root folder. You can put them nested in sub folder, but be sure to update `$font-path` and `$img-path` SASS variables in the `src/assets/sass/_global/_variables.scss`.
