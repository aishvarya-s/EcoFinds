import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    category: string;
    image: string;
    location?: string;
    isFavorite?: boolean;
  };
  onClick?: () => void;
  className?: string;
}

const ProductCard = ({ product, onClick, className }: ProductCardProps) => {
  return (
    <Card 
      className={cn("marketplace-card cursor-pointer group overflow-hidden", className)}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover transition-smooth group-hover:scale-105"
        />
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-smooth hover:bg-white">
          <Heart 
            className={cn(
              "h-4 w-4 transition-smooth",
              product.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            )} 
          />
        </button>
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {product.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-primary">
            ${product.price.toLocaleString()}
          </p>
          {product.location && (
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="h-3 w-3" />
              <span>{product.location}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;