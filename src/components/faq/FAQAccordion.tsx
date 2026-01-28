import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { FAQ } from "@/types/database";

interface FAQAccordionProps {
  faqs: FAQ[];
  title?: string;
  showSearch?: boolean;
  showCategories?: boolean;
}

const groupFAQsByCategory = (faqs: FAQ[]) => {
  const groups: Record<string, FAQ[]> = {};

  faqs.forEach((faq) => {
    const category = faq.category || "General";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(faq);
  });

  // Sort FAQs within each category by display_order
  Object.keys(groups).forEach((category) => {
    groups[category].sort(
      (a, b) => (a.display_order || 0) - (b.display_order || 0)
    );
  });

  return groups;
};

export const FAQAccordion = ({
  faqs,
  title = "Frequently Asked Questions",
  showSearch = true,
  showCategories = true,
}: FAQAccordionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredFaqs = useMemo(() => {
    let result = faqs;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      result = result.filter(
        (faq) => (faq.category || "General") === selectedCategory
      );
    }

    return result;
  }, [faqs, searchQuery, selectedCategory]);

  const groupedFaqs = useMemo(
    () => groupFAQsByCategory(filteredFaqs),
    [filteredFaqs]
  );

  const categories = useMemo(() => {
    const cats = new Set(faqs.map((faq) => faq.category || "General"));
    return Array.from(cats).sort();
  }, [faqs]);

  if (faqs.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="py-12 text-center">
          <HelpCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No FAQs available yet</p>
          <p className="text-gray-500 text-sm">
            Questions will be added soon
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-gold" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search */}
        {showSearch && (
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-900 border-gray-700 pl-10"
            />
          </div>
        )}

        {/* Category filters */}
        {showCategories && categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className={
                selectedCategory === null
                  ? "bg-gold text-gray-900 cursor-pointer"
                  : "border-gray-600 text-gray-400 cursor-pointer hover:bg-gray-700"
              }
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-gold text-gray-900 cursor-pointer"
                    : "border-gray-600 text-gray-400 cursor-pointer hover:bg-gray-700"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        )}

        {/* FAQ Accordion */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No matching questions found</p>
            <p className="text-gray-500 text-sm">Try a different search term</p>
          </div>
        ) : showCategories && categories.length > 1 && !selectedCategory ? (
          // Grouped by category
          <div className="space-y-6">
            {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
              <div key={category}>
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  {category}
                </h3>
                <Accordion type="single" collapsible className="space-y-2">
                  {categoryFaqs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="border border-gray-700 rounded-lg px-4 data-[state=open]:bg-gray-700/30"
                    >
                      <AccordionTrigger className="text-left text-white hover:text-gold hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        ) : (
          // Flat list
          <Accordion type="single" collapsible className="space-y-2">
            {filteredFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-gray-700 rounded-lg px-4 data-[state=open]:bg-gray-700/30"
              >
                <AccordionTrigger className="text-left text-white hover:text-gold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};
