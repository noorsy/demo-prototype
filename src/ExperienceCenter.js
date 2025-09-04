import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "./PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { 
  PhoneIcon, 
  MicrophoneIcon, 
  ArrowRightIcon,
  PlayIcon,
  ClockIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";

const demoCards = [
  {
    id: "3p-medical",
    title: "3P Demo - Medical",
    description: "Medical debt collection demo with compliance checks",
    category: "Medical",
    type: "Third Party",
    status: "Active",
    duration: "5-8 min",
    features: ["FDCPA Compliance", "Medical Billing", "Payment Plans"],
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    badgeColor: "bg-blue-100 text-blue-800"
  },
  {
    id: "1p-medical",
    title: "1P Medical Self Pay Demo",
    description: "First-party medical self-pay collection demo",
    category: "Medical",
    type: "First Party",
    status: "Active",
    duration: "3-5 min",
    features: ["Self-Pay", "Payment Options", "Insurance Verification"],
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    badgeColor: "bg-green-100 text-green-800"
  },
  {
    id: "credit-card",
    title: "Credit Card Recovery",
    description: "Credit card debt recovery and payment arrangements",
    category: "Financial",
    type: "Third Party",
    status: "Active",
    duration: "4-6 min",
    features: ["Payment Plans", "Settlement Options", "Account Review"],
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    badgeColor: "bg-purple-100 text-purple-800"
  },
  {
    id: "auto-loan",
    title: "Auto Loan Recovery",
    description: "Automotive loan recovery and repossession prevention",
    category: "Automotive",
    type: "Third Party",
    status: "Active",
    duration: "6-8 min",
    features: ["Repossession Prevention", "Payment Plans", "Vehicle Recovery"],
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600",
    badgeColor: "bg-orange-100 text-orange-800"
  },
  {
    id: "student-loan",
    title: "Student Loan Assistance",
    description: "Student loan repayment assistance and consolidation",
    category: "Education",
    type: "First Party",
    status: "Active",
    duration: "7-10 min",
    features: ["Consolidation", "Income-Based Plans", "Forgiveness Programs"],
    color: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-600",
    badgeColor: "bg-indigo-100 text-indigo-800"
  },
  {
    id: "mortgage",
    title: "Mortgage Assistance",
    description: "Mortgage payment assistance and foreclosure prevention",
    category: "Real Estate",
    type: "First Party",
    status: "Active",
    duration: "8-12 min",
    features: ["Foreclosure Prevention", "Payment Plans", "Loan Modification"],
    color: "bg-teal-50 border-teal-200",
    iconColor: "text-teal-600",
    badgeColor: "bg-teal-100 text-teal-800"
  }
];

export default function ExperienceCenter() {
  const navigate = useNavigate();

  const handleDemoClick = (demoId) => {
    navigate(`/experience-center/${demoId}`);
  };

  return (
    <>
      <PageHeader title="Experience Center" />
      <div className="p-6">
        <div className="mb-6">
          <p className="text-gray-600 font-medium">Try our AI agents with different scenarios and use cases</p>
        </div>

        {/* Demo Cards Grid - 2 per row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {demoCards.map((demo) => (
            <Card 
              key={demo.id} 
              className={`${demo.color} hover:shadow-lg transition-all duration-200 cursor-pointer group`}
              onClick={() => handleDemoClick(demo.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-white ${demo.iconColor}`}>
                      <MicrophoneIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
                        {demo.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{demo.description}</p>
                    </div>
                  </div>
                  <Badge className={`${demo.badgeColor} text-xs`}>
                    {demo.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Demo Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <UserGroupIcon className="h-4 w-4" />
                        <span>{demo.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{demo.duration}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {demo.category}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    {demo.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Start Demo Button */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <PlayIcon className="h-4 w-4" />
                      <span>Click to start demo</span>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
