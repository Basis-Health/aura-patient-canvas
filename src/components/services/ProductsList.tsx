import React, { useState } from "react";
import { 
  Plus, Edit, Trash2, DollarSign, EyeOff, Eye, 
  Check, X, Loader2, ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  visibleToClients: boolean;
  stripeProductId: string | null;
  stripePaymentLink: string | null;
  inStock: boolean;
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Supplement Pack",
    price: 45,
    description: "30-day supply of essential supplements",
    visibleToClients: true,
    stripeProductId: "prod_abc123",
    stripePaymentLink: "https://buy.stripe.com/test_abc123",
    inStock: true,
  },
  {
    id: "2",
    name: "Fitness Kit",
    price: 120,
    description: "Complete home fitness equipment kit",
    visibleToClients: true,
    stripeProductId: null,
    stripePaymentLink: null,
    inStock: true,
  },
  {
    id: "3",
    name: "Wellness Journal",
    price: 25,
    description: "90-day wellness tracking journal",
    visibleToClients: false,
    stripeProductId: null,
    stripePaymentLink: null,
    inStock: false,
  },
];

// Mock Stripe products
const mockStripeProducts = [
  { id: "prod_abc123", name: "Supplement Pack", price: 45 },
  { id: "prod_def456", name: "Premium Supplement", price: 65 },
  { id: "prod_ghi789", name: "Gift Card", price: 50 },
];

