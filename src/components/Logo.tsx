import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeMap = { sm: "h-10", md: "h-14", lg: "h-16" };
  return (
    <Link to="/" className={`inline-flex items-center ${className}`} aria-label="Home Decorative Interior">
      <img
        src="/home-decorative-logo.png"
        alt="Home Decorative Interior"
        className={`${sizeMap[size]} w-auto object-contain`}
      />
    </Link>
  );
};

export default Logo;
