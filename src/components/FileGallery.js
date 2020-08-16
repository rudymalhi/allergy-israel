import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import './FileGallery.css'

export const query = graphql`
  fragment FileGallery on MarkdownRemark {
    frontmatter {
      files {
        file
        description
        title
      }
    }
  }
`

export default class FileGallery extends Component {
  state = {
    loaded: false,
    isOpen: false,
    index: 0
  }

  isOpen(isOpen, index) {
    if (typeof index === 'undefined') index = 0
    this.setState({ isOpen, index })
  }

  render() {
    const { files } = this.props
    return (
      <Fragment>
        {files &&
          files.length > 0 && (
            <div className="FileGallery">
              {files.map((file, index) => (
                <a
                  className="FileGallery--Item"
                  href={file.file}
                  target="_blank"
                >
                  {file.title && <h3 class="FileGallery--ItemTitle">{file.title}</h3>}
                  {file.description && <p class="FileGallery--ItemDescription">{file.description}</p>}
                </a>
              ))}
            </div>
          )}
      </Fragment>
    )
  }
}

FileGallery.propTypes = {
  files: PropTypes.array.isRequired
}