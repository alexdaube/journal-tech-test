import { Header } from './Header';
import PropTypes from 'prop-types';
import { Divider } from '@mui/material';

export const Layout = ({ children }) => (
  <>
    <Header />
    <Divider sx={{ mx: 4 }} />
    <div className="layout">{children}</div>
    <style jsx>{`
      .layout {
        padding: 0 2rem;
      }
    `}</style>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
