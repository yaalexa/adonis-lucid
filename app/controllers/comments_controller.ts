// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'
import CommentService from '../services/CommentService.js'

export default class CommentsController {
  public async index({ response }: HttpContext) {
    const comments = await CommentService.getAllComments()
    return response.ok(comments)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['blogPostId', 'userId', 'comment'])
    const comment = await CommentService.createComment(data)
    return response.created(comment)
  }

  public async show({ params, response }: HttpContext) {
    const comment = await CommentService.getCommentById(params.id)
    if (!comment) return response.notFound({ message: 'Comment not found' })
    return response.ok(comment)
  }

  public async update({ params, request, response }: HttpContext) {
    const comment = await CommentService.updateComment(params.id, request.only(['comment']))
    if (!comment) return response.notFound({ message: 'Comment not found' })
    return response.ok(comment)
  }

  public async destroy({ params, response }: HttpContext) {
    const deleted = await CommentService.deleteComment(params.id)
    if (!deleted) return response.notFound({ message: 'Comment not found' })
    return response.ok({ message: 'Comment deleted successfully' })
  }
}
