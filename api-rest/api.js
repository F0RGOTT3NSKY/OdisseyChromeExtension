const express = require('express');
const router = express.Router();

const mysqlConnection = require('./dbconection');

//   GET /checkuser/____________________________________
/**
 * Evalua si un usuario existe en la base dde datos por medio del email registrado.
 * @returns {object} JSON Format, Bool si lo encuentra o no, de ser positivo retorna los datos relacionados
 */
router.get('/checkuser/:email', (req, res) => {

  const email = req.params['email'];
  const sql = 'call SearchEmail("' + email + '")';

  mysqlConnection.query(sql, (error, result) => {
    if (error) throw error;
    if (result[0].length > 0) {
      res.json({
        exist: true,
        body: result[0]
      });
    }
    else {
      res.json({
        exist: false
      });
    }
  });


});



//   GET /users____________________________________________
/**
 * Obtiene la lista de usuarios. Debe estar registrado en la base de datos
 * @return {Object} JSON Format, envia una lista con los resultados registrados en la base.
 */
router.get('/users', (req, res) => {

  const header = req.header('usuario');

  mysqlConnection.query('call ReturnUser(' + header + ')', (error, result) => {
    if (error) throw console.log(error);
    if (result[0].length > 0) {

      mysqlConnection.query('call ReturnAllUsers()', (error, result) => {
        if (error) throw error;
        if (result.length > 0) {

          res.json(result[0]);

        }
        else {
          res.json({
            res: "not found"
          });
        }
      });


    }
    else {
      res.json({
        status: "Access Blocked"
      });
    }
  });


});

//   GET /users?id=parametro_______________________________
/**
 * Consulta la lista de usuarios buscando alguno cuyo ID haga match con el parámetro. Debe estar registrado en la base de datos
 * @return {Object} JSON Format, confirmacion de si existe o no, de encontrarlo devuelve los datos relacionados al usuario
 */
router.get('/users/:id', (req, res) => {


  const header = req.header('usuario');

  mysqlConnection.query('call ReturnUser(' + header + ')', (error, result) => {
    if (error) throw console.log(error);
    if (result[0].length > 0) {


      const { id } = req.params;
      mysqlConnection.query(`call ReturnUser(${id})`, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
          res.json(result[0]);
        }
        else {
          res.json({
            status: "Not result"
          });
        }
      });


    }
    else {
      res.json({
        status: "Access Blocked"
      });
    }
  });

});



//   GET /users/exists?id=parametro________________________
/**
 * Evalua si un usuario existe o no en la base de datos. Debe estar registrado en la base de datos
 * @return {Object} JSON Format, envia una confirmacion, si lo encientra devuelve los datos
 */
router.get('/users/exists/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(`call ReturnUser(${id})`, (error, result) => {


    if (error) throw error;
    if (result[0].length > 0) {
      res.json({
        status: "User founded"
      });
    }
    else {
      res.json({
        status: "Not result"
      });
    }

  });
});




//   POST /users___________________________________________
/**
 * Registra un nuevo usuario en la base de datos.
 * @return {Object} JSON Format, confirmacion de la accion
 */
router.post('/users', (req, res) => {
  const sql = `call AddUser(?)`;
  const userBody = {
    email: req.body.email
  };

  mysqlConnection.query(sql, [userBody.email], error => {
    if (error) throw error;
    res.json({
      status: "User Added"
    });
  });
});


//   DELETE /users/id______________________________________
/**
 * Elimina el usuario indicado por id de la base de datos. Requiere de un rol administrador
 * @return {Object} JSON Format, Confirmacion de la peticion
 */
router.delete('/users/:id', (req, res) => {

  const header = req.header('usuario');

  mysqlConnection.query('call ReturnUser(' + header + ')', (error, result) => {
    if (error) throw console.log(error);
    if (result[0].length > 0) {

      if (parseInt(result[0][0].US_Admin)) {
        const { id } = req.params;
        mysqlConnection.query(`call DeleteUser(${id})`, error => {
          if (error) throw error;

          res.json({
            status: "User deleted"
          });
        });
      } else {
        res.json({
          status: "Not Admin Permission"
        })
      }
    }
    else {
      res.json({
        status: "Access Blocked"
      });
    }
  });



});


//   GET /songs____________________________________________
/**
 * Obtiene la lista de todas las canciones. El usuario debe estar registrado en la base de datos
 * @return {Object} JSON Format una lista con todas las canciones
 */
router.get('/songs', (req, res) => {

  const header = req.header('usuario');

  mysqlConnection.query('call ReturnUser(' + header + ')', (error, result) => {
    if (error) throw console.log(error);
    if (result[0].length > 0) {


      mysqlConnection.query('call ReturnAllSoundtracks()', (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
          res.json({
            status: "Found",
            body: result[0]
          });
        }
        else {
          res.json({
            status: "Not result"
          });
        }
      });



    }
    else {
      res.json({
        status: "Access Blocked"
      });
    }
  });



});

//   DELETE /songs/id______________________________________
/**
 * Elimina la canción indicada por el id. Requiere de un rol de administrador.
 * @return {Object} JSON Format, un mensaje que confirma o niega la peticion
 */
router.delete('/songs/:id', (req, res) => {

  const header = req.header('usuario');


  mysqlConnection.query('call ReturnUser(' + header + ')', (error, result) => {
    if (error) throw console.log(error);
    if (result[0].length > 0) {
      if (parseInt(result[0][0].US_Admin)) {
        const { id } = req.params;
        mysqlConnection.query(`call DeleteSoundtracks(${id})`, error => {
          if (error) throw error;
          res.json({
            status: "Sound deleted"
          });
        });
      } else {
        res.json({
          status: "Not Admin Permission"
        })
      }

    }
    else {
      res.json({
        status: "Access Blocked"
      });
    }
  });



});


//   GET /songs?search=____________________________________
/**
 * Busca las canciones según una consulta del usuario. Debe estar registrado en la base de datos
 * @return {Object} JSON Format, si lo encuentra envia una lista con los resultados
 */
router.get('/songs/:search', (req, res) => {

  const header = req.header('usuario');

  mysqlConnection.query('call ReturnUser(' + header + ')', (error, result) => {
    if (error) throw console.log(error);
    if (result[0].length > 0) {



      const search = req.params['search'];

      const sql = 'call SearchSoundtracks("' + search + '")';

      mysqlConnection.query(sql, (error, result) => {
        if (error) throw error;
        if (result[0].length > 0) {
          res.json({
            status: "Found",
            body: result[0]
          });
        }
        else {
          res.json({
            status: "Not result"
          });
        }
      });


    }
    else {
      res.json({
        status: "Access Blocked"
      });
    }
  });



});


module.exports = router;