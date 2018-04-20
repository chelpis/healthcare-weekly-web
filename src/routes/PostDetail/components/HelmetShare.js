import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import striptags from 'striptags'

import { BRAND_NAME } from '../../../constants/config'

export default class HelmetShare extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    content: PropTypes.string,
    cover: PropTypes.string,
  }

  render () {
    const {
      title,
      author,
      content,
      cover,
    } = this.props
    const siteTitle = `${BRAND_NAME} - ${title}`
    const description = striptags(content).slice(0, 125).replace(/\n/g, '')
    return (
      <Helmet>
        {/* <!-- Place this data between the <head> tags of your website --> */}
        <title>
          {siteTitle}
        </title>
        <meta name='description' content='Page description. No longer than 155 characters.' />

        {/* <!-- Twitter Card data --> */}
        {/* <meta name='twitter:card' content='summary' /> */}
        {/* <meta name='twitter:site' content='@publisher_handle' /> */}
        <meta name='twitter:title' content={siteTitle} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:creator' content={author} />

        {/* <-- Twitter Summary card images must be at least 120x120px --> */}
        <meta name='twitter:image' content={cover} />

        {/* <!-- Open Graph data --> */}
        <meta property='og:title' content={siteTitle} />
        <meta property='og:type' content='article' />
        {/* <meta property='og:url' content='http://www.example.com/' /> */}
        <meta property='og:image' content={cover} />
        <meta property='og:description' content={description} />
        <meta property='og:site_name' content={BRAND_NAME} />
      </Helmet>
    )
  }
}
