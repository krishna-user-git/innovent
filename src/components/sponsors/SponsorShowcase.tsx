import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Heart, Building2 } from "lucide-react";
import { Sponsor } from "@/types/database";
import { cn } from "@/lib/utils";

interface SponsorShowcaseProps {
  sponsors: Sponsor[];
  title?: string;
  showTiers?: boolean;
}

const tierConfig = {
  platinum: {
    label: "Platinum",
    bgColor: "bg-gradient-to-r from-gray-300 to-gray-100",
    textColor: "text-gray-800",
    borderColor: "border-gray-300",
    size: "h-24 w-48",
  },
  gold: {
    label: "Gold",
    bgColor: "bg-gradient-to-r from-gold/80 to-gold/60",
    textColor: "text-gray-900",
    borderColor: "border-gold",
    size: "h-20 w-40",
  },
  silver: {
    label: "Silver",
    bgColor: "bg-gradient-to-r from-gray-400 to-gray-300",
    textColor: "text-gray-800",
    borderColor: "border-gray-400",
    size: "h-16 w-32",
  },
  bronze: {
    label: "Bronze",
    bgColor: "bg-gradient-to-r from-orange-700/80 to-orange-600/60",
    textColor: "text-white",
    borderColor: "border-orange-600",
    size: "h-14 w-28",
  },
};

const groupSponsorsByTier = (sponsors: Sponsor[]) => {
  const groups: Record<string, Sponsor[]> = {
    platinum: [],
    gold: [],
    silver: [],
    bronze: [],
  };

  sponsors.forEach((sponsor) => {
    const tier = sponsor.tier.toLowerCase();
    if (groups[tier]) {
      groups[tier].push(sponsor);
    } else {
      groups.bronze.push(sponsor);
    }
  });

  return groups;
};

export const SponsorShowcase = ({
  sponsors,
  title = "Our Sponsors",
  showTiers = true,
}: SponsorShowcaseProps) => {
  const groupedSponsors = groupSponsorsByTier(sponsors);
  const orderedTiers = ["platinum", "gold", "silver", "bronze"];

  if (sponsors.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="py-12 text-center">
          <Heart className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No sponsors yet</p>
          <p className="text-gray-500 text-sm">
            Interested in sponsoring? Contact us!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Building2 className="h-5 w-5 text-gold" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {orderedTiers.map((tier) => {
            const tierSponsors = groupedSponsors[tier];
            if (tierSponsors.length === 0) return null;

            const config = tierConfig[tier as keyof typeof tierConfig];

            return (
              <div key={tier}>
                {showTiers && (
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={cn(config.bgColor, config.textColor)}>
                      {config.label} Sponsors
                    </Badge>
                    <div className="flex-1 h-px bg-gray-700" />
                  </div>
                )}

                <div className="flex flex-wrap justify-center gap-6">
                  {tierSponsors.map((sponsor) => (
                    <div
                      key={sponsor.id}
                      className={cn(
                        "group relative rounded-lg border-2 p-4 flex items-center justify-center transition-all hover:scale-105 cursor-pointer",
                        config.borderColor,
                        config.size,
                        "bg-white"
                      )}
                      onClick={() =>
                        sponsor.website_url &&
                        window.open(sponsor.website_url, "_blank")
                      }
                    >
                      {sponsor.logo_url ? (
                        <img
                          src={sponsor.logo_url}
                          alt={sponsor.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <span className="text-gray-800 font-semibold text-center">
                          {sponsor.name}
                        </span>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gray-900/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-center p-2">
                          <p className="text-white font-medium text-sm mb-1">
                            {sponsor.name}
                          </p>
                          {sponsor.website_url && (
                            <Button size="sm" variant="secondary" className="h-7 text-xs">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Visit
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
