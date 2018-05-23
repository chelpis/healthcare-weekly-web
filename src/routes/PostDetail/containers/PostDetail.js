import { connect } from 'react-redux'

import PostDetail from '../components/PostDetail'
import {
  fetchPost,
} from '../modules/postDetail'

const mapDispatchToProps = {
  fetchPost,
}

const mapStateToProps = (state) => {
  const {
    id,
    isLoading,
    title,
    content,
    author,
    date,
    image,
    isDigest,
    link,
    acf,
    categories,
    isEventLoading,
    errorMessage,
    attendees
  } = state.postDetail

  return {
    id,
    isLoading,
    title,
    content,
    author,
    date,
    image,
    isDigest,
    link,
    acf,
    categories,
    isEventLoading,
    errorMessage,
    attendees,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
