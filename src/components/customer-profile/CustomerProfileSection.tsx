import { CUSTOMER_PROFILES, CUSTOMER_TRUST_ITEMS } from '../../data/customerProfiles';
import { CustomerProfileCard } from './CustomerProfileCard';
import { CustomerProfileHeading } from './CustomerProfileHeading';
import { CustomerTrustStrip } from './CustomerTrustStrip';

export function CustomerProfileSection() {
  return (
    <section
      id="customer-profile"
      className="scroll-mt-20 py-16 sm:py-24 lg:py-28 xl:py-[112px] bg-white border-b border-[#E5E7EB] overflow-x-clip"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <CustomerProfileHeading />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {CUSTOMER_PROFILES.map((profile, index) => (
            <CustomerProfileCard key={profile.id} profile={profile} index={index} />
          ))}
        </div>

        <CustomerTrustStrip items={CUSTOMER_TRUST_ITEMS} />
      </div>
    </section>
  );
}
