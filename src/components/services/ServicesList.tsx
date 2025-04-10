
import React, { useState } from "react";
import { 
  Plus, Edit, Trash2, DollarSign, EyeOff, Eye, 
  RepeatIcon, Check, X, Loader2, ArrowUpDown
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

type Service = {
  id: string;
  name: string;
  price: number;
  isRecurring: boolean;
  visibleToClients: boolean;
  stripeProductId: string | null;
};

const mockServices: Service[] = [
  {
    id: "1",
    name: "Initial Consultation",
    price: 150,
    isRecurring: false,
    visibleToClients: true,
    stripeProductId: "prod_123456",
  },
  {
    id: "2",
    name: "Follow-up Session",
    price: 100,
    isRecurring: false,
    visibleToClients: true,
    stripeProductId: null,
  },
  {
    id: "3",
    name: "Monthly Coaching",
    price: 200,
    isRecurring: true,
    visibleToClients: true,
    stripeProductId: "prod_789012",
  },
];

// Mock Stripe products
const mockStripeProducts = [
  { id: "prod_123456", name: "Initial Consultation", price: 150 },
  { id: "prod_789012", name: "Monthly Coaching", price: 200 },
  { id: "prod_345678", name: "Premium Plan", price: 300 },
];

const ServicesList = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [isEditingService, setIsEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Partial<Service>>({
    name: "",
    price: 0,
    isRecurring: false,
    visibleToClients: true,
    stripeProductId: null,
  });
  const [isStripeSync, setIsStripeSync] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateService = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const serviceToAdd = {
        id: `${Date.now()}`,
        name: newService.name || "New Service",
        price: newService.price || 0,
        isRecurring: newService.isRecurring || false,
        visibleToClients: newService.visibleToClients !== false,
        stripeProductId: isStripeSync ? (newService.stripeProductId || null) : null,
      };
      
      setServices([...services, serviceToAdd]);
      setNewService({
        name: "",
        price: 0,
        isRecurring: false,
        visibleToClients: true,
        stripeProductId: null,
      });
      setIsCreatingService(false);
      setIsLoading(false);
      
      toast.success("Service created successfully");
    }, 1000);
  };

  const handleEditService = () => {
    if (!isEditingService) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedServices = services.map(service => 
        service.id === isEditingService.id 
          ? {
              ...service,
              name: newService.name || service.name,
              price: newService.price !== undefined ? newService.price : service.price,
              isRecurring: newService.isRecurring !== undefined ? newService.isRecurring : service.isRecurring,
              visibleToClients: newService.visibleToClients !== undefined ? newService.visibleToClients : service.visibleToClients,
              stripeProductId: isStripeSync ? (newService.stripeProductId || service.stripeProductId) : null,
            }
          : service
      );
      
      setServices(updatedServices);
      setIsEditingService(null);
      setNewService({
        name: "",
        price: 0,
        isRecurring: false,
        visibleToClients: true,
        stripeProductId: null,
      });
      setIsLoading(false);
      
      toast.success("Service updated successfully");
    }, 1000);
  };

  const handleDeleteService = (id: string) => {
    // Simulate API call
    setServices(services.filter(service => service.id !== id));
    toast.success("Service deleted successfully");
  };

  const startEditing = (service: Service) => {
    setIsEditingService(service);
    setNewService({
      name: service.name,
      price: service.price,
      isRecurring: service.isRecurring,
      visibleToClients: service.visibleToClients,
      stripeProductId: service.stripeProductId,
    });
    setIsStripeSync(!!service.stripeProductId);
  };

  const closeDialog = () => {
    setIsCreatingService(false);
    setIsEditingService(null);
    setNewService({
      name: "",
      price: 0,
      isRecurring: false,
      visibleToClients: true,
      stripeProductId: null,
    });
    setIsStripeSync(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Clinic Services</h2>
        <Button onClick={() => setIsCreatingService(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Service
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Service Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Recurring</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Stripe Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                No services created yet. Click "Add Service" to get started.
              </TableCell>
            </TableRow>
          ) : (
            services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>${service.price.toFixed(2)}</TableCell>
                <TableCell>
                  {service.isRecurring ? (
                    <span className="flex items-center text-green-600">
                      <RepeatIcon className="h-4 w-4 mr-1" /> Yes
                    </span>
                  ) : (
                    "No"
                  )}
                </TableCell>
                <TableCell>
                  {service.visibleToClients ? (
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
                  {service.stripeProductId ? (
                    <span className="flex items-center text-green-600">
                      <Check className="h-4 w-4 mr-1" /> Synced
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
                    onClick={() => startEditing(service)}
                    className="h-8 w-8 p-0 mr-1"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteService(service.id)}
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

      {/* Create/Edit Service Dialog */}
      <Dialog
        open={isCreatingService || !!isEditingService}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
      >
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {isEditingService ? "Edit Service" : "Create New Service"}
            </DialogTitle>
            <DialogDescription>
              {isEditingService
                ? "Update the details of your existing service."
                : "Add a new service to your clinic offerings."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
                className="col-span-3"
                placeholder="Service name"
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
                value={newService.price}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                className="col-span-3"
                placeholder="0.00"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Recurring</Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  checked={newService.isRecurring}
                  onCheckedChange={(checked) =>
                    setNewService({ ...newService, isRecurring: checked })
                  }
                />
                <span className="text-sm text-gray-500">
                  {newService.isRecurring
                    ? "This is a recurring service"
                    : "This is a one-time service"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Visibility</Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  checked={newService.visibleToClients}
                  onCheckedChange={(checked) =>
                    setNewService({ ...newService, visibleToClients: checked })
                  }
                />
                <span className="text-sm text-gray-500">
                  {newService.visibleToClients
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stripeProduct" className="text-right">
                  Stripe Product
                </Label>
                <Select
                  value={newService.stripeProductId || ""}
                  onValueChange={(value) =>
                    setNewService({ ...newService, stripeProductId: value })
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
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button 
              onClick={isEditingService ? handleEditService : handleCreateService}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditingService ? "Update Service" : "Create Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesList;
