import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ThemeProvider } from '../components/theme-provider';
import { ThemeToggle } from '../components/theme-toggle';

export function LandingPage() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vital-check-theme">
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Navigation */}
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-6 w-6 text-primary"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span className="text-xl font-bold">Vital Check</span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="hidden md:flex items-center gap-4">
                <Link to="/sign-in" className="text-muted-foreground hover:text-foreground">
                  Sign In
                </Link>
                <Button asChild size="sm">
                  <Link to="/sign-up">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Your Complete Health <span className="text-primary">Monitoring</span> Solution
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Track vital metrics, visualize progress, and gain insights into your health journey
              with our comprehensive health monitoring platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8">
                <Link to="/sign-up">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M2 12h20M8.56 3.69 12 7.07l3.44-3.38M3.69 8.56 7.07 12l-3.38 3.44M15.44 3.69 12 7.07l-3.44-3.38M20.31 8.56 16.93 12l3.38 3.44M8.56 20.31 12 16.93l3.44 3.38M3.69 15.44 7.07 12l-3.38-3.44M15.44 20.31 12 16.93l-3.44 3.38M20.31 15.44 16.93 12l3.38-3.44" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Dashboard Analytics</h3>
                <p className="text-muted-foreground">
                  Visualize all your health metrics in one comprehensive dashboard with intuitive charts and graphs.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <line x1="4" x2="4" y1="22" y2="15"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Health Metrics</h3>
                <p className="text-muted-foreground">
                  Track vital stats like heart rate, blood pressure, glucose levels, and more with customizable metrics.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Reports</h3>
                <p className="text-muted-foreground">
                  Generate detailed health reports to share with healthcare providers or for personal tracking.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto bg-card p-10 rounded-lg border border-border">
              <h2 className="text-3xl font-bold mb-4">Ready to take control of your health?</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of users who are already tracking their health metrics and seeing results.
              </p>
              <Button asChild size="lg">
                <Link to="/sign-up">Start Your Health Journey</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 border-t border-border mt-auto">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5 text-primary"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="font-medium">Vital Check</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Vital Check. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
} 