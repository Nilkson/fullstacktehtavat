import Part from './Part'
const Content = ({parts}) => {
    console.log("kurssin palikat ", parts);
    parts.forEach(element => {
        console.log("käydää läpi kurssilistaa ", element);
    });
    return (
      <div>
          {parts.map(part =>
            <Part key={part.id} name={part.name} exercise={part.exercises} />
            )}
      </div>
    )
  }

  export default Content