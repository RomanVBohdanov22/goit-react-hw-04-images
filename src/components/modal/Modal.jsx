import { Component } from 'react';
import './Modal.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClick('');
    }
  };
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClick('');
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          <img src={this.props.largeImageURL} alt="some" />
        </div>
      </div>,
      modalRoot
    );
  }
}
