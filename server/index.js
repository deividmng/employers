const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors")
// callin to listenning on port N 
 app.use(cors());
 app.use(express.json())

 const PORT = 5000; 

// crating the connection at sql
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"empleados_crud"
})

// saving the data with the mettod post the root it  gonna call on create , req = solicitud , res = respond 
app.post("http://localhost:5000/create", (req, res) => {
    const { nombre, edad, pais, cargo, anios } = req.body;

    const query = 'INSERT INTO empleados (nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [nombre, edad, pais, cargo, anios], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al registrar el empleado");
        } else {
            res.send("Empleado registrado exitosamente");
        }
    });
});

//! to get the data fro the sql 
app.get("http://localhost:5000/empleados", (req, res) => {
    const query = 'SELECT * FROM empleados'; // Asegúrate de que la consulta esté bien
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al obtener empleados");
      } else {
        res.send(result);
      }
    });
  });
  
//! here it goes the actualizar 

app.put("http://localhost:5000/update", (req, res) => {
    const { id, nombre, edad, pais, cargo, anios } = req.body;
  
    //! worng way   const query = 'UPDATE empleados SET (id, nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?) WHERE id = ?';
    const query = `UPDATE empleados 
                   SET nombre = ?, edad = ?, pais = ?, cargo = ?, anios = ? 
                   WHERE id = ?`;
  
    db.query(query, [nombre, edad, pais, cargo, anios, id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al actualizar el empleado");
      } else {
        res.send("Empleado actualizado exitosamente");
      }
    });
  });
  


/// to be sure is connected 
// app.post("/create", (req, res) => {
//     console.log("Ruta /create alcanzada");
//     // Resto del código
// });


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


