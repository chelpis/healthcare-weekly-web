import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { withStyles } from 'material-ui/styles'

import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Grid from 'material-ui/Grid'
import Divider from 'material-ui/Divider'

const styles = theme => ({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 24,
    paddingRight: 24,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  Divider: {
    marginTop: 20,
  }
})

class PostListItem extends Component {
  static propTypes = {
    // id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.object,
    date: PropTypes.string,
    extensionsChelpisCms: PropTypes.object,
    classes: PropTypes.any,
  }

  render () {
    const {
      title,
      content,
      author,
      date,
      extensionsChelpisCms,
      classes
    } = this.props
    return (
      <div className={classes.container}>
        <Typography
          variant='title'
          gutterBottom
        >
          {title}
        </Typography>
        <Typography gutterBottom>
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

        <Grid container>
          <Grid item>
            <Avatar
              alt={author.name}
              src={author.avatarUrl}
            />
          </Grid>
          <Grid item>
            <Typography>
              {author.name}
            </Typography>
            <Typography>
              {moment(date).fromNow()}
            </Typography>
          </Grid>
        </Grid>
        <Divider
          classes={{
            root: classes.Divider
          }}
        />
      </div>
    )
  }
}

export default withStyles(styles)(PostListItem)
