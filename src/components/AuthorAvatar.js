import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Grid from 'material-ui/Grid'
import moment from 'moment'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
  },
  content: {
    marginLeft: -8,
  },
  small: {
    fontSize: '0.7em'
  },
  date: {
    fontSize: '0.7em',
    color: 'rgb(149, 147, 148)'
  }
})

class AuthorAvatar extends Component {
  static propTypes = {
    name: PropTypes.string,
    avatarSrc: PropTypes.string,
    date: PropTypes.string,
    classes: PropTypes.object,
  }

  render () {
    const {
      name,
      avatarSrc,
      date,
      classes,
    } = this.props
    return (
      <Grid
        container
        className={classes.root}
      >
        <Grid item>
          <Avatar
            alt={name}
            src={avatarSrc}
          />
        </Grid>
        <Grid
          item
          className={classes.content}
        >
          <Typography
            classes={{
              root: classes.small
            }}
          >
            {name}
          </Typography>
          <Typography
            classes={{
              root: classes.date
            }}
          >
            {moment(date).fromNow()}
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(AuthorAvatar)
