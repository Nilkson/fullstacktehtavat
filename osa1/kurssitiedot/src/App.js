const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div>
      <Header course={course} />
      <Content content1={part1} content2={part2} content3={part3} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}
const Content = (props) => {
  console.log("testi 1 " + props.content1.name);

  return (
    <div>
      <Part part={props.content1.name} exercises={props.content1.exercises} />
      <Part part={props.content2.name} exercises={props.content2.exercises} />
      <Part part={props.content3.name} exercises={props.content3.exercises} />
    </div>
  )
}
const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )

}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

export default App