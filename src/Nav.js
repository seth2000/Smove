import React, { Component } from "react";
import  {Link} from "react-router-dom";


class Nav extends Component {
  render() {
    return (
      <React.Fragment>
        <table width="100%">
            <tbody>
            <tr>
                <td><Link to="/">Car Location API</Link></td>
                <td>
                    <Link to="/BookingAvailability">Booking Availability API</Link>
                
                </td>
            </tr>
            </tbody>
        </table>
       
      </React.Fragment>
    );
  }
}
 
export default Nav;