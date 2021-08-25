import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import Tabbed from '../components/Tabbed'
import Products from '../components/Products'
import MakeSign from '../components/MakeSign'

// Export Template for use in CMS preview
export const DefaultPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  className,
  body,
  tabs,
  products,
  showSign
}) => (
  <main className={`DefaultPage ${className}`}>
    <PageHeader
      large={className === 'landing'}
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    <section className="section">
      <div className="container">
        <Content source={body} />
        {tabs && (
          <Tabbed items={tabs} />
        )}
        {products && <Products items={products} />}
        {showSign && <MakeSign/>}
      </div>
    </section>
  </main>
)

const DefaultPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <DefaultPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)
export default DefaultPage

export const pageQuery = graphql`
  query DefaultPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
        className
        showSign
        tabs {
          title
          description
        }
        products {
          productImages {
            imageUrl
          }
          title
          description
          price
          link
          linkText
        }
      }
    }
  }
`
