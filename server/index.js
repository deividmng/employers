const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors")
// callin to listenning on port N 
 app.use(cors());
 app.use(express.json())

 // Define el puerto en el que quieres que corra tu servidor
const PORT = process.env.PORT || 5000;
//  const PORT = 5000; // Puerto para el servidor backend make sure that is never the same as the one on frontend
 //! remenber always use a diferent port no even 3000 0r 3001

// crating the connection at sql
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"empleados_crud"
})

// saving the data with the mettod post the root it  gonna call on create , req = solicitud , res = respond 
app.post("/create", (req, res) => {
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
app.get("/empleados", (req, res) => {
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

app.put("/update", (req, res) => {
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

    //! here it goes the delete
    app.delete("/delete/:id", (req, res) => {
      //* I just need ID as it goes by params it dont need the body so add params
      const { id } = req.params; 
    
      const query = `DELETE FROM empleados WHERE id = ?`;
    
      db.query(query, [id], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error deleting employee");
        } else {
          res.send("Empleado deleted successfully");
        }
      });
    });
    

  
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
