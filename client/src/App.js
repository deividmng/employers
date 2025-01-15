import './App.css';
import { useState } from "react";
import  Axios  from "axios";


function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [year, setYear] = useState();
  const [id, setId] = useState();

  /// this is the button to edit 
  const[editar,setEditar] = useState(false)

  const[empleadosList,setEmpleados] = useState([])



  
  const add = () => {
    // Mostrar en consola los datos que se van a enviar
    console.log(nombre, edad, pais, cargo, year);

    Axios.post("http://localhost:5000/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: year
  })
  .then(response => {
    getEmpleados();

      console.log("Empleado registrado:", response.data);
 

  })
  .catch(error => {
      console.error("Error al registrar empleado:", error);
  });
  

  };
//* function the get the empeleados 
  const getEmpleados = () => {
    // Cambiar de POST a GET 
    //! the error was on the localhost that it was in 3001 
    Axios.get("http://localhost:5000/empleados")
      .then((response) => {
        setEmpleados(response.data); // in case in goes well 
      })
      .catch((error) => {
        console.error("Error al obtener empleados:", error);
      });
  };
  
  getEmpleados();

  //* function to addate
  const editarEmpleado = (val) => {
    setEditar(true);

    setId(val.id);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setYear(val.anios);
    
  }

  
  // const mostrarDatos = () => {
  //   // here is the button, to add the people 
  //     console.log(nombre,edad,pais,cargo,year)
  //   }
  return (
    <div className="App">
      <h1>Formulario</h1>
      <div className="datos">
        <label>
          Nombre:
              {/*with onChange it target each time it happen any change 
                (event) it the atributo .value acces to the value 
              */}
          <input
          value={nombre}
            type="text"
            onChange={(event) => {
              setNombre(event.target.value);
              
            }}
          />
        </label>
        <br />
        <label>
          Edad:
          <input
          value={edad}
            type="number"
            onChange={(event) => {
              setEdad(Number(event.target.value));
            }}
          />
        </label>
        <br />
        <label>
          País:
          <input
          value={pais}
            type="text"
            onChange={(event) => {
              setPais(event.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Cargo:
          <input
          value={cargo}
            type="text"
            onChange={(event) => {
              setCargo(event.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Año:
          <input
            value={year}
            type="number"
            onChange={(event) => {
              setYear(Number(event.target.value));
            }}
          />
        </label>
        <br />
        <button onClick={add} >
          Add
        </button>
      </div>
      <div className='lista'>
      {/* <button onClick={getEmpleados} >
          Listar
        </button> */}
      </div>

      <div className="listaDatos">
  <table className="tablaEmpleados">
    <thead>
      <tr>
        <th>id</th>
        <th>Nombre</th>
        <th>Edad</th>
        <th>País</th>
        <th>Cargo</th>
        <th>Años</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        empleadosList.map((val, key) => (
          <tr key={key}>
            <td>{val.id}</td>
            <td>{val.nombre}</td>
            <td>{val.edad}</td>
            <td>{val.pais}</td>
            <td>{val.cargo}</td>
            <td>{val.anios}</td>
            <td>
            <div className='buttosAct'>
            <button className='edict' onClick={()=> {
              editarEmpleado(val);
            }} >
          editar
        </button>
            <button className='delete' onClick={add} >
          Add
        </button>
            </div>
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
</div>


    </div>
  );
}

export default App;
