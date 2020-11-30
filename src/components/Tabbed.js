import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Marked from 'react-markdown'
import './Tabbed.css'

export default class Tabbed extends React.Component {
  static defaultProps = {
    items: [],
    className: ''
  }

  handleClick = event => event.target.classList.toggle('active')

  render() {
    const { items } = this.props
    return (
      <Tabs>
        <TabList>
          {!!items && items.map((item) => (
            <Tab>{item.title}</Tab>
          ))}
        </TabList>
        {!!items && items.map((item) => (
        <TabPanel>
          <Marked source={item.description}/>
        </TabPanel>
        ))}
      </Tabs>
    )
  }
}
