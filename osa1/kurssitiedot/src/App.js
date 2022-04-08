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
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}
const Header = (headerContent) => {
  return (
    <h1>{headerContent.course}</h1>
  )
}
const Content = (parts) => {
  return (
    <div>
      <Part name={parts.parts[0].name} exercise={parts.parts[0].exercises} />
      <Part name={parts.parts[1].name} exercise={parts.parts[1].exercises} />
      <Part name={parts.parts[2].name} exercise={parts.parts[2].exercises} />
    </div>
  )
}
const Total = (parts) => {
  return (
    <p>Number of exercises {parts.parts[0].exercises + parts.parts[1].exercises + parts.parts[2].exercises}</p>
  )

}

const Part = (part) => {
  return (
    <p>
      {part.name} {part.exercise}
    </p>
  )
}

export default App