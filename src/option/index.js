import {Component} from 'react'

class Option extends Component {
  onClickTag = () => {
    const {tagFilter, optionDetails} = this.props
    const {displayText} = optionDetails
    tagFilter(displayText)
  }

  render() {
    const {optionDetails} = this.props
    const {displayText} = optionDetails
    return (
      <li>
        <button onClick={this.onClickTag} type="button">
          {displayText}
        </button>
      </li>
    )
  }
}

export default Option
