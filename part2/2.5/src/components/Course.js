import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
    const parts = course.parts
    const exercisesList = parts.map((part) => part.exercises)
    const total = exercisesList.reduce((s, p) => {
        console.log('what is happening', s, p)
        return s+p   })

  return(
    <em>Number of exercises {total}</em>
  )
}

const Part = (props) => {
    console.log("part receive", props)
  return (
    <p id={props.part.id}>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
    const parts = course.parts
  return (
    <div>
      {parts.map((part) =>
          <Part key={part.id} part={part} /> )}

    </div>
  )
}

const Course = ({courses}) => {
    return (
    <div>
        {courses.map((course) =>
            <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
            </>)}
    </div>
    )}

export default Course