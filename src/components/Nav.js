import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'
import Logo from './Logo'

import './Nav.css'

export class Navigation extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false
  }

  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    })

  render() {
    const { active } = this.state,
      { subNav } = this.props,
      NavLink = ({ to, className, children, ...props }) => (
        <Link
          to={to}
          className={`NavLink ${
            to === this.state.currentPath ? 'active' : ''
          } ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <Link to="/" onClick={this.handleLinkClick}>
            <Logo />
          </Link>
          <div className="Nav--Links">
            <NavLink to="/about/">אודות</NavLink>
            <div
              className={`Nav--Group ${
                this.state.activeSubNav === 'posts' ? 'active' : ''
              }`}
            >
              <span
                className={`NavLink Nav--GroupParent ${
                  this.props.location.pathname.includes('posts') ||
                  this.props.location.pathname.includes('blog') ||
                  this.props.location.pathname.includes('post-categories')
                    ? 'active'
                    : ''
                }`}
                onClick={() => this.toggleSubNav('posts')}
              >
                מידע ומאמרים
                <div className="Nav--GroupLinks">
                  {subNav.posts.map((link, index) => (
                    <NavLink
                      to={link.slug}
                      key={'posts-subnav-link-' + index}
                      className="Nav--GroupLink"
                    >
                      {link.title}
                    </NavLink>
                  ))}
                </div>
              </span>
            </div>
            <NavLink to="/חנות/">חנות</NavLink>
            <a
              className="NavLink"
              target="_blank"
              href="https://secure.cardcom.solutions/e/xSwQ"
            >
              הצטרפות לעמותה
            </a>
            <NavLink to="/contact/">צור קשר</NavLink>
            <div
              className={`Nav--Group ${
                this.state.activeSubNav === 'recall' ? 'active' : ''
              }`}
            >
              <span
                className={`NavLink Nav--GroupParent ${
                  this.props.location.pathname.includes('report')
                    ? 'active'
                    : ''
                }`}
                onClick={() => this.toggleSubNav('recall')}
              >
                ריקול ודווח
                <div className="Nav--GroupLinks">
                  <a
                    className="NavLink"
                    target="_blank"
                    href="https://www.gov.il/he/departments/news/?OfficeId=104cb0f4-d65a-4692-b590-94af928c19c0&topic=3f9fe17e-8c90-4328-a968-b6be5f3c14da&keywords=אלרג"
                  >
                    הודעות ריקול
                  </a>
                  <NavLink to="/report/">דווח סימון לקוי</NavLink>
                </div>
              </span>
            </div>
            <NavLink to="/sign/">שלט לגן/כיתה</NavLink>
          </div>
          <button
            className="Button-blank Nav--MenuButton"
            onClick={this.handleMenuToggle}
          >
            {active ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)
