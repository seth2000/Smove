import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: ${props => (props.isOff ? 'blue' : 'transparent;')} 
  border: 1px solid #000;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

// InfoWindow component
const InfoWindow = (props) => {
  const { Location } = props;
  const infoWindowStyle = {
    position: 'relative',
    bottom: 150,
    left: '-45px',
    width: 220,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  };

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>
        ID:{Location.id.toString()}
      </div>
      <div style={{ fontSize: 14 }}>
        <span style={{ color: 'grey' }}>
           available_cars:{Location.available_cars.toString()}
        </span>
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>
          ongitude:{Location.location[1]}
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>
        Latitude:{Location.location[0]}
      </div>
      
    </div>
  );
};

const CarAvailable = props => (
  <Wrapper 
    alt={props.text}
    {...props.onClick ? { onClick: props.onClick } : {}}
    
  >
  <span >
      {props.text} 
  </span>
  {props.isOff && <span style={{color:'blue'}}>Drop Here</span>}
  {props.show && <InfoWindow Location={props.Location} />}
  </Wrapper>
);

CarAvailable.defaultProps = {
  onClick: null,
};

CarAvailable.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  isOff: PropTypes.bool,
};

export default CarAvailable;