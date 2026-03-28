import logo from "@/assets/logo.png";
import { MapPin, Mail, Phone } from "lucide-react";

const footerSections = [
  {
    title: "Plataforma",
    links: [
      { label: "Cómo Funciona", href: "#flow" },
      { label: "Pool de Swaps", href: "#pool" },
      { label: "Membresías & Tarifas", href: "#pricing" },
      { label: "Hoteles", href: "/hoteles" },
    ],
  },
  {
    title: "Confianza",
    links: [
      { label: "Nuestras Garantías", href: "/garantias" },
      { label: "Código de Hospitalidad", href: "#hospitality" },
      { label: "Nuestros Valores", href: "#values" },
      { label: "Tecnología", href: "#technology" },
    ],
  },
  {
    title: "Información",
    links: [
      { label: "Preguntas Frecuentes", href: "/faq" },
      { label: "Consejos para Swappers", href: "/consejos" },
      { label: "Economía del Sistema", href: "#economy" },
      { label: "Beneficios", href: "#benefits" },
    ],
  },
  {
    title: "Cuenta",
    links: [
      { label: "Registrarse", href: "/register" },
      { label: "Iniciar Sesión", href: "/login" },
    ],
  },
];

const countries = ["Argentina", "Uruguay", "Chile", "Paraguay"];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Main grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 mb-2 lg:mb-0">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="Swap Hotels" className="h-9 w-auto" />
              <span className="font-display font-bold text-lg gold-text">Swap Hotels</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">
              La primera red de intercambio hotelero sin dinero de Latinoamérica.
            </p>
            <div className="flex flex-wrap gap-2">
              {countries.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-secondary px-2.5 py-1 rounded-full"
                >
                  <MapPin className="w-3 h-3" />
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-display font-semibold text-sm text-foreground mb-3">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact + bottom */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Swap Hotels. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <a href="mailto:info@swaphotels.com" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Mail className="w-3 h-3" />
              info@swaphotels.com
            </a>
            <span className="hidden sm:inline">·</span>
            <a href="#" className="hover:text-primary transition-colors">Términos y Condiciones</a>
            <span className="hidden sm:inline">·</span>
            <a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
