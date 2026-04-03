import { motion } from "framer-motion";
import { Settings, Shield, Wallet, Building2 } from "lucide-react";

const DashboardSettings = () => (
  <div className="p-6 lg:p-8 max-w-[800px]">
    <div className="mb-6">
      <h1 className="text-2xl font-display font-bold text-foreground">Configuración</h1>
      <p className="text-sm text-muted-foreground mt-1">Gestión de cuenta y wallet</p>
    </div>

    <div className="space-y-4">
      {[
        { icon: Building2, title: "Datos del Hotel", desc: "Nombre, dirección, categoría y datos legales.", action: "Editar" },
        { icon: Wallet, title: "Wallet", desc: "Tu wallet se gestiona automáticamente. Polygon Network.", action: "Ver dirección" },
        { icon: Shield, title: "Verificación KYC", desc: "Estado: Verificado ✓ — ONCHAINID activo.", action: "Ver detalles" },
        { icon: Settings, title: "Preferencias", desc: "Notificaciones, idioma y zona horaria.", action: "Configurar" },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-card rounded-xl border border-border p-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
          <button className="text-xs text-primary font-medium hover:underline">{item.action}</button>
        </motion.div>
      ))}
    </div>
  </div>
);

export default DashboardSettings;
