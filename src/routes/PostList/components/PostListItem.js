import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import {
  Link
} from 'react-router'

import AuthorAvatar from 'app/components/AuthorAvatar'

const styles = theme => ({
  link: {
    textDecoration: 'none'
  },
  container: {
    paddingTop: 14,
    paddingLeft: 24,
    paddingRight: 24,
  },
  title: {
    marginBottom: 10
  },
  content: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: 10,
  },
  Divider: {
    marginTop: 17,
  }
})

class PostListItem extends Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.object,
    date: PropTypes.string,
    extensionsChelpisCms: PropTypes.object,
    classes: PropTypes.any,
  }

  render () {
    const {
      id,
      title,
      content,
      author,
      date,
      extensionsChelpisCms,
      classes
    } = this.props
    return (
      <Link
        className={classes.link}
        to={`/posts/${id}`}
      >
        <div className={classes.container}>
          <Typography
            variant='title'
            classes={{
              root: classes.title
            }}
          >
            {title}
          </Typography>
          <Typography
            classes={{
              root: classes.content
            }}
          >
            {content}
          </Typography>

          {
            extensionsChelpisCms.image && (
              <div
                style={{
                  backgroundImage: `url(${extensionsChelpisCms.image[0].value})`
                }}
                className={classes.image}
              />
            )
          }
          <AuthorAvatar
            name={author.name}
            avatarSrc={author.avatarUrl}
            date={date}
          />
          <Divider
            classes={{
              root: classes.Divider
            }}
          />
        </div>
      </Link>
    )
  }
}

export default withStyles(styles)(PostListItem)
