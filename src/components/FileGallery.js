import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Marked from 'react-markdown'
import { graphql } from 'gatsby'

import './FileGallery.css'

export const query = graphql`
  fragment FileGallery on MarkdownRemark {
    frontmatter {
      files {
        file
        description
        title
        thumbnail
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
    this.setState({ isOpen, index: (typeof index === 'undefined') ? 0 : index })
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
                  key={file.title}
                  className="FileGallery--Item"
                  href={file.file}
                  target="_blank"
                  rel="noreferrer"
                >
                  {file.title && <h3 class="FileGallery--ItemTitle">{file.title}</h3>}
                  {file.thumbnail && <img alt={file.title} class="FileGallery--ItemThumbnail" src={file.thumbnail}/>}
                  {file.description && <Marked source={file.description}/>}
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
