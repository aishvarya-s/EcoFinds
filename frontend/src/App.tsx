import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProductFeed from "./pages/ProductFeed";
import AddProduct from "./pages/AddProduct";
import MyListings from "./pages/MyListings";
import ProductDetail from "./pages/ProductDetail";
import UserDashboard from "./pages/UserDashboard";
import Cart from "./pages/Cart";
import PreviousPurchases from "./pages/PreviousPurchases";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductFeed />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchases" element={<PreviousPurchases />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;