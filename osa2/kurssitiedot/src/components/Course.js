import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({course}) => {
    console.log("course tulostus", course);
    console.log("kurssin nimi course komponentissa ", course.name);
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </div>
    )

}
export default Course