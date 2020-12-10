import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import Sections from '../components/Sections'
import './HomePage.css'
import Popup from '../components/Popup'

let showPopup = 0;

// Export Template for use in CMS preview
export const HomePageTemplate = ({ title, subtitle, featuredImage, sections, body }) => (
  <main className="Home">
    <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    {sections && (
      <Sections items={sections} />
    )}

    <Content source={body} />
  </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    {!!page.frontmatter.popup && !showPopup++ && (
      <Popup showPopup={true}>
        {page.frontmatter.popup}
      </Popup>
    )}
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
        popup
        sections {
          title
          elements {
            title
            content
            link
          }
        }
      }
    }
  }
`
