import { useEffect } from 'react';
import './Modal.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClick, largeImageURL }) => {
  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClick('');
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClick('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  return createPortal(
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={largeImageURL} alt="some" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
