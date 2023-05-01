import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './searchbar';
import Button from './button';
import { ImageGallery } from './imagegallery/ImageGallery';
import { Modal } from './modal/Modal';
import { Loader } from './loader/Loader';

import * as ImageService from './service/imagesFetch';

const appStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: '16px',
  paddingBottom: '24px',
};

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  //const [total, setTotal] = useState(0);
  //const [totalPhotos, setTotalPhotos] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState('');

  async function dataToState(query, page) {
    //
    //
    setIsLoading(true);
    try {
      const data = await ImageService.getImages(query, page); //await

      const { hits, total, totalHits } = data;
      console.log(query, page);
      console.log(data);

      if (!hits.length) {
        setIsEmpty(true);
        Notiflix.Notify.failure(`No photos at query "${query}"`);
        return;
      } else {
        setPhotos(prevState => [...prevState, ...hits]);
        setShowLoadMore(page < Math.ceil(totalHits / 12));
      }
      //setTotal(total);
      //setTotalPhotos(totalHits);
      console.log(total, totalHits);

      Notiflix.Notify.success(
        `Located ${totalHits} photos at query "${query}"`
      );
    } catch (error) {
      setError(error.message);
      Notiflix.Notify.failure(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    dataToState(query, page);
  }, [query, page]);
  /*
  async const componentDidUpdate = (prevProps, prevState) => {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      await this.dataToState(query, page);
    }
  }*/

  const onFormSubmit = ({ query }) => {
    setQuery(query);
    setPage(1);
    setPhotos([]);
    //setTotal(0);
    //setTotalPhotos(0);
    setShowLoadMore(false);
    setIsLoading(false);
    setIsEmpty(false);
    setError('');
  };

  const onLoadMore = () => {
    setPage(prevState => prevState.page + 1);
    //this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  //setLargeImageURL(largeImageURL);
  const setLargeImageURLevt = largeImageURL => {
    setLargeImageURL(largeImageURL);
    console.log(error + isEmpty);
  };

  return (
    <div style={appStyles}>
      <Searchbar onFormSubmit={onFormSubmit} />

      <ImageGallery photos={photos} onClick={setLargeImageURLevt} />
      {showLoadMore && (
        <>
          <Button onLoadMore={onLoadMore} />
        </>
      )}
      {largeImageURL && (
        <Modal largeImageURL={largeImageURL} onClick={setLargeImageURL} />
      )}
      {isLoading && <Loader />}
    </div>
  );
};
