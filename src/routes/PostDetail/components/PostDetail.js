import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { withStyles } from 'material-ui'
import ImageZoom from 'react-medium-image-zoom'

import AuthorAvatar from '../../../components/AuthorAvatar'

const styles = theme => ({
  imageWrapper: {
    textAlign: 'center'
  },
  image: {
    // width: '100%'
    height: 400,
  }
})

class PostDetail extends Component {
  static propTypes = {
    fetchPost: PropTypes.func,
    id: PropTypes.string,
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.object,
    date: PropTypes.string,
    acf: PropTypes.object,
    categories: PropTypes.array,
    isEventLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
    attendees: PropTypes.array,
    params: PropTypes.object,
    classes: PropTypes.object,
  }

  componentDidMount = () => {
    const {
      params: {
        id
      },
      fetchPost
    } = this.props
    fetchPost(id)
  }

  render () {
    const {
      id,
      title,
      content,
      author,
      date,
      acf,
      categories,
      classes
    } = this.props
    return (
      <div>
        <h1>{title}</h1>
        <AuthorAvatar
          name={author.name}
          avatarSrc={author.avatarUrl}
          date={date}
        />

        <br />
        {
          acf.image && (
            <div className={classes.imageWrapper}>
              <ImageZoom
                image={{
                  src: acf.image.sizes.medium,
                  className: classes.image
                }}
                zoomImage={{
                  src: acf.image.sizes.large,
                }}
              />
            </div>
          )
        }
        <div
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />
      </div>
    )
  }
}

export default withStyles(styles)(PostDetail)
