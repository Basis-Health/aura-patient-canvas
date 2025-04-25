
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Database, CreditCard } from "lucide-react";

export const IntegrationSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>
          Connect with external services and tools
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Link className="h-4 w-4" />
            Healthcare Systems
          </h4>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Connect CRM
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Connect Telehealth
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Connect EHR
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Database className="h-4 w-4" />
            Lab Integrations
          </h4>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Connect Rupa Health
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Connect Quest
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Connect LabCorp
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment Processing
          </h4>
          <Button variant="outline" className="w-full justify-start">
            Connect Stripe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
