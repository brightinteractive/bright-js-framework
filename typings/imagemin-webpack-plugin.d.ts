declare module "imagemin-webpack-plugin" {
  import { Plugin } from 'webpack'

  export default class ImageminPlugin extends Plugin {
    constructor(opts?: {
      disable?: boolean,
    })
  }
}
