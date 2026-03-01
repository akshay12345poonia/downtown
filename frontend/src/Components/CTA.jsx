import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand/95" />
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"
          className="w-full h-full object-cover mix-blend-overlay opacity-20"
          alt="Office"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
          Begin Your Legacy <br />
          <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-8">
            Starts Right Here
          </span>
        </h2>

        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          Whether you're looking for a family home, a high-yield investment, or
          your next commercial venture, let SilverBrick be your guide.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <button
            className="btn btn-gold btn-lg flex items-center gap-2"
            onClick={() => navigate("/properties")}
          >
            View Current Listings
            <ArrowRight size={20} />
          </button>

          <button
            className="btn bg-white/10 hover:bg-white/20 text-white border border-white/30 btn-lg backdrop-blur-md"
            onClick={() => navigate("/contact")}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;