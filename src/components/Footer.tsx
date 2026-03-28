import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import { MapPin, Mail, ArrowUpRight, Globe, Shield, Zap } from "lucide-react";

const footerSections = [
  {
    title: "Plataforma",
    links: [
      { label: "Cómo Funciona", href: "/como-funciona" },
      { label: "Membresías & Tarifas", href: "/membresias" },
      { label: "Hoteles", href: "/hoteles" },
    ],
  },
  {
    title: "Confianza",
    links: [
      { label: "Cancelaciones & Sanciones", href: "/cancelaciones" },
      { label: "Nuestras Garantías", href: "/garantias" },
      { label: "Nuestros Valores", href: "/valores" },
    ],
  },
  {
    title: "Información",
    links: [
      { label: "Preguntas Frecuentes", href: "/faq" },
      { label: "Consejos", href: "/consejos" },
    ],
  },
];

const countries = [
  { name: "Argentina", flag: "🇦🇷" },
  { name: "Uruguay", flag: "🇺🇾" },
  { name: "Chile", flag: "🇨🇱" },
  { name: "Paraguay", flag: "🇵🇾" },
];

const highlights = [
  { icon: Globe, label: "Red Latinoamericana" },
  { icon: Shield, label: "Verificación Real" },
  { icon: Zap, label: "Sin Intermediarios" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Navy gradient background */}
      <div className="absolute inset-0 bg-[hsl(var(--navy))]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(215,30%,16%)] via-[hsl(var(--navy))] to-[hsl(215,35%,8%)]" />
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      <div className="relative z-10">
        {/* CTA Banner */}
        <div className="border-b border-white/10">
          <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
                  Sumá tu hotel a la red
                </h3>
                <p className="text-white/50 text-sm max-w-md">
                  Convertí noches vacías en oportunidades. Sin comisiones, sin intermediarios.
                </p>
              </div>
              <a
                href="/register"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20"
              >
                Registrarse ahora
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Highlights bar */}
        <div className="border-b border-white/10">
          <div className="container mx-auto px-4 sm:px-6 py-5">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <div key={h.label} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-white/60 tracking-wide uppercase">{h.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand column */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-2 mb-2 lg:mb-0 pr-0 lg:pr-8">
              <a href="/" className="flex items-center gap-3 mb-5">
                <img src={logo} alt="Swap Hotels" className="h-10 w-auto" />
                <span className="font-display font-bold text-xl text-white">
                  Swap Hotels
                </span>
              </a>
              <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-sm">
                La primera red de intercambio hotelero sin dinero de Latinoamérica. Colaboración real entre profesionales de la industria.
              </p>

              {/* Country flags */}
              <div className="flex flex-wrap gap-2">
                {countries.map((c) => (
                  <span
                    key={c.name}
                    className="inline-flex items-center gap-1.5 text-xs text-white/50 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <span className="text-sm">{c.flag}</span>
                    {c.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-display font-semibold text-xs text-white/30 uppercase tracking-widest mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/60 hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} Swap Hotels. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap items-center gap-5 text-xs text-white/30">
              <a href="mailto:info@swaphotels.com" className="flex items-center gap-1.5 hover:text-white/60 transition-colors">
                <Mail className="w-3.5 h-3.5" />
                info@swaphotels.com
              </a>
              <span className="hidden sm:inline text-white/10">|</span>
              <a href="#" className="hover:text-white/60 transition-colors">Términos</a>
              <span className="hidden sm:inline text-white/10">|</span>
              <a href="#" className="hover:text-white/60 transition-colors">Privacidad</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
