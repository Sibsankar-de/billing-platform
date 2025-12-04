import { LucideProps } from "lucide-react";

export type NavMenuType =  {
    id: string;
    label: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}