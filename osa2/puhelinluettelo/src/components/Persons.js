const Persons = ({personstoShow}) => {
    return (
        <ul>
        {personstoShow.map(person => <li key={person.name}> {person.name} {person.number}</li>)}
      </ul>
    )
}
export default Persons