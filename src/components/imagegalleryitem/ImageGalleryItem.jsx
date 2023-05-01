import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

export const ImageGalleryItem = ({ photo, onClick }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={photo.webformatURL}
        alt={photo.tags}
        loading="lazy"
        onClick={() => {
          onClick(photo.largeImageURL);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  photo: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
