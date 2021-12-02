import prisma from '../../lib/prisma';

export const fetchPosts = () => {
  return prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  });
};

export const findPost = (id) => {
  return prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: true },
  });
};

export const createPost = async (post) => {
  return prisma.post.create({ data: post });
};
