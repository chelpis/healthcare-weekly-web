import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Grid from 'material-ui/Grid'
import moment from 'moment'

export default class AuthorAvatar extends Component {
  static propTypes = {
    name: PropTypes.string,
    avatarSrc: PropTypes.string,
    date: PropTypes.string,
  }

  render () {
    const {
      name,
      avatarSrc,
      date
    } = this.props
    return (
      <Grid container>
        <Grid item>
          <Avatar
            alt={name}
            src={avatarSrc}
          />
        </Grid>
        <Grid item>
          <Typography>
            {name}
          </Typography>
          <Typography>
            {moment(date).fromNow()}
          </Typography>
        </Grid>
      </Grid>
    )
  }
}
