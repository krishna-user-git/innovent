import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Resource } from "@/types/database";

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      const { data } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });
      setResources((data as Resource[]) || []);
      setLoading(false);
    };
    fetchResources();
  }, []);

  const categories = [...new Set(resources.map((r) => r.category).filter(Boolean))];
  
  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-gold" />
            Resources
          </h1>
          <p className="text-gray-400 mt-1">Helpful guides, tutorials, and materials</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border-gray-700 pl-10"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className={selectedCategory === null ? "bg-gold text-gray-900 cursor-pointer" : "border-gray-600 cursor-pointer"}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className={selectedCategory === cat ? "bg-gold text-gray-900 cursor-pointer" : "border-gray-600 cursor-pointer"}
              onClick={() => setSelectedCategory(cat || null)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-gray-800 border-gray-700 h-24 animate-pulse" />
            ))}
          </div>
        ) : filteredResources.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="py-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No resources found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Resources;
