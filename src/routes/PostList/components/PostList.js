import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PostListItem from './PostListItem'

export default class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array,
    isRefreshing: PropTypes.bool,
    isLoading: PropTypes.bool,
    isEnd: PropTypes.bool,
    next: PropTypes.string,
    errorMessage: PropTypes.string,
    fetchedTimestamp: PropTypes.string,
    fetchPosts: PropTypes.func,
  }

  componentDidMount = () => {
    const {
      fetchPosts
    } = this.props
    fetchPosts()
  }

  render () {
    const {
      posts
    } = this.props
    return (
      <div>
        {
          posts.map(item => (
            <PostListItem
              key={item.id}
              {...item}
            />
          ))
        }
      </div>
    )
  }
}
