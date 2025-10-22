import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

const ArcGISMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    let view;

    loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/Graphic',
      'esri/geometry/Point',
      'esri/symbols/SimpleMarkerSymbol',
      'esri/PopupTemplate'
    ], { css: true })
      .then(([ArcGISMap, MapView, Graphic, Point, SimpleMarkerSymbol, PopupTemplate]) => {
        const map = new ArcGISMap({
          basemap: 'streets-navigation-vector'
        });

        view = new MapView({
          container: mapRef.current,
          map: map,
          center: [31.2357, 30.0444], // [longitude, latitude]
          zoom: 10
        });

        // 1. Define the point (e.g., Cairo)
        const point = new Point({
          longitude: 31.2357,
          latitude: 30.0444
        });

        // 2. Define the marker symbol
        const markerSymbol = new SimpleMarkerSymbol({
          color: [226, 119, 40],
          outline: {
            color: [255, 255, 255],
            width: 1
          }
        });

        // 3. Define the popup content
        const popupTemplate = new PopupTemplate({
          title: 'Cairo',
          content: 'This is Cairo, Egypt. 📍'
        });

        // 4. Combine into a Graphic
        const pointGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol,
          popupTemplate: popupTemplate
        });

        // 5. Add to the map
        view.graphics.add(pointGraphic);
      })
      .catch(err => console.error(err));

    return () => {
      if (view) {
        view.destroy();
        view = null;
      }
    };
  }, []);

  return (
    <div style={{ height: '500px', width: '100%' }} ref={mapRef}></div>
  );
};

export default ArcGISMap;
