import Link from 'next/link';
import { useRouter } from 'next/router';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import BookIcon from '@mui/icons-material/Book';
export const Header = () => {
  const { pathname } = useRouter();

  const isActive = (path) => pathname === path;

  return (
    <nav>
      <Stack direction="row" alignItems="center" gap={3}>
        <Avatar
          variant="rounded"
          sx={{ height: '64px', width: '64px', bgcolor: indigo[500] }}>
          <BookIcon fontSize="large" />
        </Avatar>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Link href="/">
            <a className="title-link" data-active={isActive('/')}>
              <Typography sx={{ fontSize: 24, fontWeight: 900, color: '#000' }}>
                Journalier
              </Typography>
            </a>
          </Link>
          <Typography variant="subtitle1" color="#757575">
            Just some random thoughts...
          </Typography>
        </Box>
      </Stack>

      <style jsx>{`
        nav {
          padding: 2rem;
        }

        .title-link {
          text-decoration: none;
        }
      `}</style>
    </nav>
  );
};
