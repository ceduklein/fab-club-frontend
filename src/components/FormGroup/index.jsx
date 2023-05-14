export function FormGroup(props) {
  return (
    <div className="form-group" style={{marginTop: '-10px'}}>
      <label htmlFor={ props.for } className="form-label mt-4">{ props.label }</label>
      <input type={ props.type} 
        className="form-control"
        id={ props.id } aria-describedby="emailHelp"
        placeholder={ props.placeholder }
        value={props.value}
        onChange={props.onChange} 
        style={{marginTop:'-3px'}}
        disabled={props.disabled}
      />
    </div>
  )
}