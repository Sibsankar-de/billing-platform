"use client";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { InventoryProductCard } from "./InventoryProductCard";
import { SelectOptionType } from "@/types/SelectType";
import { Pagination } from "@/components/ui/Pagination";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { selectProductState } from "@/store/features/productSlice";
import { getTotalPages, PageResult, paginate } from "@/utils/paginate";
import { ProductDto } from "@/types/dto/productDto";
import { Button } from "@/components/ui/Button";
import { useStoreNavigation } from "@/hooks/store-navigation";
import { ProductDeleteModal } from "./ProductDeleteModal";

const categories: SelectOptionType[] = [
  { label: "All Categories", value: "" },
  { label: "Services", value: "Services" },
  { label: "Subscription", value: "Subscription" },
];

const PAGE_SIZE = 15;

export const InventoryProductList = () => {
  const { navigate } = useStoreNavigation();
  const {
    data: { productList },
  } = useSelector(selectProductState);

  const [paginatedData, setPaginatedData] = useState<PageResult<ProductDto>>(
    {}
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page != paginatedData?.page) {
      const paginatedResult = paginate(productList, PAGE_SIZE, page);
      setPaginatedData(paginatedResult);
      setPage(paginatedResult.page || 1);
    }
  }, [page, productList]);

  const totalPage = getTotalPages(productList.length, PAGE_SIZE);

  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products by name or SKU..."
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            options={categories}
            placeholder="Select category"
            className="min-w-40"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left text-primary px-6 py-4">Sno</th>
                <th className="text-left text-gray-700 px-6 py-4">
                  Product Name
                </th>
                <th className="text-center text-gray-700 px-6 py-4">SKU</th>
                <th className="text-center text-gray-700 px-6 py-4">
                  Date added
                </th>
                <th className="text-center text-gray-700 px-6 py-4">
                  Price / Qty
                </th>
                <th className="text-center text-gray-700 px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product, index) => (
                <InventoryProductCard
                  key={product._id}
                  product={product}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
          {productList.length === 0 && (
            <div className="flex items-center justify-center flex-col gap-3 w-full p-3">
              <p>No products found in your inventory!</p>
              <Button onClick={() => navigate("/inventory/add-product")}>
                <Plus size={17} />
                Add new product
              </Button>
            </div>
          )}
        </div>
      </div>

      <Pagination
        currentPage={page}
        totalPage={totalPage}
        onPageChange={(e) => setPage(e)}
      />
    </div>
  );
};
