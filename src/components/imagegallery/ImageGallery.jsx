import PropTypes from 'prop-types';
import './ImageGallery.css';
import { ImageGalleryItem } from 'components/imagegalleryitem/ImageGalleryItem';

export const ImageGallery = ({ photos, onClick }) => {
  return (
    <ul className="ImageGallery">
      {photos.map(photo => (
        <ImageGalleryItem key={photo.id} photo={photo} onClick={onClick} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
