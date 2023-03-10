import Head from 'next/head';
import Image from 'next/image';
import { Box, Grid, ButtonBase } from '@mui/material';
import styles from '@/styles/Home.module.css';
import { SetStateAction, useState } from 'react';
import SearchBar from '../components/SeacrhBar';
import PaginationM from '../components/PaginationMaterial';
import MovieContainer from '../components/MovieContainer';
import AppLink from '../components/AppLink';
import React from 'react';
import Link from 'next/link';

export default function Home() {
  const [searchData, setSearchData] = useState<{ imdbID: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearchData = (data: any) => {
    setSearchPerformed(true);
    setSearchData(data);
    console.log(searchData);
  };
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost =
    searchData?.length > 0
      ? searchData.slice(indexOfFirstPost, indexOfLastPost)
      : [];
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  return (
    <>
      <Head>
        <title>Movie Search</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Box sx={{ flexGrow: 1 }}>
          <div className={styles.description}>
            <div>
              <SearchBar onSearch={handleSearchData} />
            </div>
          </div>
        </Box>
        {searchPerformed && currentPost.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <Grid container>
            {currentPost.map((item) => (
              <Grid item key={item.imdbID} xs={6} md={3} lg={3} p={3}>
                <ButtonBase onClick={() => {}}>
                  <AppLink href={`/movie/${item.imdbID}`}>
                    <MovieContainer data={item} />
                  </AppLink>
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        )}
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="center"
          style={{ minHeight: '5vh' }}
          spacing={1}
        >
          <Grid
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
          >
            {searchData && searchData.length > 0 && (
              <PaginationM
                postsPerPage={postPerPage}
                totalPosts={searchData.length}
                paginate={paginate}
              />
            )}
          </Grid>
        </Grid>
      </main>
    </>
  );
}
