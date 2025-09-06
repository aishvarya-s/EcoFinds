import { useState } from "react";
import { Plus, Edit, Trash2, Eye, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import phoneProduct from "@/assets/phone-product.jpg";
import jacketProduct from "@/assets/jacket-product.jpg";

const MyListings = () => {
  const navigate = useNavigate();
  
  const [listings, setListings] = useState([
    {
      id: "1",
      title: "iPhone 15 Pro Max - Excellent Condition",
      price: 899,
      category: "Electronics",
      image: phoneProduct,
      status: "Active",
      views: 24,
      datePosted: "2024-01-15",
    },
    {
      id: "2",
      title: "Vintage Leather Jacket - Designer Brand", 
      price: 120,
      category: "Fashion",
      image: jacketProduct,
      status: "Sold",
      views: 18,
      datePosted: "2024-01-10",
    },
  ]);

  const handleDelete = (id: string) => {
    setListings(listings.filter(listing => listing.id !== id));
    toast.success("Listing deleted successfully");
  };

  const handleEdit = (id: string) => {
    toast.info("Edit functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b shadow-soft">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 gradient-hero rounded-full flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-primary">My Listings</h1>
            </div>
            <Button 
              onClick={() => navigate("/add-product")}
              className="gradient-primary text-white"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {listings.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No listings yet</h2>
            <p className="text-muted-foreground mb-6">Start by adding your first product</p>
            <Button 
              onClick={() => navigate("/add-product")}
              className="gradient-primary text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Product
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((listing) => (
              <Card key={listing.id} className="marketplace-card">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full md:w-32 h-32 object-cover rounded-lg"
                      />
                      <Badge 
                        variant={listing.status === "Active" ? "default" : "secondary"}
                        className="absolute top-2 left-2"
                      >
                        {listing.status}
                      </Badge>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">
                            {listing.title}
                          </h3>
                          <p className="text-lg font-bold text-primary mb-2">
                            ${listing.price.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{listing.category}</span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {listing.views} views
                            </span>
                            <span>Posted {new Date(listing.datePosted).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/product/${listing.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(listing.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(listing.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Navigation />
    </div>
  );
};

export default MyListings;