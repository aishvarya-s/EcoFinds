import { Home, Plus, User, ShoppingCart, History, Package } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const navItems = [
    { to: "/products", icon: Home, label: "Feed" },
    { to: "/add-product", icon: Plus, label: "Add" },
    { to: "/my-listings", icon: Package, label: "Listings" },
    { to: "/cart", icon: ShoppingCart, label: "Cart" },
    { to: "/dashboard", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-smooth text-xs",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;