import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui'
import ReactPaginate from 'react-paginate'

import PostListItem from './PostListItem'

import './PostList.scss'
import { ITEMS_PER_PAGE } from '../../../constants/config'

const styles = theme => ({
  container: {
    paddingTop: 20,
  }
})

class PostList extends Component {
  static propTypes = {
    page: PropTypes.number,
    posts: PropTypes.array,
    errorMessage: PropTypes.string,
    fetchPosts: PropTypes.func,
    router: PropTypes.object,
    location: PropTypes.object,
    totalItemCount: PropTypes.number,
    classes: PropTypes.object,
  }

  componentDidMount = () => {
    const {
      location: {
        query
      },
      fetchPosts
    } = this.props
    fetchPosts({ page: parseInt(query.page - 1) })
  }

  onPageChange = ({ selected }) => {
    const {
      router,
      fetchPosts
    } = this.props
    router.push(`?page=${selected + 1}`)
    fetchPosts({ page: parseInt(selected) })
  }

  render () {
    const {
      posts,
      errorMessage,
      page,
      totalItemCount,
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

        <ReactPaginate
          forcePage={page}
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={<a href='#'>...</a>}
          pageCount={Math.ceil(totalItemCount / ITEMS_PER_PAGE)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.onPageChange}
          containerClassName={'pagination'}
          breakClassName={'break'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    )
  }
}

export default withStyles(styles)(PostList)
