
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServicesList from "@/components/services/ServicesList";
import ProductsList from "@/components/services/ProductsList";

const ServicesProducts = () => {
  return (
    <DashboardLayout title="Services & Products">
      <Tabs defaultValue="services" className="w-full">
        <TabsList>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="services" className="mt-6">
          <ServicesList />
        </TabsContent>
        <TabsContent value="products" className="mt-6">
          <ProductsList />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ServicesProducts;
