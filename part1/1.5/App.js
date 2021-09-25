import React from 'react'

const App = () => {
 const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </div>
  )
}

export default App

const Header = (props) => {
  return (
    <div>
        <h1>{props.course['name']}</h1>
    </div>
  )
}

const Content = (props) => {
    console.log(props.course['parts'])
    const parts = props.course['parts']
  return (
     <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )
}


const Part = (props) => {
  return (
    <div>
        <p>{props.part['name']} {props.part['exercises']}</p>
    </div>
  )
}

const Total = (props) => {
    const parts = props.course['parts']
    let sum = 0
    for (let i = 0; i < 3; i++) {
       sum += parts[i]['exercises'];}
  return (
    <div>
        <p>Number of exercises {sum}</p>
    </div>
  )
}