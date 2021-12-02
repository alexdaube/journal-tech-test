import PropTypes from 'prop-types';
import { Layout } from '../components/Layout';
import { PostShape } from '../prop-shapes/post';
import { fetchPosts } from '../prisma/helpers/post';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Post from '../components/Post';
import { Box, Button, Modal, Stack } from '@mui/material';
import { useState } from 'react';
import NewPostForm from '../components/NewPostForm';
import safeJsonStringify from 'safe-json-stringify';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const NEW_POST_DEFAULT_VALUES = {
  title: '',
  content: '',
  sentiment: '',
};

const emotionCache = createCache({ key: 'css' });
const theme = createTheme();

const Journal = ({ posts: defaultPosts }) => {
  const [posts, setPosts] = useState(defaultPosts);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Stack direction="column" gap={2}>
            <Box>
              <Button
                size="medium"
                fullWidth={false}
                onClick={handleOpen}
                variant="contained">
                New Post
              </Button>
            </Box>

            {posts.map((post) => (
              <Post key={`${post.id}`} post={post} />
            ))}
          </Stack>

          <Modal
            disablePortal
            open={open}
            onClose={(event, reason) => {
              if (reason !== 'backdropClick') {
                handleClose();
              }
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              display: 'flex',
              p: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Box
              sx={{
                position: 'relative',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: 1,
                boxShadow: (theme) => theme.shadows[5],
                p: 4,
              }}>
              <NewPostForm
                defaultValues={NEW_POST_DEFAULT_VALUES}
                onCancel={handleClose}
                onPost={async (postData) => {
                  const response = await fetch('api/posts', {
                    method: 'POST',
                    body: JSON.stringify({ post: postData }),
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                  const newPost = await response.json();

                  setPosts([newPost, ...posts]);

                  handleClose();
                }}
              />
            </Box>
          </Modal>
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
};

Journal.propTypes = {
  posts: PropTypes.arrayOf(PostShape).isRequired,
};

export const getServerSideProps = async () => {
  const posts = await fetchPosts();
  return {
    props: {
      posts: posts.map((post) => ({
        ...post,
        createdAt: JSON.parse(safeJsonStringify(post.createdAt)),
      })),
    },
  };
};

export default Journal;
