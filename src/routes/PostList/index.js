import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'posts',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const PostList = require('./containers/PostList').default
      const reducer = require('./modules/postList').default

      /*  Add the reducer to the store on key 'postList'  */
      injectReducer(store, { key: 'postList', reducer })

      /*  Return getComponent   */
      cb(null, PostList)

    /* Webpack named bundle   */
    }, 'postList')
  }
})
