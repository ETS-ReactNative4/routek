/* eslint-disable */
import React from 'react';
import { Col, Button } from 'reactstrap';
import { compose, withProps, withStateHandlers } from 'recompose';
import { GoogleMap, Marker, withGoogleMap, withScriptjs, Polyline} from 'react-google-maps';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import CloseIcon from 'mdi-react/CloseIcon';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import silverMapStyle from './silverMapStyle.json';
import blueMapStyle from './blueMapStyle.json';
import retroMapStyle from './retroMapStyle.json';
import darkMapStyle from './darkMapStyle.json';
import nightMapStyle from './nightMapStyle.json';
import UserAddIcon from 'mdi-react/UserAddIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {MarkerWithLabel} from "react-google-maps/lib/components/addons/MarkerWithLabel";
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';
import { faCoffee } from '@fortawesome/fontawesome-free-solid'

//OPCION 1 MARKER
const icon2 = "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_purple10.png"
//red, black, blue, green, grey, orange, purple, white, yellow
//OPCION 2 MARKER
const icon3 = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=3|000000|F5F5F5';

const css = {fontSize: "white"}
const mIcon = (color) => (
  {
    path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
    fillOpacity: 1,
    strokeOpacity: 1,
    strokeWeight: 0.3,
    strokeColor: '#333',
    fillColor: color,
    // url: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${number}|${color.slice(1)}|000000`,
    // anchor: new google.maps.Point(53,53),
    // labelOrigin: new google.maps.Point(53,115),
    // scaledSize: new google.maps.Size(80, 110),
  }
  // `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${number}|6495ED|000000`
)

const carIcon = {
  url: 'https://snapledgers.com/wp-content/uploads/2018/03/source.gif',
  scaledSize: new window.google.maps.Size(40, 40)
}

const handleMouseOver = e => {
  console.log(e)
};

const MainMap = compose(
  withProps({
    // generate your API key
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA1PquORAjAjumChpMb1to9WHsifrBrjvs&callback=initMap'
    + 'exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div className="map" style={{ height: '445px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)((props) => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 56.009483, lng: 92.8121694 }}
    defaultOptions={{ styles: darkMapStyle, mapTypeControl: false, streetViewControl: false, }}
  >
    {
      props.events.map(route => {
        console.log("routes=>", route);
        var locations = [];
        return route.paradas.map(parada => {
          console.log(parada.lng, parada.lat);
          locations.push({"lat": parada.lat, "lng": parada.lng});
          return(
            <Polyline
              path={locations}
              options={{
              strokeColor: route.color,
              strokeOpacity: 1,
              strokeWeight: 2,
              icons: [{
                icon: "hello",
                offset: '0',
                repeat: '10px'
              }],
              }}
            />
          );
        })
      })
    }

    {
      props.events.map(route => {
          console.log("routes=>", route);
        return route.paradas.map((parada, index) => {
          console.log(parada.lng, parada.lat);
          // "position": new google.maps.Point(index + 1 > 9 ? 9 : 5.4, 37), "style": { fontSize: index + 1 > 10 ? "12px" : "13px" , padding: "2px", color: "#ffff"}, "label": <div>{ index + 1 }</div>
          const properties =
                  parada.done ?
                    {
                      "position": new google.maps.Point(index + 1 > 9 ? 9 : 5.4, 50), "style" : {fontSize: index + 1 > 10 ? "12px" : "13px", padding: "2px", color: "#ffff"}, "label":  <div> { index + 1 }<FontAwesomeIcon style={{fontSize: "18px", marginLeft: "4px", marginBottom: "8px", color: "#4CE1B6"}} icon = "check-circle"/>  </div>
                    }
                  :
                  parada.working ?
                    {
                      "position": new google.maps.Point(index + 1 > 9 ? 9 : 5.4, 50), "style" : {fontSize: index + 1 > 10 ? "12px" : "13px", padding: "2px", color: "#ffff"}, "label": <div> { index + 1 } <FontAwesomeIcon style={{fontSize: "18px", marginLeft: "4px", marginBottom: "8px"}} icon = "clock"/>  </div>
                    }
                  :

                    {
                      "position": new google.maps.Point(index + 1 > 9 ? 9 : 5.4, 37), "style": { fontSize: index + 1 > 10 ? "12px" : "13px" , padding: "2px", color: "#ffff"}, "label": <div>{ index + 1 }</div>
                    }

          return(
              <MarkerWithLabel
                position={{ lat: parada.lat, lng: parada.lng }}
                icon={mIcon(route.color)}
                draggable={true}
                labelAnchor={properties.position}
                labelStyle={properties.style}
                onMouseOver={handleMouseOver("Hello")}
              >
                {properties.label}
              </MarkerWithLabel>
          );
        })
      })
    }

    {
      props.drivers.map(driver => {
        console.log(driver)
        return(
          <Marker
            icon={carIcon}
            position={{ lat: driver.lat, lng: driver.lng }}
            draggable={true}
          >
          </Marker>
        )
      })
    }


  </GoogleMap>
));

const MapView = (props) => (
  <Col xs={12} md={12} lg={12}>
    <MainMap isMarkerShown events={props.events} drivers={props.drivers}/>
  </Col>
);

// MapView.propTypes = {
//   t: PropTypes.func.isRequired,
// };


export default withTranslation('common')(MapView);
