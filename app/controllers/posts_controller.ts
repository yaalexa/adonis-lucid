// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'
import BlogPostService from '../services/BlogPostService.js'

export default class BlogPostsController {
  public async index({ response }: HttpContext) {
    const posts = await BlogPostService.getAllPosts()
    return response.ok(posts)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'content', 'userId'])
    const post = await BlogPostService.createPost(data)
    return response.created(post)
  }

  public async show({ params, response }: HttpContext) {
    const post = await BlogPostService.getPostById(params.id)
    if (!post) return response.notFound({ message: 'Post not found' })
    return response.ok(post)
  }

  public async update({ params, request, response }: HttpContext) {
    const post = await BlogPostService.updatePost(params.id, request.only(['title', 'content']))
    if (!post) return response.notFound({ message: 'Post not found' })
    return response.ok(post)
  }

  public async destroy({ params, response }: HttpContext) {
    const deleted = await BlogPostService.deletePost(params.id)
    if (!deleted) return response.notFound({ message: 'Post not found' })
    return response.ok({ message: 'Post deleted successfully' })
  }
}
