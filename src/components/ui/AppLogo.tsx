import Image from "next/image";

export const AppLogo = ({ size = 30 }: { size?: number }) => {
  return (
    <Image
      src={"/easeinv-logo.png"}
      alt="ease-inv"
      width={size}
      height={size}
    />
  );
};

export const AppLogoFull = ({ size = 30 }: { size?: number }) => {
  return (
    <Image
      src={"/easeinv-logo-full.png"}
      alt="ease-inv"
      width={size}
      height={size}
    />
  );
};
