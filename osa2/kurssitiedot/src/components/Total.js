const Total = ({parts}) => {
    const total = parts.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.exercises;
      }, 0);
    return (
        <div>
            <p>Number of exercises {total} </p>
        </div>
    )

}
export default Total