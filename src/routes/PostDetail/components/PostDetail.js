import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui'
import ImageZoom from 'react-medium-image-zoom'
import Typography from 'material-ui/Typography'
import Parser from 'html-react-parser'

import AuthorAvatar from '../../../components/AuthorAvatar'

const styles = theme => ({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
  },
  imageWrapper: {
    textAlign: 'center'
  },
  image: {
    // width: '100%'
    height: 400,
  },
  AuthorAvatar: {
    marginBottom: 25,
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

  parseHtml = (content, classes) => (
    Parser(content, {
      replace: (domNode) => {
        if (domNode.name === 'img') {
          return (
            <div className={classes.imageWrapper}>
              <ImageZoom
                image={{
                  src: domNode.attribs.src,
                  className: classes.image
                }}
              />
            </div>
          )
        }
      }
    })
  )

  render () {
    const {
      id,
      title,
      content,
      author,
      date,
      acf,
      categories,
      classes,
      errorMessage
    } = this.props
    return errorMessage ? (
      <div className={classes.container}>
        <Typography>
          {errorMessage}
        </Typography>
      </div>
    ) : (
      <div className={classes.container}>
        <Typography
          variant='title'
          classes={{
            root: classes.title
          }}
        >
          {title}
        </Typography>
        <AuthorAvatar
          name={author.name}
          avatarSrc={author.avatarUrl}
          date={date}
          classes={{
            root: classes.AuthorAvatar
          }}
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
        <div>
          {this.parseHtml(content, classes)}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PostDetail)
