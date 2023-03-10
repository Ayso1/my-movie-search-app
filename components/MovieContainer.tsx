import { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  CardHeader,
  Card,
  ButtonBase,
  CardMedia,
  IconButton,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import AppLink from '../components/AppLink';

export default function MovieContainer({ data }: { data: any }) {
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const storedFavoriteMovies = JSON.parse(
      localStorage.getItem('favoriteMovies') || '[]'
    );
    setFavoriteMovies(storedFavoriteMovies);
    setIsFavorite(
      storedFavoriteMovies.some((movie: any) => movie.id === data.imdbID)
    );
  }, [data.imdbID]);

  const toggleFavorite = useCallback(() => {
    const favoriteMovie = {
      id: data.imdbID,
      title: data.Title,
      poster: data.Poster,
    };
    let updatedFavoriteMovies: any[];

    if (isFavorite) {
      updatedFavoriteMovies = favoriteMovies.filter(
        (movie) => movie.id !== favoriteMovie.id
      );
    } else {
      updatedFavoriteMovies = [...favoriteMovies, favoriteMovie];
    }

    localStorage.setItem(
      'favoriteMovies',
      JSON.stringify(updatedFavoriteMovies)
    );
    setFavoriteMovies(updatedFavoriteMovies);
    setIsFavorite(!isFavorite);
  }, [data.imdbID, favoriteMovies, isFavorite]);

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
              color: '#eee',
            }}
          >
            {data.Title}
          </Typography>
        }
        subheader={
          <Typography
            sx={{
              color: '#eee',
            }}
          >
            {data.Year}
          </Typography>
        }
        action={
          <IconButton onClick={toggleFavorite} aria-label="add to favorites">
            {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        }
      />
    </Card>
  );
}
