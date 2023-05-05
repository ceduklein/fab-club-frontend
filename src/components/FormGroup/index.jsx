export function FormGroup(props) {
  return (
    <div className="form-group">
      <label htmlFor={ props.for } className="form-label mt-4">{ props.label }</label>
      <input type={ props.type} 
        className="form-control"
        id={ props.id } aria-describedby="emailHelp"
        placeholder={ props.placeholder }
        value={props.value}
        onChange={props.onChange} 
      />
    </div>
  )
}