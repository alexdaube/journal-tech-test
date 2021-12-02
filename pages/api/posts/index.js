import { createPost, fetchPosts } from '../../../prisma/helpers/post';

// GET /api/posts
export default async (req, res) => {
  if (req.method === 'GET') {
    const posts = await fetchPosts();
    res.json(posts);
  }

  if (req.method === 'POST') {
    const postData = req.body.post;
    const post = await createPost({
      title: postData.title,
      content: postData.content,
      authorId: postData.author ? postData.author.id : null,
    });
    res.json(post);
  }
};
