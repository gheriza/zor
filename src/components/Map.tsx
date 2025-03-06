"use client";
import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MAPTILER_KEY = "GflKyMUtpmli0UyPcSin"; // ✅ Replace with your actual API key

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [route, setRoute] = useState<GeoJSON.Geometry | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
      center: [2.3522, 48.8566], // Paris
      zoom: 12,
    });

    mapRef.current = map;
    return () => map.remove();
  }, []);

  async function searchAddress(query: string) {
    try {
      const res = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${MAPTILER_KEY}`
      );

      if (!res.ok) {
        console.error("Geocoding API Error:", await res.text());
        return;
      }

      const data = await res.json();
      console.log("Geocoding Data:", data);

      const place = data.features?.[0];
      if (place && mapRef.current) {
        const [lng, lat] = place.geometry.coordinates;
        mapRef.current.flyTo({ center: [lng, lat], zoom: 14 });

        new maplibregl.Marker().setLngLat([lng, lat]).addTo(mapRef.current);
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
    }
  }

  async function getDirections(start: number[], end: number[]) {
    try {
      const url = `https://api.maptiler.com/routes/v2/driving/${start[0]},${start[1]}/${end[0]},${end[1]}?key=${MAPTILER_KEY}`;

      const res = await fetch(url);

      if (!res.ok) {
        console.error("Directions API Error:", await res.text());
        return;
      }

      const data = await res.json();
      console.log("Route Data:", data);

      if (data.routes?.[0]?.geometry) {
        setRoute(data.routes[0].geometry);
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  }

  useEffect(() => {
    if (route && mapRef.current) {
      const routeSource = mapRef.current.getSource("route");

      const routeData: GeoJSON.Feature = {
        type: "Feature",
        geometry: route,
        properties: {},
      };

      if (routeSource) {
        (routeSource as maplibregl.GeoJSONSource).setData(routeData);
      } else {
        mapRef.current.addSource("route", {
          type: "geojson",
          data: routeData,
        });

        mapRef.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#FF5733", "line-width": 5 },
        });
      }
    }
  }, [route]);

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search location..."
        onKeyDown={(e) => e.key === "Enter" && searchAddress(e.currentTarget.value)}
        className="p-2 border rounded mb-2"
      />
      <button
        onClick={() => getDirections([2.3522, 48.8566], [2.2945, 48.8584])}
        className="p-2 bg-blue-500 text-white rounded ml-2"
      >
        Get Directions to Eiffel Tower
      </button>
      <div ref={mapContainer} style={{ width: "100%", height: "500px", marginTop: "10px" }} />
    </div>
  );
}
