import React from 'react'
import { Link } from 'gatsby'
import './Footer.css'

export default () => (
  <div>
    <footer className="footer">
      <div className="container taCenter">
        <span>עמותת יהל ע“ר 580487569 טל. 054-4671019</span>
        <a class="social-link" href="https://www.facebook.com/Foodallergy.il/"><img src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&amp;h=512"></img></a>
        <Link to="/toc/">תקנון האתר</Link>
      </div>
    </footer>
  </div>
)
