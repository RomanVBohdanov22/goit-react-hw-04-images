import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    total: 0,
    totalPhotos: 0,
    largeImageURL: '',
    showLoadMore: false,
    isLoading: false,
    isEmpty: false,
    error: '',
  };

  async dataToState(query, page) {
    this.setState({ isLoading: true });
    try {
      const data = await ImageService.getImages(query, page); //"flower", 2

      const { hits, total, totalHits } = data;

      if (!hits.length) {
        this.setState({
          isEmpty: true,
        });
        Notiflix.Notify.failure(`No photos at query "${query}"`);
        return;
      } else {
        this.setState(prevState => ({
          photos: [...prevState.photos, ...hits],
          showLoadMore: page < Math.ceil(totalHits / 12),
        }));
      }
      this.setState({
        total: total,
        totalPhotos: totalHits,
      });
      Notiflix.Notify.success(
        `Located ${totalHits} photos at query "${query}"`
      );
    } catch (error) {
      Notiflix.Notify.failure(error.message);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      await this.dataToState(query, page);
    }
  }

  onFormSubmit = ({ query }) => {
    this.setState({
      query: query,
      page: 1,
      photos: [],
      total: 0,
      totalPhotos: 0,
      showLoadMore: false,
      isLoading: false, //
      isEmpty: false,
      error: '',
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  setLargeImageURL = largeImageURL => {
    this.setState({ largeImageURL });
  };
  render() {
    return (
      <div style={appStyles}>
        <Searchbar onFormSubmit={this.onFormSubmit} />

        <ImageGallery
          photos={this.state.photos}
          onClick={this.setLargeImageURL}
        />
        {this.state.showLoadMore && (
          <>
            <Button onLoadMore={this.onLoadMore} />
          </>
        )}
        {this.state.largeImageURL && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            onClick={this.setLargeImageURL}
          />
        )}
        {this.state.isLoading && <Loader />}
      </div>
    );
  }
}
