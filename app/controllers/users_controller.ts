import type { HttpContext } from '@adonisjs/core/http'
import UserService from '../services/UserService.js'

export default class UsersController {
  // Obtener todos los usuarios
  public async index({ response }: HttpContext) {
    try {
      const users = await UserService.getAllUsers()
      return response.ok(users)
    } catch (error) {
      console.error('❌ Error en index:', error)
      return response.internalServerError({ message: 'Error al obtener los usuarios', error })
    }
  }

  // Obtener un usuario por ID
  public async show({ params, response }: HttpContext) {
    try {
      const user = await UserService.getUserById(params.id)
      if (!user) {
        return response.notFound({ message: 'Usuario no encontrado' })
      }
      return response.ok(user)
    } catch (error) {
      console.error('❌ Error en show:', error)
      return response.internalServerError({ message: 'Error al obtener el usuario', error })
    }
  }

  // Crear un usuario
  public async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['username', 'email', 'password'])
      const user = await UserService.createUser(data)
      return response.created(user)
    } catch (error) {
      console.error('❌ Error en store:', error)
      return response.internalServerError({ message: 'Error al crear el usuario', error })
    }
  }

  // Actualizar un usuario
  public async update({ params, request, response }: HttpContext) {
    try {
      const data = request.only(['username', 'email', 'password'])
      const user = await UserService.updateUser(params.id, data)
      if (!user) {
        return response.notFound({ message: 'Usuario no encontrado' })
      }
      return response.ok(user)
    } catch (error) {
      console.error('❌ Error en update:', error)
      return response.internalServerError({ message: 'Error al actualizar el usuario', error })
    }
  }

  // Eliminar un usuario
  public async destroy({ params, response }: HttpContext) {
    try {
      const deleted = await UserService.deleteUser(params.id)
      if (!deleted) {
        return response.notFound({ message: 'Usuario no encontrado' })
      }
      return response.ok({ message: 'Usuario eliminado correctamente' })
    } catch (error) {
      console.error('❌ Error en destroy:', error)
      return response.internalServerError({ message: 'Error al eliminar el usuario', error })
    }
  }
}
