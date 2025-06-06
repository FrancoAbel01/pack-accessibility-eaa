import { BenefitsSection } from "../components/Pack/BenefitsSection";
import { Hero } from "../components/Pack/Hero";
import { LegalReputationSection } from "../components/Pack/LegalReputationSection";
import { PackageInclusions } from "../components/Pack/PackageInclusions";
import { PriceTermsSection } from "../components/Pack/PriceTermsSection";
import { TargetAudience } from "../components/Pack/TargetAudience";
import { TrustSection } from "../components/Pack/TrustSection";
import WebAccessibilityForm from "../components/Pack/WebAccessibilityForm";


export const PackAccessibility = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero/>
      <BenefitsSection/>
      <PackageInclusions/>
      <TargetAudience/>
      <LegalReputationSection/>
      <TrustSection/>
      <PriceTermsSection/>
      <WebAccessibilityForm/>
    </div>
  );
};