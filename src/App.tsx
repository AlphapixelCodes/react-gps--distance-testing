import './App.css';

import { generatePoints, getDistanceKm, LongLat } from './Domain/MapMath';
import { LatLngLiteral } from 'leaflet';
import { MapComponent } from './Map/MapComponent';
import { MapCircle, MapPopup } from './Map/MapModels';

const red = '#c0392b';
const blue = '#2B39C0';
const checkDistance = 1.60934;
function App() {
  
  //39.12947432904694, -84.51642442917864
  //39.12926567827278, -84.51566947162569
  //39°07'44.8"N 84°30'57.4"W
  const center: LatLngLiteral = { lat: 39.12947432904694, lng: -84.51642442917864 };
  let mapPoints: any[] =GetMarkers(center,points,checkDistance);
  //mapPoints.push(new MapCircle(center.lng,center.lat,checkDistance));
  return (
    <div className="App" style={{ height: "100%" }}>
      <MapComponent position={center} style={{ height: "100vh" }} mapItems={mapPoints} />
    </div>
  );
}

export default App;
const p1 = `39°06'26.5"N 84°34'33.8"W`;
const p2 = `39°10'18.1"N 84°29'52.4"W`;
const points = generatePoints(p1, p2, .002);
console.log('YOO', points.length)

function GetMarkers(center: LatLngLiteral, points: LongLat[], distance: number) {//todo add uom
  let c = new LongLat(center.lng, center.lat);
  return points.map(e => {
    let dist = getDistanceKm(c, e)
    return new MapPopup(e.latitude, e.longitude,dist, dist < distance ? red : blue);
  })

}