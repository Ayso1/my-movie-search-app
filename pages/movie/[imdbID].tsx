import { makeStyles, Typography } from '@mui/material';
import { CardHeader, CardMedia, Theme, Box } from '@mui/material';
import styles from '../../styles/MoviePage.module.css';
import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../components/config';
import { useLocation } from 'react-router-dom';
import { Card, CardOverflow, CardContent, AspectRatio } from '@mui/joy';

type MovieProps = {
  posterUrl: string;
  title: string;
  releaseDate: string;
  country: string;
  rating: string;
  genre: string[];
  producer: string;
  director: string;
  actors: string[];
  plot: string;
};

export default function MoviePage() {
  const [data, setData] = useState(Object);
  const [loading, setLoading] = React.useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const allData = async () => {
    setLoading(true);
    let query = window.location.href;
    const queryUrl = new URL(query);
    const id = queryUrl.pathname.split('/movie/')[1];

    const url = `${config.movieUrl}${id}&apikey=${config.apiKey}`;
    try {
      const res = await axios.get(url);
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    setLoading(false);
  };
  useEffect(() => {
    setIsDataLoaded(true);
    allData();
  }, []);
  return (
    <main className={styles.main}>
      {isDataLoaded && (
        <Card
          className={styles.card}
          orientation="horizontal"
          sx={{ backgroundColor: '#2E3B55', width: '80%' }}
        >
          <CardMedia
            className={styles.media}
            component="img"
            image={data.Poster}
            sx={{
              width: '30%',
              height: '40%',
            }}
            style={{ borderRadius: '8px' }}
          />

          <CardContent sx={{ px: 12 }}>
            <Typography sx={{ mb: 2, color: '#eee' }} variant="h4">
              {data.Title}
            </Typography>
            <Typography sx={{ mb: 2, color: '#eee' }} variant="body1">
              <strong>Release Date: </strong>
              {data.Released}
            </Typography>
            <Typography sx={{ mb: 2, color: '#eee' }} variant="body1">
              <strong>Country: </strong>
              {data.Country}
            </Typography>
            <Typography sx={{ mb: 2, color: '#FFFF2E' }} variant="body1">
              <strong>Rated: </strong>
              {data.Rated}
            </Typography>
            <Typography sx={{ mb: 2, color: '#eee' }} variant="body1">
              <strong>Genre: </strong>
              {data.Genre}
            </Typography>
            <Typography sx={{ mb: 2, color: '#eee' }} variant="body1">
              <strong>Director: </strong>
              {data.Director}
            </Typography>
            <Typography sx={{ mb: 2, color: '#eee' }} variant="body1">
              <strong>Actors: </strong>
              {data.Actors}
            </Typography>
            <Typography sx={{ mb: 2, color: '#eee' }} variant="body1">
              <strong>Plot: </strong>
              {data.Plot}
            </Typography>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
