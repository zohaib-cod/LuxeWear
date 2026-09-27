import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getProductById, products } from "@/lib/data";
import AddToCart from "@/components/ui/AddToCart";
import ProductCard from "@/components/ui/ProductCard";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  // Get similar products
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-neutral-500 mb-8">
        <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link href="/shop" className="hover:text-neutral-900 transition-colors">Shop</Link>
        <ChevronRight size={14} />
        <span className="text-neutral-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Gallery */}
        <div className="flex flex-col space-y-4">
          <div className="aspect-[4/5] bg-neutral-100 rounded-lg overflow-hidden">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <div key={i} className="aspect-square bg-neutral-100 rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                  <img src={img} alt={`${product.name} detail ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col pt-4 md:pt-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-2">
            {product.name}
          </h1>
          <p className="text-2xl font-medium text-neutral-900 mb-6">
            ${product.price.toFixed(2)}
          </p>
          <div className="prose prose-sm text-neutral-600 mb-8 border-b border-neutral-200 pb-8">
            <p>{product.description}</p>
          </div>

          <AddToCart product={product} />

          {/* Details Accordions (Mock) */}
          <div className="mt-12 space-y-4 border-t border-neutral-200 pt-8">
            <details className="group cursor-pointer">
              <summary className="flex justify-between items-center font-medium list-none text-neutral-900">
                <span>Product Details</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="text-neutral-600 text-sm mt-3 leading-relaxed">
                Premium materials and expert craftsmanship go into every piece. Machine washable. Imported.
              </div>
            </details>
            <details className="group cursor-pointer">
              <summary className="flex justify-between items-center font-medium list-none text-neutral-900">
                <span>Shipping & Returns</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="text-neutral-600 text-sm mt-3 leading-relaxed">
                Free standard shipping on all orders over $100. Returns accepted within 30 days of purchase.
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-24 border-t border-neutral-200 pt-16">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
