
interface ITech{
  tech:string,
  tipo:string
}


interface Itable{
  data?: ITech[]
}


const Table = ({data}: Itable) => {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Tecnologia</th>
            <th scope="col">Tipo</th>
          </tr>
        </thead>
        <tbody>
        {
          data!== undefined && data.map((tech,index)=>{
            return(
              <tr key={index}>
                <td>{tech.tech}</td>
                <td>{tech.tipo}</td>
              </tr>
            )
          } )
        }
        </tbody>
      </table>
    );
  }
  
  export default Table;
  