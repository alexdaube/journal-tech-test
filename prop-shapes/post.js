import PropTypes from 'prop-types';
import { AuthorShape } from './author';

export const PostShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  author: AuthorShape,
});
