import React from 'react'
import Marked from 'react-markdown'
import Image from './Image'
// import './Products.css'

export default class Products extends React.Component {
  static defaultProps = {
    items: [],
    className: ''
  }

  render() {
    const { items } = this.props
    return (
      <table className="store">
        {!!items && items.map((item) => (
        <tr>
          <td className={(item.productImages && item.productImages.length > 1) ? "double" : "single"}>
            {!!item.productImages && item.productImages.map((img) => (
              <Image src={img.imageUrl} />
            ))}
          </td>
          <td>
            <h2>{item.title}</h2>
            <Marked source={item.description}/>
            <p><b>{item.price && `₪${item.price}`} <a href={item.link} target="_blank">{item.linkText}</a></b></p>
          </td>
        </tr>
        ))}
      </table>
    )
  }
}
