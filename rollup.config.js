import {nodeResolve} from '@rollup/plugin-node-resolve';

export default {
  input: 'src/header-widget.js', // the path to the component's JavaScript file
  output: {
    file: 'build/header-widget.js', // the output file
    format: 'iife', // WxCC Requires iife format javascript
    name: 'HeaderWidget'
  },
  plugins: [
    nodeResolve() // tells Rollup how to find external modules
  ]
};