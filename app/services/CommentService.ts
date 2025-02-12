import Comment from '../models/comment.js'

export default class CommentService {
  public static async getAllComments() {
    return await Comment.query().preload('user').preload('blogPost')
  }

  public static async createComment(data: Partial<Comment>) {
    return await Comment.create(data)
  }

  public static async getCommentById(id: number) {
    return await Comment.query()
      .where('id', id)
      .preload('user')
      .preload('blogPost')
      .first()
  }

  public static async updateComment(id: number, data: Partial<Comment>) {
    const comment = await Comment.find(id)
    if (comment) {
      comment.merge(data)
      await comment.save()
      return comment
    }
    return null
  }

  public static async deleteComment(id: number) {
    const comment = await Comment.find(id)
    if (comment) {
      await comment.delete()
      return true
    }
    return false
  }
}
