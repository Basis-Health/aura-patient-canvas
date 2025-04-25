
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

export const BillingSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>
          Manage your billing information and subscription
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-1">Current Plan</h4>
          <p className="text-sm text-gray-500 mb-4">Professional Plan - $49/month</p>
          <Button variant="outline" className="w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            Manage Subscription
          </Button>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-1">Payment Method</h4>
          <p className="text-sm text-gray-500 mb-4">Visa ending in 4242</p>
          <Button variant="outline" className="w-full">
            Update Payment Method
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
