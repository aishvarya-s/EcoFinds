import { useState } from "react";
import { Calendar, Package, Star, RefreshCw, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import phoneProduct from "@/assets/phone-product.jpg";
import jacketProduct from "@/assets/jacket-product.jpg";
import headphonesProduct from "@/assets/headphones-product.jpg";

interface Purchase {
  id: string;
  title: string;
  price: number;
  image: string;
  seller: string;
  orderDate: string;
  status: "Delivered" | "In Transit" | "Processing";
  trackingNumber?: string;
}

const PreviousPurchases = () => {
  const [purchases] = useState<Purchase[]>([
    {
      id: "1",
      title: "iPhone 15 Pro Max - Excellent Condition",
      price: 899,
      image: phoneProduct,
      seller: "John Smith",
      orderDate: "2024-01-10",
      status: "Delivered",
      trackingNumber: "TRK123456789",
    },
    {
      id: "2",
      title: "Vintage Leather Jacket - Designer Brand",
      price: 120,
      image: jacketProduct,
      seller: "Fashion Boutique",
      orderDate: "2024-01-05",
      status: "Delivered",
      trackingNumber: "TRK987654321",
    },
    {
      id: "3",
      title: "Sony WH-1000XM5 Wireless Headphones",
      price: 250,
      image: headphonesProduct,
      seller: "Tech Store",
      orderDate: "2024-01-15",
      status: "In Transit",
      trackingNumber: "TRK456789123",
    },
  ]);

  const deliveredItems = purchases.filter(p => p.status === "Delivered");
  const activeOrders = purchases.filter(p => p.status !== "Delivered");

  const handleReorder = (purchaseId: string) => {
    toast.info("Reorder functionality would be implemented here");
  };

  const handleLeaveReview = (purchaseId: string) => {
    toast.info("Review functionality would be implemented here");
  };

  const handleTrackOrder = (trackingNumber: string) => {
    toast.info(`Tracking order: ${trackingNumber}`);
  };

  const getStatusColor = (status: Purchase["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const PurchaseCard = ({ purchase }: { purchase: Purchase }) => (
    <Card className="marketplace-card">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img
            src={purchase.image}
            alt={purchase.title}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-foreground line-clamp-2">
                {purchase.title}
              </h3>
              <Badge className={getStatusColor(purchase.status)}>
                {purchase.status}
              </Badge>
            </div>
            
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Sold by {purchase.seller}</p>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(purchase.orderDate).toLocaleDateString()}
                </span>
                {purchase.trackingNumber && (
                  <span className="flex items-center gap-1">
                    <Package className="h-3 w-3" />
                    {purchase.trackingNumber}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <p className="text-lg font-bold text-primary">
                ${purchase.price.toLocaleString()}
              </p>
              
              <div className="flex items-center gap-2">
                {purchase.status === "Delivered" ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLeaveReview(purchase.id)}
                    >
                      <Star className="h-3 w-3 mr-1" />
                      Review
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReorder(purchase.id)}
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Reorder
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTrackOrder(purchase.trackingNumber!)}
                  >
                    <Package className="h-3 w-3 mr-1" />
                    Track
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b shadow-soft">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 gradient-hero rounded-full flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-primary">Purchase History</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              All Orders ({purchases.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger value="delivered">
              Delivered ({deliveredItems.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4 mt-6">
            {purchases.length === 0 ? (
              <div className="text-center py-16">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No purchases yet</h2>
                <p className="text-muted-foreground">Your purchase history will appear here</p>
              </div>
            ) : (
              purchases.map((purchase) => (
                <PurchaseCard key={purchase.id} purchase={purchase} />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="active" className="space-y-4 mt-6">
            {activeOrders.length === 0 ? (
              <div className="text-center py-16">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No active orders</h2>
                <p className="text-muted-foreground">Your current orders will appear here</p>
              </div>
            ) : (
              activeOrders.map((purchase) => (
                <PurchaseCard key={purchase.id} purchase={purchase} />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="delivered" className="space-y-4 mt-6">
            {deliveredItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No delivered items</h2>
                <p className="text-muted-foreground">Your delivered orders will appear here</p>
              </div>
            ) : (
              deliveredItems.map((purchase) => (
                <PurchaseCard key={purchase.id} purchase={purchase} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Navigation />
    </div>
  );
};

export default PreviousPurchases;