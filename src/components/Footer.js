import React from 'react'
import { Link } from 'gatsby'
import './Footer.css'

export default () => (
  <div>
    <footer className="footer">
      <div className="container taCenter">
        <span>עמותת יהל ע“ר 580487569 טל. 054-4671019</span>
        <a
          className="social-link"
          href="https://www.facebook.com/Foodallergy.il/"
        >
          <img src="/images/facebook.png"></img>
        </a>
        <Link to="/toc/">תקנון האתר</Link>
      </div>
    </footer>
  </div>
)
