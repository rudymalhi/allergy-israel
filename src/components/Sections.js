import React from 'react'
import Marked from 'react-markdown'
import _kebabCase from 'lodash/kebabCase'
import './Sections.css'

export default class Sections extends React.Component {
  static defaultProps = {
    items: [],
    className: ''
  }

  render() {
    const { items, className } = this.props
    return (
      <div className={`Sections ${className}`}>
        {!!items &&
          items.map((item, index) => (
            <section key={index}>
              {!!item.title && (<h1>{item.title}</h1>)}
              <div className="elements-wrapper">
                {!!item.elements &&
                  item.elements.map((element, idx) => (
                  <a key={idx} className={!element.title && !element.content ? 'empty-element' : ''} href={element.link}>{!!element.title && (<h3>{element.title}</h3>)}<Marked source={element.content}/></a>
                  ))
                }
              </div>
            </section>
          ))}
      </div>
    )
  }
}
