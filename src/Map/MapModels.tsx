
import { Circle, Marker, Popup } from "react-leaflet";
import { MarkerIcon } from "./MapComponent";
import { CircleMarkerOptions, LatLngLiteral } from "leaflet";
import { ReactNode } from "react";

export class MapPoint {
  public lat: number;
  public lng: number;
  public color: string;
  constructor(lat: number, lng: number, color: string = '#c0392b') {
    this.lat = lat;
    this.lng = lng;
    this.color = color;
  }
  getLatLng(): LatLngLiteral {
    return {
      lat: this.lat,
      lng: this.lng
    };
  }
  getMarker():any {
    return (<Marker position={this.getLatLng()} icon={this.getIcon()} />);
  }
  getIcon() {
    return MarkerIcon(this.color);
  }
  getElement(): ReactNode{
    return this.getMarker();
  }
}

export class MapPopup extends MapPoint {
  public distance: number;
  constructor(lat: number, lng: number,distance: number, color: string) {
    super(lat, lng, color);
    this.distance =distance;
  }
  override getMarker() {
    return (<Marker position={this.getLatLng()} icon={this.getIcon()}>
        <Popup>Distance: {this.distance}</Popup>
    </Marker>);
  }
  override getElement() {
    return this.getMarker();
  }
}

export class MapCircle extends MapPoint {

  public radius: number;

  constructor(lat: number, lng: number, radius: number, color: string = "#c0392b") {
    super(lat, lng, color);
    this.radius = radius;

  }
  getCircle(): ReactNode {
    return (<Circle center={this.getLatLng()} radius={this.radius}/>);
  }
  getCircleOptions(): CircleMarkerOptions {
    return {
      radius: this.radius,
      color: this.color,
      fillColor: this.color,
      fillOpacity: 0.3,
    };
  }
  override getElement() : ReactNode{
    return this.getCircle();
  }
}

