'use strict';
import React, { Component } from 'react';
import {render} from 'react-dom';
import { Profiler } from './profiler.js'
import * as hlp from './helpers.js'

class Level extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="level" style={{top: "0px"}} className="level"></div>
    )
  }
}

class Histogram extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      level: 0
    }
    this.handleHover = this.handleHover.bind(this)
    this.handleLegendHover = this.handleLegendHover.bind(this)
    this.handleLegendLeave = this.handleLegendLeave.bind(this)
    this.chart = null
    this.level = null
  }

  handleHover(e) {
    const top = this.chart.getBoundingClientRect().top
    let y = e.clientY - top - 1
    this.level.style.top = y + "px"
  }

  handleLegendHover(e) {
    if (e.target.classList.contains("all-letters")) {
      document.querySelectorAll(".hist-bar>.first-letters").forEach((el) => {
        el.classList.add("dim")
      })
    } else if (e.target.classList.contains("first-letters")) {
      document.querySelectorAll(".hist-bar>.all-letters").forEach((el) => {
        el.classList.add("dim")
      })
    }
  }
  handleLegendLeave(e) {
    if (e.target.classList.contains("all-letters")) {
      document.querySelectorAll(".hist-bar>.first-letters").forEach((el) => {
        el.classList.remove("dim")
      })
    } else if (e.target.classList.contains("first-letters")) {
      document.querySelectorAll(".hist-bar>.all-letters").forEach((el) => {
        el.classList.remove("dim")
      })
    }
  }

  componentDidMount() {
    this.chart = document.getElementById('chart')
    this.level = document.getElementById('level')
  }

  render() {
    const allLetters = this.props.data.allLetters
    const firstLetters = this.props.data.firstLetters
    const maxAL = allLetters["max"]
    const maxFL = firstLetters["max"]
    const chart = hlp.abc.map((l) =>
      <div className="hist-bar" key={l}>
        <div className="all-letters" title={allLetters[l]} style={{height: + allLetters[l]/maxAL*100 + '%'}}></div>
        <div className="first-letters" title={firstLetters[l]} style={{height: + firstLetters[l]/maxFL*100 + '%'}}></div>
      </div>
    )
    const axis = hlp.abc.map((l) =>
      <span key={l}>{l}</span>
    )
    return (hlp.isEmpty(allLetters) ? (
      <div className="display">
        <div className="no-data">No data. Add some words to analyse</div>
      </div>
      ) : (
        <div className="display">
          <div className="legend">
            <div onMouseOver={this.handleLegendHover} onMouseLeave={this.handleLegendLeave} className="color-sample all-letters"></div><span>— all letters</span>
            <div onMouseOver={this.handleLegendHover} onMouseLeave={this.handleLegendLeave} className="color-sample first-letters"></div><span>— first letters</span>
          </div>
          <div onMouseMove={this.handleHover} className="letters-chart" id="chart">
            {chart}
            <Level />
          </div>
          <div className="axis">
            {axis}
          </div>
        </div>
      )
    )
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.inputValue = ""
    this.state = {
      inputValue: this.props.raw
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleSubmit() {
    this.props.renderWords(this.state.inputValue)
  }

  render() {
    const shouldDisable = this.state.inputValue.trim().length == 0
    return (
      <div className="display form">
        <textarea onChange={this.handleChange} defaultValue={this.state.inputValue}></textarea>
        <button disabled={shouldDisable} onClick={this.handleSubmit}>
          Render
        </button>
      </div>
    )
  }
}

class TabBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.props.onClick(e.target.dataset.tabName)
  }

  render() {
    const active = this.props.currentTabName
    const tabs = this.props.tabs.map((tabName) => {
      let className = "tab"
      let onClick = null

      if (tabName == active) {
        className += " active"
      } else {
        onClick = this.handleClick
      }

      return <div
        onClick={onClick}
        data-tab-name={tabName}
        key={tabName}
        className={className}>
          {tabName[0].toUpperCase() + tabName.slice(1)}
        </div>
    })

    return (
      <div className="tab-bar" id="tab-bar">
        {tabs}
      </div>
    )
  }
}

export class MainDialog extends React.Component {
  constructor(props) {
    super(props)
    this.switchTabs = this.switchTabs.bind(this)
    this.renderWords = this.renderWords.bind(this)
    this.tabs = ["words", "chart"]
    this.state = {
      currentTabName: this.tabs[0],
      raw: "Counts first letters of words and all letters in text and draws their distribution. Initially made to analyse names of subscriptions on Reddit (why not?) and practice some React, but actually works with any latin text with numbers",
      data: {
        allLetters: {},
        firstLetters: {}
      },
    }
  }

  switchTabs(clickedTab) {
    const targetIndex = this.tabs.indexOf(clickedTab)
    this.setState({currentTabName: this.tabs[targetIndex]})
  }

  renderWords(words) {
    const results = new Profiler(words)
    this.setState({
      raw: words,
      data: results.data,
      currentTabName: this.tabs[1]
    })
  }

  componentDidMount() {
    if (this.state.raw !== "") {
      this.renderWords(this.state.raw)
    }
  }

  render() {
      return (
        <div>
          <TabBar tabs={this.tabs} onClick={this.switchTabs} currentTabName={this.state.currentTabName} />
          {this.state.currentTabName == this.tabs[0] ? (
            <Form renderWords={this.renderWords} raw={this.state.raw} data={this.state.data} />
          ) : (
            <Histogram data={this.state.data} />
          )}
        </div>
      )
  }
}


let lettersContainer = document.querySelector('#letters-container')
if (lettersContainer) {
    render(<MainDialog />, lettersContainer);
}
