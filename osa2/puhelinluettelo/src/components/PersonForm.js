const PersonForm = (props) =>{
    const {onClick, numberValue, nameValue, onChangeNumber, onChangeName} = props
    return(
        <form>
        <div>
          name: <input value={nameValue} onChange={onChangeName} />
        </div>
        <div>
          number: <input value={numberValue} onChange={onChangeNumber} />
        </div>
        <div>
          <button onClick={onClick} type="submit">add</button>
        </div>
      </form>
    )
}
export default PersonForm