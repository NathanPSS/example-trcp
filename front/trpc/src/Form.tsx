

interface IProps {
  padding :number
  addUser: any
}



export function Form(props :IProps) {
  return (
  <div style={{padding: props.padding, marginRight: 300}}> 
  <form>
  <div className="mb-3">
    <label htmlFor="nome" className="form-label">Nome</label>
    <input className="form-control" id="nome"></input>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input className="form-control" id="email"></input>
  </div>
</form>
 <button className="btn btn-primary" onClick={props.addUser}>Adicionar</button>
</div>
  )
}
