import React, { Component } from 'react'
import moment from 'moment'
import ax from 'axios'
import ThList from 'react-icons/lib/ti/th-list'
import ThSmall from 'react-icons/lib/ti/th-small'

import { Select } from 'antd'
const Option = Select.Option

class search591 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sorting: 'refreshtime', // refreshtime, browsenum,
      listView: 'detail', // detail, icon
      houseData: [],
    }
  }
  componentDidMount() {
    const url = 'http://localhost:8888/api/search591'
    this.fetchHouseData(url)
    setInterval(this.fetchHouseData, 60000)
  }

  fetchHouseData = () => {
    const url = 'http://localhost:8888/api/search591'
    ax
      .get(url)
      .then(response => {
        this.setState({
          houseData: response.data,
        })
      })
      .catch(error => {
        console.log('error:', error)
      })
  }

  onSelectChange = value => {
    this.setState({
      sorting: value,
    })
  }

  onChangeListView = listView => {
    this.setState({
      listView,
    })
  }

  render() {
    const { listView } = this.state
    return (
      <div>
        <div className="toolbar-wrap">
          <Select defaultValue="refreshtime" onChange={this.onSelectChange}>
            <Option value="refreshtime">Refresh Time</Option>
            <Option value="browsenum">Most Views</Option>
          </Select>
          <div className="view-option">
            <ThList
              className={`${listView === 'detail' ? 'active' : ''}`}
              onClick={() => this.onChangeListView('detail')}
            />
            <ThSmall
              className={`${listView === 'icon' ? 'active' : ''}`}
              onClick={() => this.onChangeListView('icon')}
            />
          </div>
        </div>

        <section
          className={`item-house-wrap ${this.state.listView === 'icon'
            ? 'sort-by-refresh'
            : ''}`}
        >
          {this.state.houseData
            .sort((a, b) => b[this.state.sorting] - a[this.state.sorting])
            .map((item, idx) => {
              return (
                <div className={`item-house`} key={`house-${idx}`}>
                  <a
                    href={`https://rent.591.com.tw/rent-detail-${item.houseid}.html`}
                    target="_blank"
                  >
                    <img
                      src={`${item.cover}`}
                      className="house-coverImg"
                      alt=""
                    />
                  </a>

                  <span className="column-address">
                    {item.address}
                  </span>
                  <span className="column-refreshtime">
                    {moment(item.refreshtime * 1000).fromNow()}
                  </span>
                  <span className="column-views">
                    瀏覽次數:{item.browsenum}
                  </span>
                  {/*
                    <span>價錢: {item.price}</span>
                  */}
                </div>
              )
            })}
        </section>
      </div>
    )
  }
}

export default search591
