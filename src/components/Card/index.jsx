export function Card(props) {
  return (
    <div className="card bg-light mb-3" style={{ width: '90%'}}>
      <h3 className="card-header">{ props.title }</h3>
      
      <div className="card-body">
        { props.children }
      </div>
    </div>
  );
}