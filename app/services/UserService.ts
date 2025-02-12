import User from '../models/user.js'

export default class UserService {
  // Obtener todos los usuarios
  public static async getAllUsers() {
    return await User.all()
  }

  // Obtener un usuario por ID
  public static async getUserById(id: number) {
    return await User.find(id)
  }

  // Crear un usuario
  public static async createUser(data: { username: string; email: string; password: string }) {
    return await User.create(data)
  }

  // Actualizar un usuario
  public static async updateUser(id: number, data: Partial<{ username: string; email: string; password: string }>) {
    const user = await User.find(id)
    if (!user) return null

    user.merge(data)
    await user.save()
    return user
  }

  // Eliminar un usuario
  public static async deleteUser(id: number) {
    const user = await User.find(id)
    if (!user) return null

    await user.delete()
    return true
  }
}
