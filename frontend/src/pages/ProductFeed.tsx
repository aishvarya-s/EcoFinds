import { useState } from "react";
import { Search, Filter, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { useNavigate } from "react-router-dom";
import phoneProduct from "@/assets/phone-product.jpg";
import jacketProduct from "@/assets/jacket-product.jpg";
import headphonesProduct from "@/assets/headphones-product.jpg";

const ProductFeed = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Electronics", "Fashion", "Home", "Sports", "Books"];
  
  const mockProducts = [
    {
      id: "1",
      title: "iPhone 15 Pro Max - Excellent Condition",
      price: 899,
      category: "Electronics",
      image: phoneProduct,
      location: "New York",
      isFavorite: false,
    },
    {
      id: "2", 
      title: "Vintage Leather Jacket - Designer Brand",
      price: 120,
      category: "Fashion",
      image: jacketProduct,
      location: "Los Angeles",
      isFavorite: true,
    },
    {
      id: "3",
      title: "Sony WH-1000XM5 Wireless Headphones",
      price: 250,
      category: "Electronics", 
      image: headphonesProduct,
      location: "Chicago",
      isFavorite: false,
    },
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b shadow-soft">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 gradient-hero rounded-full flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-primary">MarketPlace</h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12"
            />
            <Button size="sm" variant="ghost" className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="whitespace-nowrap cursor-pointer transition-smooth hover:shadow-soft"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      <Navigation />
    </div>
  );
};

export default ProductFeed;