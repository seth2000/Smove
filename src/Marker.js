import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 24px;
  background-color: transparent;
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
  const { Car } = props;
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
        Car:{Car.id}
      </div>
      <div style={{ fontSize: 14 }}>
        <span style={{ color: 'grey' }}>
          On Trip:{Car.is_on_trip.toString()}
        </span>
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>
          ongitude:{Car.longitude}
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>
        Latitude:{Car.latitude}
      </div>
      
    </div>
  );
};

const Marker = props => (
  <Wrapper
    alt={props.text}
    {...props.onClick ? { onClick: props.onClick } : {}}
  >
  <span style={props.is_on_trip?  { color: 'red'} :{color: 'blue'}}>
      {props.text} {props.is_on_trip? 'T': ''}
      
  </span>
  {props.show && <InfoWindow Car={props.Car} />}
  </Wrapper>
);

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  is_on_trip: PropTypes.bool,
  text: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Marker;