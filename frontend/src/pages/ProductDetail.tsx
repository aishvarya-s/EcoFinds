import { useState } from "react";
import { ArrowLeft, Heart, Share, MessageCircle, ShoppingCart, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import phoneProduct from "@/assets/phone-product.jpg";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data - in real app, this would be fetched based on id
  const product = {
    id: id || "1",
    title: "iPhone 15 Pro Max - Excellent Condition",
    price: 899,
    category: "Electronics",
    image: phoneProduct,
    location: "New York, NY",
    description: "Selling my iPhone 15 Pro Max in excellent condition. Barely used, comes with original box, charger, and screen protector already applied. Battery health is at 100%. No scratches or damage. Perfect for someone looking for a premium phone at a great price.",
    seller: {
      name: "John Smith",
      avatar: "",
      rating: 4.8,
      reviewCount: 24,
      memberSince: "2022-03-15",
    },
    postedDate: "2024-01-15",
    views: 142,
  };

  const handleAddToCart = () => {
    toast.success("Added to cart!");
  };

  const handleContactSeller = () => {
    toast.info("Contact seller functionality would be implemented here");
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b shadow-soft">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(-1)}
              className="hover:bg-muted/50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleFavorite}
                className="hover:bg-muted/50"
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="hover:bg-muted/50"
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-white/90 text-foreground">
                  {product.category}
                </Badge>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {product.title}
              </h1>
              <p className="text-3xl font-bold text-primary mb-4">
                ${product.price.toLocaleString()}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {product.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Posted {new Date(product.postedDate).toLocaleDateString()}
                </span>
                <span>{product.views} views</span>
              </div>
            </div>

            {/* Description */}
            <Card className="marketplace-card">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card className="marketplace-card">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Seller Information</h3>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={product.seller.avatar} />
                    <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{product.seller.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>★ {product.seller.rating} ({product.seller.reviewCount} reviews)</span>
                      <span>•</span>
                      <span>Member since {new Date(product.seller.memberSince).getFullYear()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button 
                className="gradient-primary text-white"
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={handleContactSeller}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Seller
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;