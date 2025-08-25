import { Card, CardContent } from "@/components/ui/card";

const regionStats = [
  { name: "Europe", count: 45, color: "text-forest" },
  { name: "Asia", count: 38, color: "text-ocean" },
  { name: "Africa", count: 28, color: "text-terracotta" },
  { name: "Americas", count: 42, color: "text-sunset" },
  { name: "Oceania", count: 17, color: "text-sand" },
];

const mapMarkers = [
  { id: 1, top: "33%", left: "25%", region: "Europe" },
  { id: 2, top: "50%", left: "50%", region: "Asia" },
  { id: 3, top: "66%", left: "33%", region: "Africa" },
  { id: 4, top: "50%", left: "16%", region: "Americas" },
  { id: 5, bottom: "33%", right: "25%", region: "Oceania" },
];

export default function InteractiveMap() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-gray-800 mb-6">
            Explore Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Click on any region to discover amazing travel opportunities around the world
          </p>
        </div>
        
        <Card className="shadow-lg">
          <CardContent className="p-8">
            {/* World map placeholder with interactive regions */}
            <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden" data-testid="interactive-map">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"
                alt="Interactive world map showing travel destinations"
                className="w-full h-full object-cover"
              />
              
              {/* Interactive markers */}
              {mapMarkers.map((marker) => (
                <div
                  key={marker.id}
                  className="absolute w-4 h-4 bg-sunset rounded-full animate-pulse cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-transform"
                  style={{
                    top: marker.top,
                    left: marker.left,
                    bottom: marker.bottom,
                    right: marker.right,
                  }}
                  data-testid={`map-marker-${marker.region.toLowerCase()}`}
                  title={`Explore ${marker.region}`}
                />
              ))}
              
              {/* Tooltip placeholder - would be shown on hover in real implementation */}
              <div className="absolute top-16 left-16 bg-white rounded-lg shadow-lg p-4 opacity-0 transition-opacity pointer-events-none">
                <h4 className="font-semibold text-lg mb-1">Europe</h4>
                <p className="text-gray-600 text-sm mb-2">45 destinations available</p>
                <button className="text-forest font-medium text-sm hover:underline">
                  Explore Europe
                </button>
              </div>
            </div>
            
            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8" data-testid="region-stats">
              {regionStats.map((region) => (
                <div key={region.name} className="text-center">
                  <div className={`text-2xl font-bold mb-1 ${region.color}`}>
                    {region.count}
                  </div>
                  <div className="text-gray-600 text-sm">{region.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
