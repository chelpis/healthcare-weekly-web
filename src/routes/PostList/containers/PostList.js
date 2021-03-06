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
    isLoading,
    next,
    page,
    totalItemCount,
    errorMessage,
  } = state.postList
  return {
    posts,
    isLoading,
    next,
    page,
    totalItemCount,
    errorMessage,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
