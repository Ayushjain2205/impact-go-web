import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Create custom markers for different issue types
const createIssueIcon = (type: string, icon: string) => {
  const getMarkerColor = (issueType: string) => {
    switch (issueType) {
      case "Waste":
        return "#3ddc84"; // Green
      case "Potholes":
        return "#ff6b6b"; // Red
      case "Lights":
        return "#4ecdc4"; // Teal
      case "Safety":
        return "#ffc300"; // Yellow
      default:
        return "#6c757d"; // Gray
    }
  };

  const color = getMarkerColor(type);

  return L.divIcon({
    className: "custom-issue-marker",
    html: `
      <div style="
        background: ${color};
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        border: 3px solid white;
        transition: all 0.2s ease;
        cursor: pointer;
      ">
        ${icon}
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

// User location marker
const userLocationIcon = L.divIcon({
  className: "user-location-marker",
  html: `
    <div style="
      width: 60px;
      height: 60px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <!-- Outer pulsing ring -->
      <div style="
        position: absolute;
        width: 60px;
        height: 60px;
        background: rgba(59, 130, 246, 0.2);
        border-radius: 50%;
        animation: pulse-ring 2s infinite;
      "></div>
      
      <!-- Middle ring -->
      <div style="
        position: absolute;
        width: 40px;
        height: 40px;
        background: rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        animation: pulse-ring 2s infinite 0.5s;
      "></div>
      
      <!-- Main marker -->
      <div style="
        width: 32px;
        height: 32px;
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 16px rgba(59, 130, 246, 0.5);
        position: relative;
        z-index: 10;
      ">
        <!-- Inner dot -->
        <div style="
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 6px;
            height: 6px;
            background: #3b82f6;
            border-radius: 50%;
          "></div>
        </div>
      </div>
    </div>
  `,
  iconSize: [60, 60],
  iconAnchor: [30, 30],
  popupAnchor: [0, -30],
});

interface Issue {
  id: number;
  type: string;
  lat: number;
  lng: number;
  icon: string;
  title: string;
  description: string;
  reportedBy: string;
  timeAgo: string;
  status: string;
  impact: number;
  image: string;
}

interface MapProps {
  issues?: Array<Issue>;
  onIssueClick?: (issue: Issue) => void;
}

// Component to handle map centering when location changes
const MapCenter: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 15);
  }, [map, center]);

  // Expose map instance to window for external access
  useEffect(() => {
    (window as any).leafletMap = map;
  }, [map]);

  return null;
};

export const Map: React.FC<MapProps> = ({ issues = [], onIssueClick }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [generatedIssues, setGeneratedIssues] = useState<Issue[]>([]);
  const issuesGenerated = useRef(false);

  // Default location (San Francisco) as fallback
  const defaultLocation: [number, number] = [37.7749, -122.4194];

  // Generate random issues near a location
  const generateRandomIssues = (
    centerLat: number,
    centerLng: number,
    count: number = 8
  ) => {
    const issueTypes = [
      {
        type: "Waste",
        icon: "🗑️",
        titles: [
          "Overflowing Trash",
          "Littered Sidewalk",
          "Dumpster Overflow",
          "Street Cleaning Needed",
        ],
        descriptions: [
          "Trash cans overflowing onto sidewalk",
          "Litter scattered across the area",
          "Dumpster needs immediate attention",
          "Street requires cleaning service",
        ],
      },
      {
        type: "Potholes",
        icon: "🚧",
        titles: [
          "Damaged Road",
          "Pothole Hazard",
          "Cracked Asphalt",
          "Road Repair Needed",
        ],
        descriptions: [
          "Large pothole creating driving hazard",
          "Cracked road surface needs repair",
          "Road damage affecting traffic flow",
          "Asphalt deterioration requires attention",
        ],
      },
      {
        type: "Lights",
        icon: "💡",
        titles: [
          "Street Light Out",
          "Flickering Light",
          "Broken Lamp Post",
          "Dark Street",
        ],
        descriptions: [
          "Street light not working properly",
          "Flickering light needs replacement",
          "Lamp post damaged and non-functional",
          "Area too dark for safe walking",
        ],
      },
      {
        type: "Safety",
        icon: "⚠️",
        titles: [
          "Damaged Sidewalk",
          "Trip Hazard",
          "Broken Guardrail",
          "Safety Concern",
        ],
        descriptions: [
          "Cracked sidewalk creating trip hazard",
          "Uneven surface poses walking risk",
          "Guardrail damaged and unsafe",
          "General safety issue in the area",
        ],
      },
    ];

    const reporters = [
      "WalkSafe",
      "CityWatch",
      "CommunityReporter",
      "SafetyFirst",
      "UrbanGuard",
    ];
    const timeAgoOptions = [
      "2 hours ago",
      "6 hours ago",
      "1 day ago",
      "3 days ago",
      "1 week ago",
    ];
    const statusOptions = ["PENDING", "IN_PROGRESS", "REVIEWED"];
    const impactOptions = [15, 20, 25, 30, 35, 40, 45, 50];

    const newIssues: Issue[] = [];
    for (let i = 0; i < count; i++) {
      // Generate random offset within ~500m radius
      const latOffset = (Math.random() - 0.5) * 0.01; // ~500m
      const lngOffset = (Math.random() - 0.5) * 0.01; // ~500m

      const randomType =
        issueTypes[Math.floor(Math.random() * issueTypes.length)];
      const randomTitle =
        randomType.titles[Math.floor(Math.random() * randomType.titles.length)];
      const randomDescription =
        randomType.descriptions[
          Math.floor(Math.random() * randomType.descriptions.length)
        ];

      newIssues.push({
        id: i + 1,
        type: randomType.type,
        lat: centerLat + latOffset,
        lng: centerLng + lngOffset,
        icon: randomType.icon,
        title: randomTitle,
        description: randomDescription,
        reportedBy: reporters[Math.floor(Math.random() * reporters.length)],
        timeAgo:
          timeAgoOptions[Math.floor(Math.random() * timeAgoOptions.length)],
        status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
        impact: impactOptions[Math.floor(Math.random() * impactOptions.length)],
        image: `https://picsum.photos/400/300?random=${i + 1}`, // Random placeholder images
      });
    }

    return newIssues;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          // Generate random issues only once when location is first obtained
          if (!issuesGenerated.current) {
            const newIssues = generateRandomIssues(latitude, longitude);
            setGeneratedIssues(newIssues);
            issuesGenerated.current = true;
          }
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError(error.message);
          setUserLocation(defaultLocation);
          // Generate random issues for fallback location too
          if (!issuesGenerated.current) {
            const newIssues = generateRandomIssues(
              defaultLocation[0],
              defaultLocation[1]
            );
            setGeneratedIssues(newIssues);
            issuesGenerated.current = true;
          }
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocationError("Geolocation is not supported");
      setUserLocation(defaultLocation);
      // Generate random issues for fallback location
      if (!issuesGenerated.current) {
        const newIssues = generateRandomIssues(
          defaultLocation[0],
          defaultLocation[1]
        );
        setGeneratedIssues(newIssues);
        issuesGenerated.current = true;
      }
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-impact-green)] mx-auto mb-4"></div>
          <p className="text-gray-600">Getting your location...</p>
        </div>
      </div>
    );
  }

  const center = userLocation || defaultLocation;

  return (
    <div className="h-full w-full">
      <MapContainer
        center={center}
        zoom={15}
        style={{ height: "100vh", width: "100%" }}
        className="z-0"
        zoomControl={false}
      >
        <MapCenter center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />

        {/* User location marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon} />
        )}

        {/* Issue markers - combine generated and submitted issues */}
        {[...generatedIssues, ...issues].map((issue) => (
          <Marker
            key={issue.id}
            position={[issue.lat, issue.lng]}
            icon={createIssueIcon(issue.type, issue.icon)}
            eventHandlers={{
              click: () => {
                if (onIssueClick) {
                  onIssueClick(issue);
                }
              },
            }}
          />
        ))}
      </MapContainer>

      {/* Location error banner */}
      {locationError && (
        <div className="absolute top-4 left-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg shadow-lg z-10">
          <div className="flex items-center">
            <span className="text-xl mr-2">⚠️</span>
            <div>
              <p className="font-semibold">Location Access Limited</p>
              <p className="text-sm">
                Using default location. Enable location access for better
                experience.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
