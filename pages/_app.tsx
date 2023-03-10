import '@/styles/globals.css';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import type { AppProps } from 'next/app';
import styles from '@/styles/APP.module.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppBar style={{ background: '#2E3B55' }} position="absolute">
        <Toolbar>
          <IconButton
            color="default"
            size="large"
            edge="start"
            aria-label="logo"
            href="/"
          >
            <OndemandVideoIcon />
          </IconButton>
          <Typography
            color="#000000"
            variant="h6"
            sx={{ flexGrow: 2 }}
            fontFamily='"Segoe UI"'
          >
            MOVIE SEARCH
          </Typography>
        </Toolbar>
      </AppBar>
      <Component {...pageProps} />
    </>
  );
}
