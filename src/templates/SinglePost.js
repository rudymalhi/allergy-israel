import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Layout from '../components/Layout'
import Accordion from '../components/Accordion'
import FileGallery from '../components/FileGallery'
import './SinglePost.css'

export const SinglePostTemplate = ({
  title,
  titleLink,
  date,
  body,
  accordion,
  files,
  nextPostURL,
  prevPostURL,
  categories = []
}) => (
  <main>
    <article
      className="SinglePost section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="container skinny">
        <a className="SinglePost--BackButton" href="javascript:history.back()">
          <ChevronLeft /> חזרה
        </a>
        <div className="SinglePost--Content relative">
          <div className="SinglePost--Meta">
            {date && (
              <time
                className="SinglePost--Meta--Date"
                itemProp="dateCreated pubdate datePublished"
                date={date}
              >
                {date}
              </time>
            )}
            {categories && (
              <Fragment>
                <span>|</span>
                {categories.map((cat, index) => (
                  <span
                    key={cat.category}
                    className="SinglePost--Meta--Category"
                  >
                    {cat.category}
                    {/* Add a comma on all but last category */}
                    {index !== categories.length - 1 ? ',' : ''}
                  </span>
                ))}
              </Fragment>
            )}
          </div>

          {title && !titleLink && (
            <h1 className="SinglePost--Title" itemProp="title">
              {title}
            </h1>
          )}
          {titleLink && (
            <a className="SinglePost--TitleLink" href={titleLink} target="_blank">
              <h1 className="SinglePost--Title" itemProp="title">
                {title}
              </h1>
            </a>
          )}

          <div className="SinglePost--InnerContent">
            <Content source={body} linkTarget="_blank"/>
            {accordion && (
              <Accordion items={accordion} />
            )}
          </div>
          {files && (
              <FileGallery files={files} />
            )}

          <div className="SinglePost--Pagination">
            {prevPostURL && (
              <Link
                className="SinglePost--Pagination--Link prev"
                to={prevPostURL}
              >
                מאמר קודם
              </Link>
            )}
            {nextPostURL && (
              <Link
                className="SinglePost--Pagination--Link next"
                to={nextPostURL}
              >
                מאמר הבא
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  </main>
)

// Export Default SinglePost for front-end
const SinglePost = ({ data: { post, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
    >
      <SinglePostTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SinglePost

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SinglePost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        titleLink
        template
        subtitle
        accordion {
          title
          description
          background
        }
        files {
          title
          description
          file
          thumbnail
        }
        date(formatString: "MMMM Do, YYYY")
        categories {
          category
        }
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
