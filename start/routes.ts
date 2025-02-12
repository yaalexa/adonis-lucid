/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import Route from '@adonisjs/core/services/router'
import UsersController from '../app/controllers/users_controller.js' 

Route.group(() => {
  // Obtener todos los usuarios
  Route.get('/users', [UsersController, 'index'])

  // Crear un nuevo usuario
  Route.post('/users', [UsersController, 'store'])

  // Obtener un usuario por ID
  Route.get('/users/:id', [UsersController, 'show'])

  // Actualizar un usuario por ID
  Route.put('/users/:id', [UsersController, 'update'])

  // Eliminar un usuario por ID
  Route.delete('/users/:id', [UsersController, 'destroy'])
}).prefix('api')
