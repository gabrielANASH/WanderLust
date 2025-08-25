import SearchForm from "./search-form";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      <div className="absolute inset-0 hero-overlay" />
      
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto animate-fade-in">
        <h1 className="font-poppins font-bold text-5xl md:text-7xl text-white mb-6 leading-tight">
          Discover Your Next
          <span className="text-sunset animate-float inline-block ml-4">Adventure</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Explore breathtaking destinations, create unforgettable memories, and embark on journeys that transform your perspective on the world.
        </p>
        
        <SearchForm />
      </div>
    </section>
  );
}
