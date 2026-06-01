import { HeaderNavbar } from "@/components/modules/navbar/Navbar";

export default function GeneralPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HeaderNavbar />
      {children}
    </div>
  );
}
