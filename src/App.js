import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Option from './option'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    taskText: '',
    tagText: 'Health',
    tasksList: [],
    isFilterActive: false,
    filterList: [],
  }

  onTypeTask = event => {
    this.setState({
      taskText: event.target.value,
    })
  }

  onSelectTag = event => {
    this.setState({
      tagText: event.target.value,
    })
  }

  onAddTask = event => {
    event.preventDefault()
    const {tasksList, taskText, tagText} = this.state
    const updatedTasksList = [...tasksList, {taskText, tagText, id: uuidv4()}]

    console.log(updatedTasksList)

    this.setState({
      tasksList: updatedTasksList,
      taskText: '',
      tagText: '',
    })
  }

  filterTag = optionID => {
    const {tasksList} = this.state
    const updatedFilteredList = tasksList.filter(
      eachItem => eachItem.tagText === optionID,
    )

    console.log(updatedFilteredList)
    console.log(optionID)

    this.setState(prevState => ({
      isFilterActive: !prevState.isFilterActive,
      filterList: updatedFilteredList,
    }))
  }

  render() {
    const {tasksList, isFilterActive, filterList, tagText} = this.state
    return (
      <div className="appContainer">
        <form onSubmit={this.onAddTask} className="leftContainer">
          <h1>Create a Task!</h1>
          <label htmlFor="task">Task</label>
          <input
            placeholder="Enter the task here"
            onChange={this.onTypeTask}
            type="text"
            id="task"
          />
          <label htmlFor="tag">Tags</label>
          <select value={tagText} onChange={this.onSelectTag} id="tag">
            {tagsList.map(eachItem => (
              <option key={eachItem.optionId} value={eachItem.displayText}>
                {eachItem.displayText}
              </option>
            ))}
          </select>
          <button type="submit">Add Task</button>
        </form>
        <div className="rightContainer">
          <h1>Tags</h1>
          <ul>
            {tagsList.map(eachItem => (
              <Option
                key={eachItem.optionId}
                optionDetails={eachItem}
                tagFilter={this.filterTag}
              />
            ))}
          </ul>
          <h1>Tasks</h1>
          {tasksList.length === 0 ? (
            <p>No Tasks Added Yet</p>
          ) : (
            <ul>
              {isFilterActive
                ? filterList.map(eachItem => (
                    <li id={eachItem.id}>
                      <p>{eachItem.taskText}</p>
                      <p>{eachItem.tagText}</p>
                    </li>
                  ))
                : tasksList.map(eachItem => (
                    <li id={eachItem.id}>
                      <p>{eachItem.taskText}</p>
                      <p>{eachItem.tagText}</p>
                    </li>
                  ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
