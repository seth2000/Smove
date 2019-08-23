import React from 'react';
import GoogleMap from './GoogleMap';
import Marker from './Marker'

class CarLocation extends React.Component {

  constructor() {
    super();
    
    this.state = {
      //This is where the center of map is going to be
      center: {
        lat: 1.3590053333,
        lng: 103.752369833
      },
      
      //This is how much you want to zoom in
      zoom: 11,

      //This is the list of markers.
      myMarkers : []
    };
            
  }

  componentDidMount() {
    fetch('https://challenge.smove.sg/locations')
    .then(response => response.json())
    .then((jsonData) => {      
        this.setState( {myMarkers : jsonData.data });    
    })

    .catch((error) => {
      // handle your errors here
      console.error(error)
    })
  }
    

  // onChildClick callback can take two arguments: key and childProps
  onChildClickCallback = (key) => {
    
    this.setState((state) => {
      
      const index = state.myMarkers.findIndex(e => e.id.toString() === key);  
      state.myMarkers[index].show = !state.myMarkers[index].show; 
      return { myMarkers: state.myMarkers };

    });
  };

  render() {

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMap
              
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
              onChildClick={this.onChildClickCallback}
          >

          {
          //Add a list of Markers to Your Map
          this.state.myMarkers.map( (each) =>
            <Marker
              lat = {each.latitude}
              lng = {each.longitude}
              text = {each.id.toString()}
              key = {each.id}
              id = {each.id.toString()}
              is_on_trip = {each.is_on_trip}
              show = {(each.show === undefined || each.show === null)? false: each.show}
              Car = {each}
            />
          )
        }
        </GoogleMap>
      </div>
    )
}

}
export default CarLocation;

