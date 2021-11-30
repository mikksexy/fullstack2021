import React from 'react'

const Header = (props) => {
    const { course } = props
    return (
      <div>
        <h2>{course.name}</h2>
      </div>
    )
  }
  
  const Part = (props) => {
    const { part } = props
    return (
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    )
  }
  
  const Content = (props) => {
    const { course } = props
    const elements = []
    for (let index = 0; index < course.parts.length; index++) {
      elements.push(<Part part={course.parts[index]} />)
    }
    return (
      <div>
        {elements}
      </div>
    )
  }
  
  const Total = (props) => {
    const { course } = props
    const initialValue = 0
    const total = course.parts.reduce( (previousValue, currentValue) => previousValue + currentValue.exercises, initialValue)
    return (
      <div>
        <b>
          Number of exercises {total}
        </b>
      </div>
    )
  }
  
  
  const Course = (props) => {
    const { courses } = props
    const elements = []
    for (let index = 0; index < courses.length; index++) {
      elements.push(<Header course={courses[index]} />)
      elements.push(<Content course={courses[index]} />)
      elements.push(<Total course={courses[index]} />)
    }
    return (
      <div>
        {elements}
      </div>
    )
  }

export default Course