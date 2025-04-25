
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { CoachProfileForm } from "@/components/coach/CoachProfileForm";

const CoachProfile = () => {
  return (
    <DashboardLayout title="Coach Profile">
      <div className="max-w-6xl mx-auto space-y-6 p-6">
        <CoachProfileForm />
      </div>
    </DashboardLayout>
  );
};

export default CoachProfile;
