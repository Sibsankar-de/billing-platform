import { TopNav } from "@/components/modules/landing-page/TopNav";
import { AppLogo } from "@/components/ui/AppLogo";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  PieChart,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pt-20">
      <TopNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 lg:px-12 py-24 md:py-32 flex flex-col items-center text-center">
          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[80px] -z-10" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium mb-8 border border-border/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="flex h-2 w-2 rounded-full bg-primary relative">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
            </span>
            Introducing EaseInv Platform 2.0
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
            Simplify Your Invoicing,{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              Amplify Your Growth
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            The all-in-one billing platform designed for freelancers and small
            businesses to create, manage, and track invoices effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            <Link
              href="/register"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-base font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Start for Free
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#features"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full text-base font-medium bg-secondary/50 hover:bg-secondary/80 text-secondary-foreground transition-all backdrop-blur-sm"
            >
              See Features
            </Link>
          </div>

          {/* Social Proof / Dashboard Mockup Preview */}
          <div className="mt-20 w-full max-w-5xl rounded-2xl border border-border/40 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
            <div className="flex items-center gap-2 p-4 border-b border-border/40 bg-muted/20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto bg-background/50 rounded-md px-3 py-1 text-xs text-muted-foreground flex items-center gap-2">
                <Shield className="w-3 h-3" />
                app.easeinv.com
              </div>
            </div>
            {/* Dashboard Mockup Content placeholder */}
            <div className="aspect-video w-full bg-linear-to-br from-background via-muted/50 to-background flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 w-full h-full max-w-4xl z-10">
                <div className="col-span-1 md:col-span-2 space-y-4">
                  <div className="h-24 w-full bg-card/80 backdrop-blur-sm shadow-sm rounded-xl border border-border/50 flex flex-col justify-center p-6 gap-2">
                    <div className="w-16 h-4 bg-muted animate-pulse rounded"></div>
                    <div className="w-32 h-8 bg-muted animate-pulse rounded"></div>
                  </div>
                  <div className="h-64 w-full bg-card/80 backdrop-blur-sm shadow-sm rounded-xl border border-border/50 p-6 flex flex-col gap-4">
                    <div className="w-24 h-5 bg-muted animate-pulse rounded"></div>
                    <div className="flex-1 flex items-end gap-2 pb-2">
                      {[35, 60, 45, 80, 50, 95, 70].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-sm"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-span-1 space-y-4 hidden md:block">
                  <div className="h-92 w-full bg-card/80 backdrop-blur-sm shadow-sm rounded-xl border border-border/50 p-6 flex flex-col gap-4">
                    <div className="w-32 h-5 bg-muted animate-pulse rounded"></div>
                    <div className="flex-1 rounded-full border-8 border-primary/20 flex items-center justify-center">
                      <div className="w-2/3 h-2/3 rounded-full border-8 border-primary/60 border-t-primary"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-24 px-6 lg:px-12 bg-muted/20 border-y border-border/40"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Everything you need to get paid faster
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful features disguised as a simple interface. EaseInv
                brings all your invoicing and tracking needs into one place.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-6 h-6 text-primary" />,
                  title: "Lightning Fast Creation",
                  description:
                    "Generate professional invoices in seconds with our optimized and intuitive editor.",
                },
                {
                  icon: <FileText className="w-6 h-6 text-accent-foreground" />,
                  title: "Customizable Templates",
                  description:
                    "Stand out with beautiful templates that adapt to your brand colors and logo.",
                },
                {
                  icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
                  title: "Automated Tracking",
                  description:
                    "Never lose track of an invoice. See instantly when clients view and pay.",
                },
                {
                  icon: <PieChart className="w-6 h-6 text-indigo-500" />,
                  title: "Insightful Analytics",
                  description:
                    "Understand your cash flow with real-time charts and revenue reporting.",
                },
                {
                  icon: <Shield className="w-6 h-6 text-teal-500" />,
                  title: "Bank-Grade Security",
                  description:
                    "Your financial data is protected with enterprise-level encryption.",
                },
                {
                  icon: <ArrowRight className="w-6 h-6 text-blue-500" />,
                  title: "Seamless Integrations",
                  description:
                    "Connect easily to your favorite payment gateways and accounting software.",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to transform your billing?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of businesses that trust EaseInv to manage their
              invoicing process efficiently and securely.
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-10 py-5 rounded-full text-lg font-bold hover:bg-primary/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Get Started for Free
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <AppLogo size={28} />
              <span className="text-xl font-semibold tracking-tight">
                EaseInv
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Making billing invisible. Spend less time formatting invoices, and
              more time growing your business.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Product</h4>
            <ul className="space-y-3">
              {["Features", "Pricing", "Integrations", "Changelog"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      href={`#${link.toLowerCase()}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3">
              {[
                "About",
                "Blog",
                "Contact",
                "Privacy Policy",
                "Terms of Service",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href={`#`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border/50 text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} EaseInv platform. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
