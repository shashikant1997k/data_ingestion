import { useEffect } from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { HeatMapOutlined } from "@ant-design/icons";

const { MapContainer } = ReactLeaflet;

const MapMarker = ({ children, className, width, height, ...rest }) => {
  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "/location-pointer.png",
        iconUrl: "leaflet/images/marker-icon.png",
        shadowUrl: "leaflet/images/marker-shadow.png",
      });
    })();
  }, []);

  return (
    <MapContainer className={"map"} {...rest}>
      {children(ReactLeaflet, Leaflet)}
    </MapContainer>
  );
};

export default MapMarker;
