// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/CoreLayout'
import PageLayout from '../layouts/PageLayout/PageLayout'
import PostList from './PostList'
import PostDetail from './PostDetail'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  childRoutes : [
    {
      component: PageLayout,
      indexRoute: PostList(store),
      childRoutes: [
        PostList(store),
        PostDetail(store),
      ]
    }
  ],
})

export default createRoutes
