import { useState, useEffect, useRef, lazy, Suspense } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Calculator, 
  Scale, 
  Building2, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight,
  Users,
  Award,
  Shield,
  Briefcase,
  Gavel,
  TrendingUp,
  CheckCircle2,
  Menu,
  X
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Contact Info
const CONTACT = {
  address: "Str. Cozia 1b, Timișoara",
  phone: "+40 722 123 456",
  email: "casini2003@yahoo.com",
  hours: "L-V: 8-18 | Urgențe: 24/7"
};

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#servicii", label: "Servicii" },
    { href: "#certificari", label: "Certificări" },
    { href: "#calculatoare", label: "Calculatoare" },
    { href: "#despre", label: "Despre Noi" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-header shadow-sm" : "bg-transparent"
      }`}
      data-testid="main-header"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3" data-testid="logo-link">
            <div className="w-10 h-10 bg-[#134e4a] rounded-sm flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl">C</span>
            </div>
            <span className="font-display text-2xl font-semibold text-[#134e4a] tracking-tight">
              Casini
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-[#134e4a] transition-colors duration-200"
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${CONTACT.phone}`}
              className="bg-[#134e4a] text-white px-6 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider hover:bg-[#0f3d3a] transition-colors duration-200"
              data-testid="nav-call-btn"
            >
              Sună Acum
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-stone-200 pt-4" data-testid="mobile-menu">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-stone-600 hover:text-[#134e4a] font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${CONTACT.phone}`}
              className="block mt-4 bg-[#134e4a] text-white px-6 py-3 rounded-sm text-center text-sm font-semibold uppercase tracking-wider"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sună Acum
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-120px)]">
          {/* Text Content */}
          <div className="lg:col-span-5 space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-[#d97706]/10 text-[#d97706] px-4 py-2 rounded-sm text-sm font-semibold">
              <Award size={16} />
              <span>Peste 20 de ani de experiență</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1c1917] leading-tight tracking-tight">
              Expertiză Contabilă<br />
              <span className="text-[#134e4a]">de Încredere</span>
            </h1>
            
            <p className="text-lg text-stone-600 leading-relaxed max-w-lg">
              Servicii complete de contabilitate, consultanță fiscală și reprezentare juridică 
              pentru afacerea dumneavoastră în Timișoara și împrejurimi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#134e4a] text-white px-8 py-4 rounded-sm text-sm font-semibold uppercase tracking-wider hover:bg-[#0f3d3a] transition-colors duration-200 shadow-lg hover:shadow-xl"
                data-testid="hero-cta-primary"
              >
                Solicită Consultație
                <ChevronRight size={16} />
              </a>
              <a
                href="#calculatoare"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#134e4a] text-[#134e4a] px-8 py-4 rounded-sm text-sm font-semibold uppercase tracking-wider hover:bg-[#134e4a]/5 transition-colors duration-200"
                data-testid="hero-cta-secondary"
              >
                <Calculator size={16} />
                Calculatoare
              </a>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-8 pt-8 border-t border-stone-200">
              <div>
                <p className="font-display text-3xl font-bold text-[#134e4a]">20+</p>
                <p className="text-sm text-stone-500">Ani Experiență</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-[#134e4a]">500+</p>
                <p className="text-sm text-stone-500">Clienți Mulțumiți</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-[#134e4a]">100%</p>
                <p className="text-sm text-stone-500">Dedicare</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-7 relative animate-fade-in-up animation-delay-200">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1758518729463-0bb73ed899ac?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWVuJTIwbWVldGluZyUyMG1vZGVybiUyMG9mZmljZXxlbnwwfHx8fDE3NzM5OTEyNjF8MA&ixlib=rb-4.1.0&q=85"
                alt="Echipa Casini - femei profesioniste în contabilitate"
                className="w-full h-[500px] object-cover rounded-sm shadow-2xl"
                data-testid="hero-image"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-sm shadow-xl border border-stone-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#d97706]/10 rounded-full flex items-center justify-center">
                    <Shield className="text-[#d97706]" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1c1917]">CECCAR</p>
                    <p className="text-sm text-stone-500">Contabili Autorizați</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      icon: Calculator,
      title: "Contabilitate",
      description: "Servicii complete de contabilitate primară și financiară pentru toate tipurile de entități.",
      features: ["Contabilitate primară", "Bilanțuri contabile", "Declarații fiscale", "Raportări financiare"]
    },
    {
      icon: TrendingUp,
      title: "Consultanță Fiscală",
      description: "Optimizare fiscală legală și planificare pentru maximizarea profitului afacerii.",
      features: ["Planificare fiscală", "Optimizare taxe", "Consultanță TVA", "Prețuri de transfer"]
    },
    {
      icon: Building2,
      title: "Reprezentare ANAF",
      description: "Reprezentare profesională în relația cu Administrația Fiscală și alte instituții.",
      features: ["Inspecții fiscale", "Contestații", "Solicitări documente", "Reconcilieri"]
    },
    {
      icon: Gavel,
      title: "Consultanță Juridică",
      description: "Avocați specializați în drept comercial și fiscal, parte din echipa noastră.",
      features: ["Drept comercial", "Drept fiscal", "Litigii", "Contracte"]
    },
    {
      icon: Briefcase,
      title: "Înființare Firme",
      description: "Asistență completă pentru înființarea și înregistrarea societăților comerciale.",
      features: ["SRL / SA", "PFA / II", "Sedii sociale", "Modificări acte"]
    },
    {
      icon: FileText,
      title: "Salarizare",
      description: "Servicii complete de administrare personal și calcul salarial.",
      features: ["State de plată", "Contracte muncă", "Revisal", "Declarații lunare"]
    }
  ];

  return (
    <section id="servicii" className="py-24 bg-white" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[#d97706] text-sm font-semibold uppercase tracking-wider mb-4">
            Ce Oferim
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1c1917] mb-4">
            Servicii Integrate
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Soluții complete pentru toate nevoile contabile, fiscale și juridice ale afacerii dumneavoastră.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group card-hover golden-border border-stone-200 bg-white"
              data-testid={`service-card-${index}`}
            >
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-[#134e4a]/5 rounded-sm flex items-center justify-center mb-4">
                  <service.icon className="service-icon text-[#134e4a]" size={28} />
                </div>
                <CardTitle className="font-display text-xl text-[#1c1917]">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-stone-500">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-stone-600">
                      <CheckCircle2 size={16} className="text-[#d97706]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Certifications Section
const CertificationsSection = () => {
  const certifications = [
    {
      title: "CECCAR",
      fullName: "Corpul Experților Contabili și Contabililor Autorizați din România",
      description: "Membri activi cu drept de exercitare a profesiei de expert contabil și contabil autorizat."
    },
    {
      title: "Camera Consultanților Fiscali",
      fullName: "Consultant Fiscal Autorizat",
      description: "Certificare pentru consultanță fiscală și reprezentare în fața autorităților fiscale."
    },
    {
      title: "UNPIR",
      fullName: "Uniunea Națională a Practicienilor în Insolvență din România",
      description: "Specializare în proceduri de insolvență și reorganizare judiciară."
    },
    {
      title: "Barou Timiș",
      fullName: "Avocați înscriși în Baroul Timiș",
      description: "Consultanță și reprezentare juridică prin avocați autorizați."
    }
  ];

  return (
    <section id="certificari" className="py-24 bg-[#fafaf9]" data-testid="certifications-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[#d97706] text-sm font-semibold uppercase tracking-wider mb-4">
            Autorizații și Certificări
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1c1917] mb-4">
            Profesioniști Autorizați
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Deținem toate certificările necesare pentru a oferi servicii de contabilitate, 
            fiscalitate și consultanță juridică în România.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-sm border border-stone-200 card-hover flex gap-6"
              data-testid={`certification-${index}`}
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#134e4a] rounded-sm flex items-center justify-center">
                  <Award className="text-white" size={32} />
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-[#1c1917] mb-1">
                  {cert.title}
                </h3>
                <p className="text-sm text-[#d97706] font-medium mb-2">
                  {cert.fullName}
                </p>
                <p className="text-stone-600 text-sm">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Salary Calculator Component
const SalaryCalculator = () => {
  const [grossSalary, setGrossSalary] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateSalary = async () => {
    if (!grossSalary || parseFloat(grossSalary) <= 0) {
      toast.error("Introduceți un salariu brut valid");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${API}/calculator/salary`, {
        gross_salary: parseFloat(grossSalary)
      });
      setResult(response.data);
    } catch (error) {
      toast.error("Eroare la calculare. Încercați din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="space-y-6" data-testid="salary-calculator">
      <div className="space-y-4">
        <div>
          <Label htmlFor="gross-salary" className="text-stone-700 font-medium">
            Salariu Brut (RON)
          </Label>
          <Input
            id="gross-salary"
            type="number"
            placeholder="Ex: 8000"
            value={grossSalary}
            onChange={(e) => setGrossSalary(e.target.value)}
            className="mt-2 h-12 border-stone-200 focus:border-[#134e4a] focus:ring-[#134e4a]/20"
            data-testid="gross-salary-input"
          />
        </div>
        
        <Button 
          onClick={calculateSalary}
          disabled={isLoading}
          className="w-full h-12 bg-[#134e4a] hover:bg-[#0f3d3a] text-white font-semibold uppercase tracking-wider"
          data-testid="calculate-salary-btn"
        >
          {isLoading ? "Se calculează..." : "Calculează Salariu Net"}
        </Button>
      </div>

      {result && (
        <div className="space-y-4 pt-6 border-t border-stone-200" data-testid="salary-result">
          <div className="bg-[#134e4a] text-white p-6 rounded-sm">
            <p className="text-sm opacity-80 mb-1">Salariu Net</p>
            <p className="font-mono text-3xl font-bold">{formatCurrency(result.net_salary)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-stone-50 p-4 rounded-sm">
              <p className="text-xs text-stone-500 mb-1">CAS (Pensie 25%)</p>
              <p className="font-mono text-lg font-semibold text-[#1c1917]">{formatCurrency(result.cas)}</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-sm">
              <p className="text-xs text-stone-500 mb-1">CASS (Sănătate 10%)</p>
              <p className="font-mono text-lg font-semibold text-[#1c1917]">{formatCurrency(result.cass)}</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-sm">
              <p className="text-xs text-stone-500 mb-1">Impozit Venit (10%)</p>
              <p className="font-mono text-lg font-semibold text-[#1c1917]">{formatCurrency(result.income_tax)}</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-sm">
              <p className="text-xs text-stone-500 mb-1">Total Rețineri</p>
              <p className="font-mono text-lg font-semibold text-[#1c1917]">{formatCurrency(result.total_deductions)}</p>
            </div>
          </div>

          <p className="text-xs text-stone-500 text-center">
            * Calcul orientativ bazat pe legislația fiscală 2025. Pentru calcule personalizate, contactați-ne.
          </p>
        </div>
      )}
    </div>
  );
};

// Tax Comparator Component
const TaxComparator = () => {
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [hasEmployees, setHasEmployees] = useState(false);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const compareTaxes = async () => {
    if (!revenue || parseFloat(revenue) <= 0) {
      toast.error("Introduceți venitul lunar");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${API}/calculator/tax-comparison`, {
        monthly_revenue: parseFloat(revenue),
        monthly_expenses: parseFloat(expenses) || 0,
        has_employees: hasEmployees
      });
      setResult(response.data);
    } catch (error) {
      toast.error("Eroare la comparare. Încercați din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6" data-testid="tax-comparator">
      <div className="space-y-4">
        <div>
          <Label htmlFor="revenue" className="text-stone-700 font-medium">
            Venit Lunar Estimat (RON)
          </Label>
          <Input
            id="revenue"
            type="number"
            placeholder="Ex: 20000"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            className="mt-2 h-12 border-stone-200 focus:border-[#134e4a] focus:ring-[#134e4a]/20"
            data-testid="revenue-input"
          />
        </div>

        <div>
          <Label htmlFor="expenses" className="text-stone-700 font-medium">
            Cheltuieli Lunare Estimate (RON)
          </Label>
          <Input
            id="expenses"
            type="number"
            placeholder="Ex: 5000"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            className="mt-2 h-12 border-stone-200 focus:border-[#134e4a] focus:ring-[#134e4a]/20"
            data-testid="expenses-input"
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <Label htmlFor="has-employees" className="text-stone-700 font-medium cursor-pointer">
            Aveți angajați?
          </Label>
          <Switch
            id="has-employees"
            checked={hasEmployees}
            onCheckedChange={setHasEmployees}
            data-testid="has-employees-switch"
          />
        </div>

        <Button 
          onClick={compareTaxes}
          disabled={isLoading}
          className="w-full h-12 bg-[#134e4a] hover:bg-[#0f3d3a] text-white font-semibold uppercase tracking-wider"
          data-testid="compare-taxes-btn"
        >
          {isLoading ? "Se compară..." : "Compară Opțiunile Fiscale"}
        </Button>
      </div>

      {result && (
        <div className="space-y-4 pt-6 border-t border-stone-200" data-testid="tax-result">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Micro */}
            <div className="bg-white border-2 border-stone-200 p-5 rounded-sm hover:border-[#134e4a] transition-colors">
              <h4 className="font-display font-semibold text-[#1c1917] mb-1">{result.micro.name}</h4>
              <p className="text-xs text-[#d97706] font-medium mb-3">Impozit: {result.micro.tax_rate}</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-stone-500">Net Lunar</p>
                  <p className="font-mono text-xl font-bold text-[#134e4a]">{formatCurrency(result.micro.monthly_net)}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-500">Taxe Lunare</p>
                  <p className="font-mono text-sm text-stone-600">{formatCurrency(result.micro.monthly_tax)}</p>
                </div>
              </div>
              <p className="text-xs text-stone-400 mt-3">{result.micro.notes}</p>
            </div>

            {/* SRL */}
            <div className="bg-white border-2 border-stone-200 p-5 rounded-sm hover:border-[#134e4a] transition-colors">
              <h4 className="font-display font-semibold text-[#1c1917] mb-1">{result.srl.name}</h4>
              <p className="text-xs text-[#d97706] font-medium mb-3">Impozit: {result.srl.tax_rate}</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-stone-500">Net Lunar</p>
                  <p className="font-mono text-xl font-bold text-[#134e4a]">{formatCurrency(result.srl.monthly_net)}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-500">Taxe Lunare</p>
                  <p className="font-mono text-sm text-stone-600">{formatCurrency(result.srl.monthly_tax)}</p>
                </div>
              </div>
              <p className="text-xs text-stone-400 mt-3">{result.srl.notes}</p>
            </div>

            {/* PFA */}
            <div className="bg-white border-2 border-stone-200 p-5 rounded-sm hover:border-[#134e4a] transition-colors">
              <h4 className="font-display font-semibold text-[#1c1917] mb-1">{result.pfa.name}</h4>
              <p className="text-xs text-[#d97706] font-medium mb-3">Impozit: {result.pfa.tax_rate}</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-stone-500">Net Lunar</p>
                  <p className="font-mono text-xl font-bold text-[#134e4a]">{formatCurrency(result.pfa.monthly_net)}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-500">Taxe Lunare</p>
                  <p className="font-mono text-sm text-stone-600">{formatCurrency(result.pfa.monthly_tax)}</p>
                </div>
              </div>
              <p className="text-xs text-stone-400 mt-3">{result.pfa.notes}</p>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-[#d97706]/10 border border-[#d97706]/20 p-4 rounded-sm">
            <p className="text-sm text-[#1c1917] font-medium">
              <span className="text-[#d97706]">Recomandare:</span> {result.recommendation}
            </p>
          </div>

          <p className="text-xs text-stone-500 text-center">
            * Calcul orientativ. Situația fiscală reală poate varia. Contactați-ne pentru o analiză personalizată.
          </p>
        </div>
      )}
    </div>
  );
};

// Calculators Section
const CalculatorsSection = () => {
  return (
    <section id="calculatoare" className="py-24 bg-white" data-testid="calculators-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[#d97706] text-sm font-semibold uppercase tracking-wider mb-4">
            Instrumente Utile
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1c1917] mb-4">
            Calculatoare Fiscale 2025
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Calculați rapid salariul net sau comparați opțiunile fiscale pentru afacerea dumneavoastră.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="salary" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-stone-100 p-1 rounded-sm">
              <TabsTrigger 
                value="salary" 
                className="data-[state=active]:bg-[#134e4a] data-[state=active]:text-white rounded-sm py-3 font-medium"
                data-testid="tab-salary"
              >
                <Calculator size={16} className="mr-2" />
                Calculator Salariu
              </TabsTrigger>
              <TabsTrigger 
                value="tax" 
                className="data-[state=active]:bg-[#134e4a] data-[state=active]:text-white rounded-sm py-3 font-medium"
                data-testid="tab-tax"
              >
                <Scale size={16} className="mr-2" />
                Comparator Taxe
              </TabsTrigger>
            </TabsList>

            <Card className="border-stone-200">
              <CardContent className="pt-6">
                <TabsContent value="salary" className="mt-0">
                  <div className="mb-6">
                    <h3 className="font-display text-xl font-semibold text-[#1c1917] mb-2">
                      Calculator Salariu Brut - Net 2025
                    </h3>
                    <p className="text-sm text-stone-500">
                      Calculați salariul net din salariul brut folosind cotele de contribuții valabile în 2025.
                    </p>
                  </div>
                  <SalaryCalculator />
                </TabsContent>

                <TabsContent value="tax" className="mt-0">
                  <div className="mb-6">
                    <h3 className="font-display text-xl font-semibold text-[#1c1917] mb-2">
                      Comparator Micro vs SRL vs PFA
                    </h3>
                    <p className="text-sm text-stone-500">
                      Comparați obligațiile fiscale pentru diferite forme de organizare juridică.
                    </p>
                  </div>
                  <TaxComparator />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="despre" className="py-24 bg-[#fafaf9]" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1687696162729-a75f9ddc004d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxUaW1pc29hcmElMjBSb21hbmlhJTIwVW5pcmlpJTIwU3F1YXJlJTIwbGFuZG1hcmt8ZW58MHx8fHwxNzczOTkxMjYyfDA&ixlib=rb-4.1.0&q=85"
              alt="Timișoara - Piața Unirii"
              className="w-full h-[400px] object-cover rounded-sm shadow-xl"
              data-testid="about-image"
            />
            <div className="absolute -bottom-8 -right-8 bg-[#134e4a] text-white p-6 rounded-sm shadow-xl">
              <p className="font-display text-4xl font-bold">2003</p>
              <p className="text-sm opacity-80">Anul înființării</p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="inline-block text-[#d97706] text-sm font-semibold uppercase tracking-wider">
              Despre Noi
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1c1917]">
              O Echipă Dedicată
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Casini a fost fondată în 2003 și este una dintre cele mai respectate firme de 
              contabilitate din Timișoara. Suntem o echipă profesionistă dedicată, care își 
              aduce contribuția cu pasiune și expertiză în serviciile de contabilitate și consultanță fiscală.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Cu peste 20 de ani de experiență, am construit relații de lungă durată cu 
              clienții noștri, oferindu-le suportul necesar pentru a-și dezvolta afacerile 
              în conformitate cu legislația în vigoare.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#134e4a]/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Users className="text-[#134e4a]" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-[#1c1917]">Echipă Dedicată</p>
                  <p className="text-sm text-stone-500">Profesioniști experimentați</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#134e4a]/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Award className="text-[#134e4a]" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-[#1c1917]">20+ Ani</p>
                  <p className="text-sm text-stone-500">De experiență</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (value) => {
    setFormData({ ...formData, service: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Completați câmpurile obligatorii");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API}/contact`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: ""
        });
      }
    } catch (error) {
      toast.error("Eroare la trimiterea mesajului. Încercați din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-[#d97706] text-sm font-semibold uppercase tracking-wider mb-4">
                Contact
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1c1917] mb-4">
                Hai să Discutăm
              </h2>
              <p className="text-stone-600">
                Suntem aici să vă ajutăm. Contactați-ne pentru o consultație gratuită.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#134e4a] rounded-sm flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-[#1c1917]">Adresă</p>
                  <p className="text-stone-600">{CONTACT.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#134e4a] rounded-sm flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-[#1c1917]">Telefon</p>
                  <a href={`tel:${CONTACT.phone}`} className="text-stone-600 hover:text-[#134e4a]">
                    {CONTACT.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#134e4a] rounded-sm flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-[#1c1917]">Email</p>
                  <a href={`mailto:${CONTACT.email}`} className="text-stone-600 hover:text-[#134e4a]">
                    {CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#134e4a] rounded-sm flex items-center justify-center flex-shrink-0">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-[#1c1917]">Program</p>
                  <p className="text-stone-600">{CONTACT.hours}</p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-sm overflow-hidden border border-stone-200 shadow-sm">
              <iframe
                title="Casini Contabilitate — Str. Cozia 1b, Timișoara"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.5!2d21.2087!3d45.7489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sStr.+Cozia+1b%2C+Timi%C8%99oara!5e0!3m2!1sro!2sro!4v1700000000000"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-stone-200 shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-xl">Trimite un Mesaj</CardTitle>
                <CardDescription>Completează formularul și te vom contacta în cel mai scurt timp.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nume *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Numele dumneavoastră"
                        className="mt-1.5 h-11 border-stone-200"
                        required
                        data-testid="contact-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@exemplu.ro"
                        className="mt-1.5 h-11 border-stone-200"
                        required
                        data-testid="contact-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+40 7XX XXX XXX"
                        className="mt-1.5 h-11 border-stone-200"
                        data-testid="contact-phone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Companie</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Numele firmei"
                        className="mt-1.5 h-11 border-stone-200"
                        data-testid="contact-company"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="service">Serviciu de interes</Label>
                    <Select value={formData.service} onValueChange={handleServiceChange}>
                      <SelectTrigger className="mt-1.5 h-11 border-stone-200" data-testid="contact-service">
                        <SelectValue placeholder="Selectează un serviciu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contabilitate">Contabilitate</SelectItem>
                        <SelectItem value="fiscalitate">Consultanță Fiscală</SelectItem>
                        <SelectItem value="anaf">Reprezentare ANAF</SelectItem>
                        <SelectItem value="juridic">Consultanță Juridică</SelectItem>
                        <SelectItem value="infiintare">Înființare Firme</SelectItem>
                        <SelectItem value="salarizare">Salarizare</SelectItem>
                        <SelectItem value="altele">Altele</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Mesaj *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Descrieți pe scurt nevoia dumneavoastră..."
                      className="mt-1.5 min-h-[120px] border-stone-200"
                      required
                      data-testid="contact-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-[#134e4a] hover:bg-[#0f3d3a] text-white font-semibold uppercase tracking-wider"
                    data-testid="contact-submit"
                  >
                    {isSubmitting ? "Se trimite..." : "Trimite Mesajul"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-[#1c1917] text-white py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#134e4a] rounded-sm flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">C</span>
              </div>
              <span className="font-display text-2xl font-semibold">Casini</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Expertiză contabilă și consultanță fiscală de peste 20 de ani în Timișoara.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-[#d97706]">Servicii</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><a href="#servicii" className="hover:text-white transition-colors">Contabilitate</a></li>
              <li><a href="#servicii" className="hover:text-white transition-colors">Consultanță Fiscală</a></li>
              <li><a href="#servicii" className="hover:text-white transition-colors">Reprezentare ANAF</a></li>
              <li><a href="#servicii" className="hover:text-white transition-colors">Consultanță Juridică</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-[#d97706]">Utile</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link to="/calculator-salariu" className="hover:text-white transition-colors">Calculator Salariu</Link></li>
              <li><Link to="/comparator-taxe" className="hover:text-white transition-colors">Comparator Taxe</Link></li>
              <li><Link to="/intrebari-frecvente" className="hover:text-white transition-colors">Întrebări Frecvente</Link></li>
              <li><a href="#despre" className="hover:text-white transition-colors">Despre Noi</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-[#d97706]">Contact</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-[#d97706]" />
                {CONTACT.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#d97706]" />
                <a href={`tel:${CONTACT.phone}`} className="hover:text-white transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#d97706]" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-[#d97706]" />
                {CONTACT.hours}
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-stone-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} Casini. Toate drepturile rezervate.</p>
          <div className="flex items-center gap-4">
            <Link to="/politica-confidentialitate" className="hover:text-white transition-colors">Confidențialitate</Link>
            <span>|</span>
            <Link to="/termeni-si-conditii" className="hover:text-white transition-colors">Termeni</Link>
            <span>|</span>
            <span>Membru CECCAR</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Home Component
const Home = () => {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <Helmet>
        <title>Casini — Contabilitate & Consultanță Fiscală Timișoara | Din 2003</title>
        <meta name="description" content="Casini — firmă de contabilitate în Timișoara, fondată în 2003. Servicii complete de contabilitate, consultanță fiscală, salarizare, înființare firme și reprezentare ANAF. Membri CECCAR. Peste 500 de clienți." />
        <link rel="canonical" href="https://www.casini.ro/" />
      </Helmet>
      <div className="noise-overlay" />
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <CertificationsSection />
        <CalculatorsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

// FAQ Page — highest GEO value (AI search engines extract Q&A content)
const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Cât costă serviciile de contabilitate în Timișoara?",
      answer: "Costul serviciilor de contabilitate variază în funcție de tipul firmei, numărul de documente și complexitatea activității. La Casini, oferim pachete personalizate începând de la 500 RON/lună pentru micro-întreprinderi și de la 800 RON/lună pentru SRL-uri cu activitate medie. Contactați-ne pentru o ofertă personalizată gratuită."
    },
    {
      question: "Ce documente am nevoie pentru înființarea unui SRL?",
      answer: "Pentru înființarea unui SRL aveți nevoie de: actele de identitate ale asociaților, dovada sediului social (contract de închiriere sau act de proprietate), specimen de semnătură, declarație pe proprie răspundere, dovada capitalului social (minim 1 RON), cererea de înregistrare la Registrul Comerțului și actul constitutiv. Casini vă asistă cu întregul proces."
    },
    {
      question: "Care este diferența între micro-întreprindere și impozit pe profit?",
      answer: "Micro-întreprinderile plătesc impozit pe venit (1% sau 3% din cifra de afaceri), nu pe profit. SRL-urile cu impozit pe profit plătesc 16% din profitul net. Micro-întreprinderea este avantajoasă când marja de profit este mare (>10-15%), iar impozitul pe profit convine când cheltuielile sunt ridicate și profitul mic. Limita pentru micro-întreprinderi este de 500.000 EUR cifră de afaceri."
    },
    {
      question: "Cum se calculează salariul net din brut în 2025?",
      answer: "Din salariul brut se rețin: CAS (contribuția la pensii) — 25%, CASS (contribuția la sănătate) — 10%, și impozitul pe venit — 10% din baza de calcul (brut - CAS - CASS - deducere personală). Exemplu: la un brut de 5.000 RON, salariul net este aproximativ 2.955 RON. Folosiți calculatorul nostru gratuit pentru calcule exacte."
    },
    {
      question: "Ce este un PFA și când merită să înființezi unul?",
      answer: "PFA (Persoană Fizică Autorizată) este o formă de organizare pentru activități independente. Merită când: lucrați ca freelancer sau consultant, aveți un singur client principal, venituri sub 100.000 EUR/an, și doriți simplitate administrativă. Dezavantajele includ răspundere nelimitată și contribuții sociale obligatorii indiferent de venit."
    },
    {
      question: "Când trebuie să mă înregistrez ca plătitor de TVA?",
      answer: "Înregistrarea ca plătitor de TVA este obligatorie când cifra de afaceri depășește plafonul de 300.000 RON (aproximativ 60.000 EUR) într-un an fiscal. Puteți opta și pentru înregistrare voluntară, avantajoasă dacă aveți clienți plătitori de TVA sau investiții mari. Casini vă ajută cu evaluarea și procedura de înregistrare."
    },
    {
      question: "Ce declarații fiscale trebuie depuse lunar?",
      answer: "Principalele declarații lunare sunt: Declarația 112 (contribuții sociale și impozit pe salarii), Declarația 300 (decontul de TVA, pentru plătitorii de TVA), și Declarația 100 (impozit pe venit micro-întreprinderi, trimestrial). Termenul general de depunere este data de 25 a lunii următoare."
    },
    {
      question: "Cum aleg un contabil de încredere în Timișoara?",
      answer: "Verificați: 1) Să fie membru CECCAR (Corpul Experților Contabili), 2) Experiența în domeniul dumneavoastră de activitate, 3) Referințe de la alți clienți, 4) Disponibilitatea pentru comunicare, 5) Transparența prețurilor. Casini este membră CECCAR din 2003, cu peste 500 de clienți și certificări multiple (Camera Consultanților Fiscali, UNPIR, Baroul Timiș)."
    },
    {
      question: "Ce se întâmplă dacă nu depun declarațiile fiscale la timp?",
      answer: "Nedepunerea declarațiilor la termen atrage amenzi între 1.000 și 5.000 RON pentru persoane juridice și între 500 și 1.000 RON pentru PFA. În plus, se calculează dobânzi și penalități de întârziere de 0,01% pe zi pentru impozitele neplătite. ANAF poate aplica și popriri pe conturi bancare."
    },
    {
      question: "Casini oferă servicii de consultanță juridică?",
      answer: "Da, echipa Casini include avocați înscriși în Baroul Timiș, specializați în drept comercial și fiscal. Oferim consultanță juridică pentru: înființare și modificare firme, contracte comerciale, litigii fiscale, reprezentare în fața instanțelor și a ANAF, proceduri de insolvență (membri UNPIR)."
    },
    {
      question: "Pot să îmi schimb contabilul în cursul anului?",
      answer: "Da, puteți schimba contabilul oricând. Procedura implică: predarea documentelor contabile de la vechiul contabil, verificarea situațiilor financiare existente și preluarea evidenței contabile. Casini asigură o tranziție lină și verifică corectitudinea documentelor preluate, fără costuri suplimentare pentru preluare."
    },
    {
      question: "Ce servicii oferă Casini pentru firmele nou-înființate?",
      answer: "Pentru start-up-uri, Casini oferă: asistență la înființare (acte constitutive, înregistrare ONRC, obținere CUI), alegerea formei optime de impozitare (micro vs. profit), înregistrare TVA (dacă este cazul), organizarea contabilității de la zero, consultanță privind obligațiile fiscale și contractele de muncă, și pachete speciale de preț pentru primul an."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <Helmet>
        <title>Întrebări Frecvente — Contabilitate & Fiscalitate | Casini Timișoara</title>
        <meta name="description" content="Răspunsuri la cele mai frecvente întrebări despre contabilitate, fiscalitate, înființare SRL, PFA, TVA, salarizare și obligații fiscale în România. Ghid actualizat 2025." />
        <link rel="canonical" href="https://www.casini.ro/intrebari-frecvente" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="noise-overlay" />
      <Navigation />
      <main className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[#d97706] text-sm font-semibold uppercase tracking-wider mb-4">
              Întrebări Frecvente
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1c1917] mb-4">
              Ghid Contabilitate & Fiscalitate România
            </h1>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Răspunsuri verificate de experții contabili Casini, membri CECCAR. Actualizat pentru 2025.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-stone-200 rounded-sm bg-white">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                >
                  <h2 className="font-semibold text-[#1c1917] text-base">{faq.question}</h2>
                  <ChevronRight
                    size={20}
                    className={`text-[#134e4a] flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-stone-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-stone-600 mb-4">Nu ați găsit răspunsul?</p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#134e4a] text-white px-8 py-4 rounded-sm text-sm font-semibold uppercase tracking-wider hover:bg-[#0f3d3a] transition-colors"
            >
              Contactați-ne
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Privacy Policy Page
const PrivacyPolicyPage = () => (
  <div className="min-h-screen bg-[#fafaf9]">
    <Helmet>
      <title>Politica de Confidențialitate | Casini Contabilitate Timișoara</title>
      <meta name="description" content="Politica de confidențialitate Casini. Cum colectăm, folosim și protejăm datele dumneavoastră personale conform GDPR." />
      <link rel="canonical" href="https://www.casini.ro/politica-confidentialitate" />
    </Helmet>
    <div className="noise-overlay" />
    <Navigation />
    <main className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 prose prose-stone">
        <h1 className="font-display text-3xl font-bold text-[#1c1917] mb-8">Politica de Confidențialitate</h1>
        <p className="text-sm text-stone-500 mb-8">Ultima actualizare: 23 martie 2026</p>

        <h2 className="font-display text-xl font-semibold text-[#1c1917] mt-8 mb-4">1. Cine suntem</h2>
        <p className="text-stone-600 mb-4">Casini este o firmă de contabilitate și consultanță fiscală cu sediul în Timișoara, Str. Cozia 1b. Suntem operatorul datelor dumneavoastră personale colectate prin intermediul acestui website.</p>

        <h2 className="font-display text-xl font-semibold text-[#1c1917] mt-8 mb-4">2. Ce date colectăm</h2>
        <p className="text-stone-600 mb-2">Colectăm următoarele categorii de date:</p>
        <ul className="list-disc pl-6 text-stone-600 space-y-2 mb-4">
          <li><strong>Date din formularul de contact:</strong> nume, email, telefon, mesaj — furnizate voluntar de dumneavoastră.</li>
          <li><strong>Date de utilizare:</strong> pagini vizitate, timp petrecut, dispozitiv — colectate prin PostHog pentru îmbunătățirea experienței.</li>
          <li><strong>Date din calculatoare:</strong> valorile introduse în calculatoarele financiare nu sunt stocate și sunt procesate doar pentru a furniza rezultatul.</li>
        </ul>

        <h2 className="font-display text-xl font-semibold text-[#1c1917] mt-8 mb-4">3. Scopul prelucrării</h2>
        <p className="text-stone-600 mb-4">Folosim datele pentru: răspuns la solicitări prin formularul de contact, îmbunătățirea serviciilor și a website-ului, comunicări comerciale (doar cu consimțământul dumneavoastră explicit).</p>

        <h2 className="font-display text-xl font-semibold text-[#1c1917] mt-8 mb-4">4. Drepturile dumneavoastră (GDPR)</h2>
        <p className="text-stone-600 mb-2">Conform Regulamentului General privind Protecția Datelor (GDPR), aveți dreptul la:</p>
        <ul className="list-disc pl-6 text-stone-600 space-y-2 mb-4">
          <li>Acces la datele personale</li>
          <li>Rectificarea datelor inexacte</li>
          <li>Ștergerea datelor ("dreptul de a fi uitat")</li>
          <li>Restricționarea prelucrării</li>
          <li>Portabilitatea datelor</li>
          <li>Opoziția la prelucrare</li>
        </ul>
        <p className="text-stone-600 mb-4">Pentru exercitarea acestor drepturi, contactați-ne la: <a href="mailto:casini2003@yahoo.com" className="text-[#134e4a] hover:underline">casini2003@yahoo.com</a></p>

        <h2 className="font-display text-xl font-semibold text-[#1c1917] mt-8 mb-4">5. Contact</h2>
        <p className="text-stone-600">Pentru orice întrebări legate de protecția datelor, ne puteți contacta la adresa de email casini2003@yahoo.com sau la sediul nostru din Str. Cozia 1b, Timișoara.</p>
      </div>
    </main>
    <Footer />
  </div>
);

// Salary Calculator Landing Page
const SalaryCalculatorPage = () => {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cum calculezi salariul net din brut în România (2025)",
    "description": "Ghid pas cu pas pentru calcularea salariului net din salariul brut, cu explicarea contribuțiilor sociale și a impozitului pe venit conform legislației fiscale 2025.",
    "step": [
      {"@type": "HowToStep", "name": "Introduceți salariul brut", "text": "Introduceți suma salariului brut lunar în câmpul dedicat (de exemplu, 5.000 RON)."},
      {"@type": "HowToStep", "name": "Calculul CAS (25%)", "text": "Din salariul brut se reține contribuția la pensii (CAS) de 25%. Exemplu: 5.000 × 25% = 1.250 RON."},
      {"@type": "HowToStep", "name": "Calculul CASS (10%)", "text": "Se reține contribuția la sănătate (CASS) de 10%. Exemplu: 5.000 × 10% = 500 RON."},
      {"@type": "HowToStep", "name": "Calculul impozitului pe venit (10%)", "text": "Impozitul pe venit de 10% se aplică pe baza de calcul: Brut - CAS - CASS - Deducere personală. Exemplu: (5.000 - 1.250 - 500) × 10% = 325 RON."},
      {"@type": "HowToStep", "name": "Obțineți salariul net", "text": "Salariul net = Brut - CAS - CASS - Impozit pe venit. Exemplu: 5.000 - 1.250 - 500 - 325 = 2.925 RON."}
    ]
  };

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <Helmet>
        <title>Calculator Salariu Brut - Net 2025 România | Casini Timișoara</title>
        <meta name="description" content="Calculator salariu brut-net 2025 actualizat cu cotele din România. Calculează CAS 25%, CASS 10%, impozit pe venit 10% și salariul net. Gratuit, rapid, precis." />
        <link rel="canonical" href="https://www.casini.ro/calculator-salariu" />
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>
      <div className="noise-overlay" />
      <Navigation />
      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-[#d97706] text-sm font-semibold uppercase tracking-wider mb-4">
              Instrument Gratuit
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1c1917] mb-4">
              Calculator Salariu Brut - Net 2025
            </h1>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Calculați instant salariul net din brut folosind cotele de contribuții valabile în România pentru 2025.
              Verificat de experții contabili Casini, membri CECCAR.
            </p>
          </div>

          {/* Calculator */}
          <Card className="border-stone-200 shadow-lg mb-12">
            <CardContent className="pt-6">
              <SalaryCalculator />
            </CardContent>
          </Card>

          {/* Educational Content */}
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#1c1917] mb-4">
                Cum se calculează salariul net în 2025?
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                În România, din salariul brut se rețin trei contribuții obligatorii înainte de a ajunge la salariul net pe care îl primiți efectiv în mână. Aceste rețineri sunt stabilite prin Codul Fiscal și se aplică uniform tuturor salariaților.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-sm border border-stone-200">
                <div className="w-12 h-12 bg-[#134e4a]/10 rounded-sm flex items-center justify-center mb-4">
                  <span className="font-display font-bold text-[#134e4a] text-lg">25%</span>
                </div>
                <h3 className="font-display font-semibold text-[#1c1917] mb-2">CAS — Contribuția la Pensii</h3>
                <p className="text-sm text-stone-600">
                  Contribuția de asigurări sociale (CAS) de 25% din brut finanțează sistemul public de pensii. Se reține integral din salariul angajatului.
                </p>
              </div>
              <div className="bg-white p-6 rounded-sm border border-stone-200">
                <div className="w-12 h-12 bg-[#134e4a]/10 rounded-sm flex items-center justify-center mb-4">
                  <span className="font-display font-bold text-[#134e4a] text-lg">10%</span>
                </div>
                <h3 className="font-display font-semibold text-[#1c1917] mb-2">CASS — Contribuția la Sănătate</h3>
                <p className="text-sm text-stone-600">
                  Contribuția de asigurări sociale de sănătate (CASS) de 10% din brut oferă acces la serviciile medicale din sistemul public.
                </p>
              </div>
              <div className="bg-white p-6 rounded-sm border border-stone-200">
                <div className="w-12 h-12 bg-[#134e4a]/10 rounded-sm flex items-center justify-center mb-4">
                  <span className="font-display font-bold text-[#134e4a] text-lg">10%</span>
                </div>
                <h3 className="font-display font-semibold text-[#1c1917] mb-2">Impozit pe Venit</h3>
                <p className="text-sm text-stone-600">
                  Impozitul pe venit de 10% se aplică pe baza de calcul (Brut − CAS − CASS − deducere personală), nu direct pe brut.
                </p>
              </div>
            </div>

            <div className="bg-[#134e4a]/5 border border-[#134e4a]/10 p-6 rounded-sm">
              <h3 className="font-display font-semibold text-[#1c1917] mb-3">Exemplu concret: Salariu brut 5.000 RON</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-stone-500 mb-1">CAS (25%)</p>
                  <p className="font-mono font-semibold text-[#1c1917]">−1.250 RON</p>
                </div>
                <div>
                  <p className="text-stone-500 mb-1">CASS (10%)</p>
                  <p className="font-mono font-semibold text-[#1c1917]">−500 RON</p>
                </div>
                <div>
                  <p className="text-stone-500 mb-1">Impozit (~10%)</p>
                  <p className="font-mono font-semibold text-[#1c1917]">−325 RON</p>
                </div>
                <div>
                  <p className="text-stone-500 mb-1">Salariu Net</p>
                  <p className="font-mono font-bold text-[#134e4a] text-lg">2.925 RON</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#1c1917] mb-4">
                Ce este deducerea personală?
              </h2>
              <p className="text-stone-600 leading-relaxed mb-3">
                Deducerea personală este o sumă scutită de impozit, acordată salariaților cu venituri brute de până la 2.000 RON. Pentru salarii între 2.001 și 4.000 RON, deducerea este degresivă. Peste 4.000 RON brut, deducerea personală este zero.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Deducerea crește cu 100 RON pentru fiecare persoană aflată în întreținere (copii, soț/soție fără venituri), până la maximum 4 persoane.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#1c1917] mb-4">
                Salariu minim pe economie 2025
              </h2>
              <p className="text-stone-600 leading-relaxed">
                Salariul minim brut pe economie în 2025 este de <strong>4.050 RON</strong>, ceea ce înseamnă un salariu net de aproximativ <strong>2.363 RON</strong>. Pentru sectorul construcțiilor și industria alimentară se aplică un salariu minim diferențiat.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center bg-white p-8 rounded-sm border border-stone-200">
            <h3 className="font-display text-xl font-semibold text-[#1c1917] mb-3">
              Aveți nevoie de calcule personalizate?
            </h3>
            <p className="text-stone-600 mb-6">
              Echipa Casini vă poate ajuta cu calculul salarial complet, inclusiv sporuri, bonusuri, concedii și contribuții speciale.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#134e4a] text-white px-8 py-4 rounded-sm text-sm font-semibold uppercase tracking-wider hover:bg-[#0f3d3a] transition-colors"
            >
              Solicită Consultație Gratuită
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Tax Comparator Landing Page
const TaxComparatorPage = () => {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cum compari regimurile fiscale Micro vs SRL vs PFA în România (2025)",
    "description": "Ghid pentru alegerea formei optime de organizare juridică și fiscală: micro-întreprindere, SRL cu impozit pe profit, sau PFA.",
    "step": [
      {"@type": "HowToStep", "name": "Introduceți venitul lunar", "text": "Estimați venitul lunar brut al afacerii (cifra de afaceri lunară)."},
      {"@type": "HowToStep", "name": "Introduceți cheltuielile", "text": "Estimați cheltuielile lunare (chirii, materiale, servicii, salarii etc.)."},
      {"@type": "HowToStep", "name": "Indicați dacă aveți angajați", "text": "Prezența angajaților influențează eligibilitatea pentru micro-întreprindere (cotă 3% vs 1%)."},
      {"@type": "HowToStep", "name": "Comparați rezultatele", "text": "Analizați netul lunar și taxele pentru fiecare formă juridică și alegeți varianta optimă."}
    ]
  };

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <Helmet>
        <title>Comparator Taxe: Micro vs SRL vs PFA 2025 | Casini Timișoara</title>
        <meta name="description" content="Compară obligațiile fiscale pentru micro-întreprindere, SRL cu impozit pe profit și PFA în 2025. Calculator gratuit + ghid explicativ complet." />
        <link rel="canonical" href="https://www.casini.ro/comparator-taxe" />
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>
      <div className="noise-overlay" />
      <Navigation />
      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-[#d97706] text-sm font-semibold uppercase tracking-wider mb-4">
              Instrument Gratuit
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1c1917] mb-4">
              Comparator Taxe: Micro vs SRL vs PFA 2025
            </h1>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Aflați care formă juridică este cea mai avantajoasă fiscal pentru afacerea dumneavoastră.
              Calcul actualizat conform Codului Fiscal 2025.
            </p>
          </div>

          {/* Calculator */}
          <Card className="border-stone-200 shadow-lg mb-12">
            <CardContent className="pt-6">
              <TaxComparator />
            </CardContent>
          </Card>

          {/* Educational Content */}
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#1c1917] mb-4">
                Cele 3 forme de impozitare în România
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                Alegerea formei juridice și a regimului fiscal este una dintre cele mai importante decizii pentru un antreprenor.
                Fiecare opțiune are avantaje și dezavantaje diferite, în funcție de cifra de afaceri, cheltuieli și planurile de dezvoltare.
              </p>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-sm border-2 border-[#d97706]/30">
                <div className="inline-flex items-center gap-2 bg-[#d97706]/10 text-[#d97706] px-3 py-1 rounded-sm text-xs font-semibold mb-4">
                  Cel mai popular
                </div>
                <h3 className="font-display text-lg font-semibold text-[#1c1917] mb-3">Micro-întreprindere</h3>
                <p className="text-2xl font-mono font-bold text-[#134e4a] mb-4">1% sau 3%</p>
                <ul className="space-y-2 text-sm text-stone-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#d97706] mt-0.5 flex-shrink-0" />
                    Impozit pe venit, nu pe profit
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#d97706] mt-0.5 flex-shrink-0" />
                    1% fără angajați, 3% cu angajați
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#d97706] mt-0.5 flex-shrink-0" />
                    Limită: 500.000 EUR CA/an
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#d97706] mt-0.5 flex-shrink-0" />
                    Ideal pentru marje mari de profit
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-sm border border-stone-200">
                <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-600 px-3 py-1 rounded-sm text-xs font-semibold mb-4">
                  Cheltuieli mari
                </div>
                <h3 className="font-display text-lg font-semibold text-[#1c1917] mb-3">SRL — Impozit pe Profit</h3>
                <p className="text-2xl font-mono font-bold text-[#134e4a] mb-4">16%</p>
                <ul className="space-y-2 text-sm text-stone-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#d97706] mt-0.5 flex-shrink-0" />
                    Impozit pe profit (venit − cheltuieli)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#d97706] mt-0.5 flex-shrink-0" />
                    Cheltuielile reduc baza impozabilă
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#d97706] mt-0.5 flex-shrink-0" />
                    Fără limită de cifră de afaceri
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#d97706] mt-0.5 flex-shrink-0" />
                    Ideal pentru cheltuieli ridicate
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-sm border border-stone-200">
                <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-600 px-3 py-1 rounded-sm text-xs font-semibold mb-4">
                  Freelanceri
                </div>
                <h3 className="font-display text-lg font-semibold text-[#1c1917] mb-3">PFA — Persoană Fizică</h3>
                <p className="text-2xl font-mono font-bold text-[#134e4a] mb-4">10%</p>
                <ul className="space-y-2 text-sm text-stone-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#d97706] mt-0.5 flex-shrink-0" />
                    Impozit 10% pe venitul net
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#d97706] mt-0.5 flex-shrink-0" />
                    CAS 25% + CASS 10% obligatorii
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#d97706] mt-0.5 flex-shrink-0" />
                    Răspundere nelimitată
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#d97706] mt-0.5 flex-shrink-0" />
                    Administrare simplă
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#134e4a]/5 border border-[#134e4a]/10 p-6 rounded-sm">
              <h3 className="font-display font-semibold text-[#1c1917] mb-3">Când să alegi fiecare variantă?</h3>
              <div className="space-y-3 text-sm text-stone-600">
                <p><strong className="text-[#1c1917]">Micro-întreprindere</strong> — Marja de profit peste 15%, cifra de afaceri sub 500.000 EUR. Cele mai multe firme mici și mijlocii din România sunt micro-întreprinderi.</p>
                <p><strong className="text-[#1c1917]">SRL cu impozit pe profit</strong> — Cheltuieli mari (peste 60-70% din venituri), activități de producție sau prestări servicii cu costuri ridicate, sau depășirea plafonului de micro.</p>
                <p><strong className="text-[#1c1917]">PFA</strong> — Freelanceri, consultanți, activități cu un singur client, venituri sub 100.000 EUR/an, fără necesitatea protecției de răspundere limitată.</p>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#1c1917] mb-4">
                Modificări Cod Fiscal 2025
              </h2>
              <p className="text-stone-600 leading-relaxed mb-3">
                Principalele modificări fiscale din 2025 care afectează alegerea formei juridice:
              </p>
              <ul className="space-y-2 text-stone-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#d97706] mt-1 flex-shrink-0" />
                  Plafonul pentru micro-întreprinderi rămâne la 500.000 EUR cifră de afaceri anuală
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#d97706] mt-1 flex-shrink-0" />
                  Cotele de impozit pe veniturile micro: 1% (fără angajați) și 3% (cu angajați)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#d97706] mt-1 flex-shrink-0" />
                  Impozitul pe dividende rămâne 8%
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#d97706] mt-1 flex-shrink-0" />
                  Contribuțiile sociale CAS (25%) și CASS (10%) rămân neschimbate
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center bg-white p-8 rounded-sm border border-stone-200">
            <h3 className="font-display text-xl font-semibold text-[#1c1917] mb-3">
              Nu sunteți sigur ce formă juridică vi se potrivește?
            </h3>
            <p className="text-stone-600 mb-6">
              Experții contabili Casini analizează situația dumneavoastră concretă și vă recomandă varianta fiscală optimă, cu economii reale.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#134e4a] text-white px-8 py-4 rounded-sm text-sm font-semibold uppercase tracking-wider hover:bg-[#0f3d3a] transition-colors"
            >
              Solicită Analiză Fiscală Gratuită
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Terms of Service Page
const TermsPage = () => (
  <div className="min-h-screen bg-[#fafaf9]">
    <Helmet>
      <title>Termeni și Condiții | Casini Contabilitate Timișoara</title>
      <meta name="description" content="Termenii și condițiile de utilizare a website-ului Casini. Informații despre serviciile de contabilitate și consultanță fiscală." />
      <link rel="canonical" href="https://www.casini.ro/termeni-si-conditii" />
    </Helmet>
    <div className="noise-overlay" />
    <Navigation />
    <main className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 prose prose-stone">
        <h1 className="font-display text-3xl font-bold text-[#1c1917] mb-8">Termeni și Condiții</h1>
        <p className="text-sm text-stone-500 mb-8">Ultima actualizare: 23 martie 2026</p>

        <h2 className="font-display text-xl font-semibold text-[#1c1917] mt-8 mb-4">1. Informații generale</h2>
        <p className="text-stone-600 mb-4">Acest website este operat de Casini, firmă de contabilitate și consultanță fiscală cu sediul în Timișoara, Str. Cozia 1b. Prin accesarea și utilizarea acestui website, acceptați acești termeni și condiții.</p>

        <h2 className="font-display text-xl font-semibold text-[#1c1917] mt-8 mb-4">2. Serviciile oferite</h2>
        <p className="text-stone-600 mb-4">Website-ul oferă informații despre serviciile noastre de contabilitate, consultanță fiscală, salarizare și înființare firme. Calculatoarele financiare disponibile au caracter informativ și nu constituie consultanță fiscală profesională.</p>

        <h2 className="font-display text-xl font-semibold text-[#1c1917] mt-8 mb-4">3. Limitarea răspunderii</h2>
        <p className="text-stone-600 mb-4">Rezultatele calculatoarelor financiare sunt estimative și pot diferi de calculele finale. Pentru situații concrete, vă recomandăm să ne contactați pentru o consultație personalizată. Casini nu răspunde pentru decizii luate exclusiv pe baza informațiilor de pe website.</p>

        <h2 className="font-display text-xl font-semibold text-[#1c1917] mt-8 mb-4">4. Proprietatea intelectuală</h2>
        <p className="text-stone-600 mb-4">Conținutul acestui website (texte, imagini, design, logo) este proprietatea Casini și este protejat de legislația privind drepturile de autor. Reproducerea fără acord scris este interzisă.</p>

        <h2 className="font-display text-xl font-semibold text-[#1c1917] mt-8 mb-4">5. Contact</h2>
        <p className="text-stone-600">Pentru orice întrebări, ne puteți contacta la <a href="mailto:casini2003@yahoo.com" className="text-[#134e4a] hover:underline">casini2003@yahoo.com</a> sau la telefon <a href="tel:+40722123456" className="text-[#134e4a] hover:underline">+40 722 123 456</a>.</p>
      </div>
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator-salariu" element={<SalaryCalculatorPage />} />
          <Route path="/comparator-taxe" element={<TaxComparatorPage />} />
          <Route path="/intrebari-frecvente" element={<FAQPage />} />
          <Route path="/politica-confidentialitate" element={<PrivacyPolicyPage />} />
          <Route path="/termeni-si-conditii" element={<TermsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
