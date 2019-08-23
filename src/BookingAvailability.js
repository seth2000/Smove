import React from 'react';
import GoogleMap from './GoogleMap';
import CarAvailable from './CarAvailable'
import DateTimePicker from 'react-datetime-picker';

class BookingAvailability extends React.Component {


    constructor() {
        super();
    
        const dt = (new Date()).setHours( (new Date()).getHours() + 2 );

        this.state = {
    
          //This is where the center of map is going to be
          center: {
            lat: 1.3590053333,
            lng: 103.752369833
          },
         
          //This is how much you want to zoom in
          zoom: 11,
    
          //This is the list of markers.
          Locations : [],

          startDate: new Date(),

          endDate: new Date(dt),
        };
        
           
    }

    componentDidMount() {
        let starttime = parseInt(this.state.startDate.getTime()/1000)
        let endtime = parseInt(this.state.endDate.getTime()/1000)
        let uri = 'https://challenge.smove.sg/availability?startTime=' + starttime +'&endTime='+ endtime ;

        console.log(uri)

        fetch(uri)
        .then(response => response.json())
        .then((jsonData) => {
            this.setState(  {Locations : jsonData.data.map( (each) => {
                return ({...each, isOff: false })
            }) })
        })    
        .catch((error) => {
        // handle your errors here
        console.error(error)
        })
    
        
    }
    
     onStartDateChange = (Date) => {
    // this.setState( {startDate : Date }, () => {      console.log(this.state.startDate)    }); 
        
        this.setState( {startDate : Date });
    }

    onEndDateChange = (Date) => {
        this.setState( {endDate : Date }); 
        
    }


    // onChildClick callback can take two arguments: key and childProps
    onChildClickCallback = (key) => {

        this.setState((state) => {
        
            const index = state.Locations.findIndex(e => e.id.toString() === key);
            // show infomation box on the map
            state.Locations[index].show = !state.Locations[index].show; 
        
            // reset dropoff_locations on the map
            for (let i=0; i<state.Locations.length -1; i++ )
            {
                state.Locations[i].isOff = false;
            }
            
            // Set selected Booking Availability dropoff_locations on the map
            if (state.Locations[index].dropoff_locations !== undefined)
            {
                for (let j=0; j<state.Locations[index].dropoff_locations.length -1 ; j ++ ) {
                    let idx =  state.Locations.findIndex(e => e.id.toString() === state.Locations[index].dropoff_locations[j].id.toString());
                    state.Locations[idx].isOff = state.Locations[index].show;
                }              
            }
            
            // Refresh page by setState
            return { Locations: state.Locations };

        });
    };

    render() {

        return (
            <React.Fragment>
                <div id='DateTimePicker'>
                    Start : <DateTimePicker   onChange={this.onStartDateChange}   value={this.state.startDate} />
                    End : <DateTimePicker     onChange={this.onEndDateChange}   value={this.state.endDate} />
               </div>
                <div id='Map' style={{ height: '100vh', width: '100%' }}>
                    <GoogleMap
                    
                        defaultCenter={this.state.center}
                        defaultZoom={this.state.zoom}
                        onChildClick={this.onChildClickCallback}
                    >
                    {
                        //Add a list of Markers to Your Map
                        this.state.Locations.map( (each) =>
                          <CarAvailable
                            lat = {each.location[0]}
                            lng = {each.location[1]}
                            text = {each.available_cars.toString()}
                            key = {each.id}
                            id = {each.id.toString()}
                            dropoff_locations = {each.dropoff_locations}
                            show = {(each.show === undefined || each.show === null)? false: each.show}
                            isOff = {each.isOff}
                            Location = {each}
                            
                          />
                        )
                      }
                
                    </GoogleMap>
                </div>
            </React.Fragment>
        )}

}
export default BookingAvailability;

