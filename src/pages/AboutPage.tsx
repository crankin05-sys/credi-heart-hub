import { Link } from 'react-router-dom';
import { Brain, ArrowLeft, Award, Users, Target, Briefcase, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-border py-3">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] flex items-center justify-center shadow-md">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">Credibility Suite</span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors no-underline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/[0.06] border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary">Founder & CEO</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-display">
              Maurice Stewart
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Empowering businesses to build credibility, access capital, and achieve sustainable growth through AI-driven solutions.
            </p>
            <a
              href="https://credibilitysuits.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary/80 transition-colors font-semibold text-sm no-underline"
            >
              <Globe className="w-4 h-4" /> credibilitysuits.com
            </a>
          </div>

          {/* Bio sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Maurice Stewart founded Credibility Suite with a clear mission: to bridge the gap between underserved businesses and the capital they need to thrive. By leveraging AI technology and deep financial expertise, Credibility Suite transforms how businesses prepare for and access funding opportunities.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Background</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                With years of experience in business development, financial consulting, and technology innovation, Maurice has helped countless entrepreneurs navigate the complex landscape of business funding. His approach combines hands-on coaching with cutting-edge AI tools to deliver measurable results.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Who We Serve</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Credibility Suite serves small business owners, entrepreneurs, and startups who need guidance preparing for funding. From SBA loans to lines of credit, our platform assesses fundability, identifies gaps, and creates actionable roadmaps to capital readiness.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground">The Technology</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Credibility Suite AI uses intelligent agents to analyze business documents, assess credit readiness, and provide real-time coaching. Our platform automates the tedious parts of funding preparation so business owners can focus on what they do best — running their business.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] rounded-2xl p-8 text-center">
            <h3 className="text-white text-xl font-bold mb-6">Impact by the Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '500+', label: 'Businesses Assessed' },
                { value: '$2M+', label: 'Capital Facilitated' },
                { value: '92%', label: 'Client Satisfaction' },
                { value: '6', label: 'AI Agents Active' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
                  <div className="text-xs text-white/70">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Ready to build your business credibility?</p>
            <Link
              to="/get-started"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[hsl(230,80%,56%)] to-[hsl(260,70%,60%)] text-white font-semibold px-8 py-3 rounded-xl no-underline hover:shadow-lg transition-all"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
