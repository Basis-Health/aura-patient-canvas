
// Update mockProtocol items to have the correct types
const mockProtocol = {
  id: "1",
  name: "Metabolic Health Protocol",
  startDate: "Feb 12, 2025",
  adherence: 76,
  status: 'active' as const,
  items: [
    {
      id: "1",
      type: 'supplement' as const,
      name: "Berberine 500mg",
      schedule: "3x daily with meals",
      adherence: 85,
      targetBiomarkers: ["HbA1c", "Fasting Glucose", "Insulin"],
      impact: 'positive' as const
    },
    {
      id: "2",
      type: 'exercise' as const,
      name: "Zone 2 Cardio",
      schedule: "30 min, 3x weekly",
      adherence: 45,
      targetBiomarkers: ["VO2 Max", "Resting Heart Rate"],
      impact: 'positive' as const
    },
    {
      id: "3",
      type: 'lifestyle' as const,
      name: "Sleep optimization",
      schedule: "8hrs nightly, 10pm-6am",
      adherence: 62,
      targetBiomarkers: ["Cortisol", "HRV"],
      impact: 'neutral' as const
    },
    {
      id: "4",
      type: 'diet' as const,
      name: "Low carb high protein",
      schedule: "Daily",
      adherence: 91,
      targetBiomarkers: ["LDL", "HDL", "Triglycerides"],
      impact: 'positive' as const
    }
  ]
};
