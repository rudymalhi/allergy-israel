import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from './BlogSearch'
import './PostCategoriesNav.css'

const PostCategoriesNav = ({ categories, enableSearch, location }) => (
  <div className="PostCategoriesNav">
    <Link className="NavLink" exact="true" to={`/blog/`}>
    כל המאמרים
    </Link>
    {categories.map((category, index) => (
      <Link
        exact="true"
        className={`NavLink ${decodeURIComponent(location.pathname.split('/')[2]) === category.slug.split('/')[2] ? 'active' : ''}`}
        key={category.title + index}
        to={category.slug}
      >
        {category.title}
      </Link>
    ))}

    {enableSearch && <BlogSearch />}
  </div>
)

export default PostCategoriesNav
