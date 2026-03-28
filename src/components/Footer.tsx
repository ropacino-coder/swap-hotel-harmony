import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Swap Hotels" className="h-8 w-auto" />
            <span className="font-display font-semibold gold-text">
              Swap Hotels
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Swap Hotels. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Términos
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
