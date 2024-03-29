import { PostShape } from '../prop-shapes/post';
import PropTypes from 'prop-types';
import { Avatar, Stack, Typography } from '@mui/material';
import format from 'date-fns/format';
import { sentiment } from './SentimentPicker';
import { useMemo } from 'react';

const Post = ({ post }) => {
  const SentimentIcon = useMemo(() => {
    const Icon = post.sentiment ? sentiment[post.sentiment].icon : undefined;
    return Icon ? <Icon /> : <></>;
  }, [post.sentiment]);

  return (
    <Stack direction="column" alignItems="flexStart" sx={{ mb: 7 }}>
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography variant="h4" sx={{ mb: 0.5 }}>
          {post.title}
        </Typography>
        {SentimentIcon}
      </Stack>

      <Stack direction="row" alignItems="center" gap={1}>
        <Avatar
          sx={{
            height: 36,
            width: 36,
            bgcolor: post.author ? '#52ab98' : '#757575',
          }}>
          {post.author ? post.author.name.substring(0, 1) : 'A'}
        </Avatar>

        <Stack direction="column">
          <Typography fontWeight={500}>
            {post.author ? post.author.name : 'Anonymous'}
          </Typography>
          <Typography variant="caption" color="#757575">
            {format(new Date(post.createdAt), 'PPPpp')}
          </Typography>
        </Stack>
      </Stack>

      <Typography sx={{ mt: 2 }}>{post.content}</Typography>
    </Stack>
  );
};

Post.propTypes = {
  post: PropTypes.objectOf(PostShape).isRequired,
};

export default Post;
