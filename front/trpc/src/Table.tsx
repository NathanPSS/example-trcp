
interface Iprops {
    padding :number
    users : any[]
    removeUser: any
}
export function Table(props :Iprops) {
    return (
        <div style={{padding: props.padding, marginLeft: 500}}>
        <table className="table table-striped"><thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nomes</th>
          <th scope="col">Emails</th>

        </tr>
      </thead>
        <tbody>
        {props.users.map((element) =>{
            return (
            <>
            <tr key={element.id}>
            <th scope="row">{element.id}</th>
                <td>{element.nome}</td>
                <td>{element.email}</td>
                <td><button type="button" className="btn btn-danger" onClick={() =>{
                    props.removeUser(element.id)
                }}>Deletar</button></td>
              </tr>
              </>
            )
        })}
      </tbody>
    </table>
    </div>
    )
}