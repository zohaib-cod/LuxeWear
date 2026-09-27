import { notFound } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import { getProductsByCategory } from "@/lib/data";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Map slugs to actual categories
  const categoryMap: Record<string, string> = {
    "mens-clothing": "Men's Clothing",
    "womens-clothing": "Women's Clothing",
    "jeans": "Jeans",
    "formal-wear": "Functions & Formal Wear",
  };

  const categoryName = categoryMap[params.slug];
  
  if (!categoryName) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(categoryName);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-4">{categoryName}</h1>
        <p className="text-lg text-neutral-500 max-w-2xl">
          Explore our exclusive collection of {categoryName.toLowerCase()}.
        </p>
      </div>

      <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-200">
        <div className="text-sm font-medium text-neutral-500">
          Showing {categoryProducts.length} product(s)
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {categoryProducts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-neutral-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