// Mock Stripe payment links
const mockStripePaymentLinks = [
  { id: "plink_123", url: "https://buy.stripe.com/test_abc123", name: "Supplement Pack Link" },
  { id: "plink_456", url: "https://buy.stripe.com/test_def456", name: "Premium Supplement Link" },
  { id: "plink_789", url: "https://buy.stripe.com/test_ghi789", name: "Gift Card Link" },
];

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    description: "",
    visibleToClients: true,
    stripeProductId: null,
    stripePaymentLink: null,
    inStock: true,
  });
  const [isStripeSync, setIsStripeSync] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateProduct = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const productToAdd = {
        id: `${Date.now()}`,
        name: newProduct.name || "New Product",
        price: newProduct.price || 0,
        description: newProduct.description || "",
        visibleToClients: newProduct.visibleToClients !== false,
        stripeProductId: isStripeSync ? (newProduct.stripeProductId || null) : null,
        stripePaymentLink: isStripeSync ? (newProduct.stripePaymentLink || null) : null,
        inStock: newProduct.inStock !== false,
      };
      
      setProducts([...products, productToAdd]);
      setNewProduct({
        name: "",
        price: 0,
        description: "",
        visibleToClients: true,
        stripeProductId: null,
        stripePaymentLink: null,
        inStock: true,
      });
      setIsCreatingProduct(false);
      setIsLoading(false);
      
      toast.success("Product created successfully");
    }, 1000);
  };

  const handleEditProduct = () => {
    if (!isEditingProduct) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedProducts = products.map(product => 
        product.id === isEditingProduct.id 
          ? {
              ...product,
              name: newProduct.name || product.name,
              price: newProduct.price !== undefined ? newProduct.price : product.price,
              description: newProduct.description || product.description,
              visibleToClients: newProduct.visibleToClients !== undefined ? newProduct.visibleToClients : product.visibleToClients,
              stripeProductId: isStripeSync ? (newProduct.stripeProductId || product.stripeProductId) : null,
              stripePaymentLink: isStripeSync ? (newProduct.stripePaymentLink || product.stripePaymentLink) : null,
              inStock: newProduct.inStock !== undefined ? newProduct.inStock : product.inStock,
            }
          : product
      );
      
      setProducts(updatedProducts);
      setIsEditingProduct(null);
      setNewProduct({
        name: "",
        price: 0,
        description: "",
        visibleToClients: true,
        stripeProductId: null,
        stripePaymentLink: null,
        inStock: true,
      });
      setIsLoading(false);
      
      toast.success("Product updated successfully");
    }, 1000);
  };

  const handleDeleteProduct = (id: string) => {
    // Simulate API call
    setProducts(products.filter(product => product.id !== id));
    toast.success("Product deleted successfully");
  };

  const startEditing = (product: Product) => {
    setIsEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      visibleToClients: product.visibleToClients,
      stripeProductId: product.stripeProductId,
      stripePaymentLink: product.stripePaymentLink,
      inStock: product.inStock,
    });
    setIsStripeSync(!!product.stripeProductId || !!product.stripePaymentLink);
  };

  const closeDrawer = () => {
    setIsCreatingProduct(false);
    setIsEditingProduct(null);
    setNewProduct({
      name: "",
      price: 0,
      description: "",
      visibleToClients: true,
      stripeProductId: null,
      stripePaymentLink: null,
      inStock: true,
    });
    setIsStripeSync(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Clinic Products</h2>
        <Button onClick={() => setIsCreatingProduct(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock Status</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Stripe Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                No products created yet. Click "Add Product" to get started.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <div>
                    {product.name}
                    <p className="text-xs text-gray-500 truncate max-w-[220px]">
                      {product.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  {product.inStock ? (
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                      Out of Stock
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {product.visibleToClients ? (
                    <span className="flex items-center text-green-600">
                      <Eye className="h-4 w-4 mr-1" /> Visible
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-500">
                      <EyeOff className="h-4 w-4 mr-1" /> Hidden
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {product.stripeProductId ? (
                    <span className="flex items-center text-green-600">
                      <Check className="h-4 w-4 mr-1" /> Synced
                      {product.stripePaymentLink && (
                        <a 
                          href={product.stripePaymentLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-500 hover:text-blue-700 inline-flex items-center"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" /> Link
                        </a>
                      )}
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-500">
                      <X className="h-4 w-4 mr-1" /> Not Synced
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEditing(product)}
                    className="h-8 w-8 p-0 mr-1"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Create/Edit Product Drawer */}
      <Sheet 
        open={isCreatingProduct || !!isEditingProduct}
        onOpenChange={(open) => {
          if (!open) closeDrawer();
        }}
      >
        <SheetContent side="right" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              {isEditingProduct ? "Edit Product" : "Create New Product"}
            </SheetTitle>
            <SheetDescription>
              {isEditingProduct
                ? "Update the details of your existing product."
                : "Add a new product to your clinic catalog."}
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="col-span-3"
                placeholder="Product name"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                className="col-span-3"
                placeholder="0.00"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="col-span-3"
                placeholder="Product description"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">In Stock</Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  checked={newProduct.inStock}
                  onCheckedChange={(checked) =>
                    setNewProduct({ ...newProduct, inStock: checked })
                  }
                />
                <span className="text-sm text-gray-500">
                  {newProduct.inStock
                    ? "Product is available for purchase"
                    : "Product is out of stock"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Visibility</Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  checked={newProduct.visibleToClients}
                  onCheckedChange={(checked) =>
                    setNewProduct({ ...newProduct, visibleToClients: checked })
                  }
                />
                <span className="text-sm text-gray-500">
                  {newProduct.visibleToClients
                    ? "Visible to clients"
                    : "Hidden from clients"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Stripe Integration</Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  checked={isStripeSync}
                  onCheckedChange={setIsStripeSync}
                />
                <span className="text-sm text-gray-500">
                  {isStripeSync
                    ? "Sync with Stripe"
                    : "Don't sync with Stripe"}
                </span>
              </div>
            </div>

            {isStripeSync && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stripeProduct" className="text-right">
                    Stripe Product
                  </Label>
                  <Select
                    value={newProduct.stripeProductId || ""}
                    onValueChange={(value) =>
                      setNewProduct({ ...newProduct, stripeProductId: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Create new product</SelectItem>
                      {mockStripeProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} - ${product.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stripePaymentLink" className="text-right">
                    Payment Link
                  </Label>
                  <Select
                    value={newProduct.stripePaymentLink || ""}
                    onValueChange={(value) =>
                      setNewProduct({ ...newProduct, stripePaymentLink: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a payment link" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No payment link</SelectItem>
                      {mockStripePaymentLinks.map((link) => (
                        <SelectItem key={link.id} value={link.url}>
                          {link.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={closeDrawer}>
              Cancel
            </Button>
            <Button 
              onClick={isEditingProduct ? handleEditProduct : handleCreateProduct}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditingProduct ? "Update Product" : "Create Product"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductsList;
