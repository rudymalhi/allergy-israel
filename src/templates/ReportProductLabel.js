import React from 'react'
import { graphql } from 'gatsby'
import JotformEmbed from 'react-jotform-embed';

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
// import GoogleMap from '../components/GoogleMap'
import Layout from '../components/Layout'
import './ReportProductLabel.css'

// Export Template for use in CMS preview
export const ReportProductLabelTemplate = ({
  body,
  title,
  subtitle,
  featuredImage,
  address,
  phone,
  email
}) => (
  <main className="Contact">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    <JotformEmbed src="https://form.jotform.com/211222815125039"/>
  </main>
)

const ReportProductLabel = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ReportProductLabelTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ReportProductLabel

export const pageQuery = graphql`
  query ReportProductLabel($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        phone
        email
      }
    }
  }
`
