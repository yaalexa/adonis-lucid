import BlogPost from '../models/blog_post.js'

export default class BlogPostService {
  public static async getAllPosts() {
    return await BlogPost.query().preload('user').preload('comments')
  }

  public static async createPost(data: Partial<BlogPost>) {
    return await BlogPost.create(data)
  }

  public static async getPostById(id: number) {
    return await BlogPost.query()
      .where('id', id)
      .preload('user')
      .preload('comments', (query) => query.preload('user'))
      .first()
  }

  public static async updatePost(id: number, data: Partial<BlogPost>) {
    const post = await BlogPost.find(id)
    if (post) {
      post.merge(data)
      await post.save()
      return post
    }
    return null
  }

  public static async deletePost(id: number) {
    const post = await BlogPost.find(id)
    if (post) {
      await post.delete()
      return true
    }
    return false
  }
}
