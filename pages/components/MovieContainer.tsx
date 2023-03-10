import { CardCover } from '@mui/joy';
import {
  Typography,
  CardHeader,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

import React from 'react';

export default function MovieContainer({ data }: { data: any }) {
  return (
    <Card sx={{ height: '550px', width: '300px', backgroundColor: '#2E3B55' }}>
      <CardMedia height="450px" component="img" image={data.Poster} />
      <CardHeader
        title={
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '1.2rem',
            }}
          >
            {data.Title}
          </Typography>
        }
        subheader={data.Year}
      />
    </Card>
  );
}
