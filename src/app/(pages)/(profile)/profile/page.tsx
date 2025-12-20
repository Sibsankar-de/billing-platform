import { HeaderNavbar } from "@/components/layout/navbar";
import { ProfileDetailsSection } from "@/components/modules/profile/ProfileDetailsSection";
import { StoreListSection } from "@/components/modules/profile/StoreListSection";

export default function ProfilePage() {
  return (
    <div>
      <HeaderNavbar />
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Profile & Stores</h1>
          <p className="text-gray-600">
            Manage your personal information and business stores
          </p>
        </div>

        <div className="space-y-8">
          {/* User Profile Section */}
          <ProfileDetailsSection />

          {/* Store list Section */}
          <StoreListSection />
        </div>
      </div>
    </div>
  );
}
