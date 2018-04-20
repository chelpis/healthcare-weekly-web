import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui'

import PostListItem from './PostListItem'

const styles = theme => ({
  container: {
    paddingTop: 20,
  }
})

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.array,
    // isRefreshing: PropTypes.bool,
    // isLoading: PropTypes.bool,
    // isEnd: PropTypes.bool,
    // next: PropTypes.string,
    errorMessage: PropTypes.string,
    // fetchedTimestamp: PropTypes.number,
    fetchPosts: PropTypes.func,
    classes: PropTypes.object,
  }

  componentDidMount = () => {
    const {
      fetchPosts
    } = this.props
    fetchPosts()
  }

  render () {
    const {
      posts,
      errorMessage,
      classes
    } = this.props
    return errorMessage ? (
      <div className={classes.container}>
        <Typography>
          {errorMessage}
        </Typography>
      </div>
    ) : (
      <div className={classes.container}>
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

export default withStyles(styles)(PostList)
