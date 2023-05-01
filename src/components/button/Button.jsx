import PropTypes from 'prop-types';
import '../button/Button.css';
//import { Component } from 'react';


//class Button extends Component ???
const Button = ({ onLoadMore } ) => { 
    return (<button className='Button' onClick={onLoadMore}>Load more...</button>);
}

export default Button;

Button.propTypes = {
   onLoadMore: PropTypes.func.isRequired,  
}; 

