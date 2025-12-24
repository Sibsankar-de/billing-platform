import { ProductDto } from "@/types/dto/productDto";
import { Edit2, Trash2 } from "lucide-react";

export const InventoryProductCard = ({ product }: { product: ProductDto }) => {
  return (
    <tr
      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-gray-900">{product.name}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-gray-600">{product.sku}</span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full">
          {product.categories?.[0]}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <span className="text-gray-900">${product.totalPrice?.toFixed(2)}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};
