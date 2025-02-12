import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ElementType } from "react"; // ✅ Import React's ElementType

interface FeatureCardProps {
  icon: ElementType; // ✅ Corrected type
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <Icon className="h-8 w-8 mb-2 text-primary" /> {/* ✅ Icon is now a valid React component */}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
