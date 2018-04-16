import { connect } from 'react-redux'
import PostList from '../components/PostList'
import {
  fetchPosts,
} from '../modules/postList'

const mapDispatchToProps = {
  fetchPosts,
}

const mapStateToProps = (state) => {
  const {
    posts,
    isRefreshing,
    isLoading,
    isEnd,
    next,
    errorMessage,
    fetchedTimestamp,
  } = state.postList
  return {
    posts,
    isRefreshing,
    isLoading,
    isEnd,
    next,
    errorMessage,
    fetchedTimestamp,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
