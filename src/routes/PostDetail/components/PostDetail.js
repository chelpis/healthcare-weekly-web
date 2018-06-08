import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui'
import ImageZoom from 'react-medium-image-zoom'
import Typography from 'material-ui/Typography'
import Parser from 'html-react-parser'
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share'

import AuthorAvatar from '../../../components/AuthorAvatar'
import HelmetShare from './HelmetShare'

const styles = theme => ({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
  },
  imageWrapper: {
    textAlign: 'center',
    height: 'auto',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    maxWidth: 400,
    height: 'auto'
  },
  AuthorAvatar: {
    marginBottom: 25,
  },
  shareButtons: {
    textAlign: 'right',
    paddingTop: 10,
    paddingBottom: 10,
  },
  shareButton: {
    display: 'inline-block',
    marginRight: 10,
  },
  readMore: {
    marginTop: 10,
    display: 'block',
    textAlign: 'right',
  }
})

class PostDetail extends Component {
  static propTypes = {
    fetchPost: PropTypes.func,
    // isLoading: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.object,
    date: PropTypes.string,
    image: PropTypes.string,
    isDigest: PropTypes.bool,
    link: PropTypes.string,
    // acf: PropTypes.object,
    // categories: PropTypes.array,
    // isEventLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
    // attendees: PropTypes.array,
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
      // id,
      title,
      content,
      author,
      date,
      image,
      isDigest,
      link,
      // acf,
      // categories,
      classes,
      errorMessage
    } = this.props
    const hasImage = !!image
    const shareUrl = location.href
    return errorMessage ? (
      <div className={classes.container}>
        <Typography>
          {errorMessage}
        </Typography>
      </div>
    ) : (
      <div className={classes.container}>
        <HelmetShare
          title={title}
          author={author.name}
          content={content}
          cover={hasImage ? image : ''}
        />
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
        {
          hasImage && (
            <div className={classes.imageWrapper}>
              <ImageZoom
                image={{
                  src: image,
                  className: classes.image
                }}
              />
            </div>
          )
        }
        <div>
          {this.parseHtml(content, classes)}
        </div>
        {
          isDigest && (
            <a className={classes.readMore} href={link}>繼續閱讀</a>
          )
        }
        <hr />
        <div className={classes.shareButtons}>
          <FacebookShareButton
            className={classes.shareButton}
            url={shareUrl}
          >
            <FacebookIcon
              size={32}
              round
            />
          </FacebookShareButton>
          <TwitterShareButton
            className={classes.shareButton}
            url={shareUrl}
          >
            <TwitterIcon
              size={32}
              round
            />
          </TwitterShareButton>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PostDetail)
