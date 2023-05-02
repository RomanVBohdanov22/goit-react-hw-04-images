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
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState('');

  async function dataToState(query, page) {
    setIsLoading(true);
    try {
      const { hits, totalHits } = await ImageService.getImages(query, page);
      if (!hits.length) {
        setIsEmpty(true);
        Notiflix.Notify.failure(`No photos at query "${query}"`);
        return;
      }
      setPhotos(prevState => [...prevState, ...hits]);
      setShowLoadMore(page < Math.ceil(totalHits / 12));
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
    if (!query) return;
    dataToState(query, page);
  }, [query, page]); // dataToState

  const onFormSubmit = ({ query }) => {
    setQuery(query);
    setPage(1);
    setPhotos([]);
    setShowLoadMore(false);
    setIsLoading(false);
    setIsEmpty(false);
    setError('');
  };

  const onLoadMore = () => {
    setPage(prevState => prevState.page + 1);
  };

  const setLargeImageURLevt = largeImageURL => {
    setLargeImageURL(largeImageURL);
    if (error) return;
    if (isEmpty) return;
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
