import { useHomeContent } from "@/hooks/use-site-data";

const AwardsMarquee = () => {
  const { data } = useHomeContent();
  const awards = data?.awards ?? [];

  return (
  <div className="py-8 border-y border-border overflow-hidden bg-secondary">
    <div className="flex animate-marquee whitespace-nowrap">
      {[...awards, ...awards].map((award, i) => (
        <span
          key={i}
          className="font-display text-lg md:text-xl text-muted-foreground/40 mx-8 md:mx-12 tracking-wide"
        >
          {award}
        </span>
      ))}
    </div>
  </div>
  );
};

export default AwardsMarquee;
