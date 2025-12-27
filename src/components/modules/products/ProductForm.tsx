"use client";

import { Input } from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import { Label } from "../../ui/Label";
import { CategorySelector } from "../../ui/CategorySelector";
import { StockUnitInput } from "../../ui/StockUnitInput";
import { PriceBreakdownInput } from "../../ui/PriceBreakdownInput";
import { Button } from "../../ui/Button";
import { CloudCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { PricePerQuantityType, ProductDto } from "@/types/dto/productDto";
import { numToStr } from "@/utils/conversion";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProductThunk,
  selectProductState,
  updateProductThunk,
} from "@/store/features/productSlice";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useStoreNavigation } from "@/hooks/store-navigation";
import { StockInput } from "@/components/ui/StockInput";

export const ProductForm = ({ formFor }: { formFor: string }) => {
  const router = useRouter();
  const params = useParams();
  const storeId = params?.store_id;
  const productId = params?.product_id;
  const dispatch = useDispatch();
  const {
    data: productList,
    createStatus,
    updateStatus,
  } = useSelector(selectProductState);
  const { navigate } = useStoreNavigation();

  const [formData, setFormData] = useState<ProductDto>({
    name: "",
    sku: "",
    description: "",
    categories: [],
    totalPrice: 0,
    stockUnit: "PCS",
    totalStock: 0,
    pricePerQuantity: [] as PricePerQuantityType[],
  });

  useEffect(() => {
    if (formFor === "edit" && productId) {
      const product = productList.find((e) => e._id === productId);
      if (!product) return;
      setFormData(product);
    }
  }, [productList, productId, formFor]);

  function handleFormData(key: keyof typeof formData, value: any) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  const handleCreateProduct = () => {
    if (!formData || !storeId) return;
    dispatch(addNewProductThunk({ ...formData, storeId }))
      .unwrap()
      .then(() => {
        toast.success("Product created");
        navigate(`/inventory`);
      });
  };

  const handleUpdateProduct = () => {
    if (!formData || !storeId) return;
    dispatch(updateProductThunk({ ...formData, productId }))
      .unwrap()
      .then(() => {
        toast.success("Product updated");
        navigate(`/inventory`);
      });
  };

  const handleSaveProduct = () => {
    if (formFor === "create") handleCreateProduct();
    else handleUpdateProduct();
  };

  const isLoading = createStatus === "loading" || updateStatus === "loading";

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name" className="block text-gray-600 mb-1.5" required>
          Product name
        </Label>
        <Input
          placeholder="Enter product name"
          id="name"
          value={formData.name}
          onChange={(e) => handleFormData("name", e)}
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor="sku" className="block text-gray-600 mb-1.5" required>
          Product SKU
        </Label>
        <Input
          placeholder="Enter sku"
          id="sku"
          value={formData.sku}
          onChange={(e) => handleFormData("sku", e)}
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor="description" className="block text-gray-600 mb-1.5">
          Product description
        </Label>
        <Textarea
          placeholder="Write product description"
          id="description"
          value={formData.description}
          onChange={(e) => handleFormData("description", e)}
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor="category" className="block text-gray-600 mb-1.5">
          Select categories
        </Label>
        <CategorySelector
          value={formData.categories}
          onChange={(e) => handleFormData("categories", e)}
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Label
            htmlFor="price"
            className="block text-gray-600 mb-1.5"
            required
          >
            Total price (&#8377;)
          </Label>
          <Input
            type="number"
            placeholder="Enter total price"
            id="price"
            value={numToStr(formData.totalPrice)}
            onChange={(e) => handleFormData("totalPrice", Number(e))}
            disabled={isLoading}
          />
        </div>
        <div className="flex-1">
          <Label
            htmlFor="stock-unit"
            className="block text-gray-600 mb-1.5"
            required
          >
            Stock unit
          </Label>
          <StockUnitInput
            id="stock-unit"
            value={formData.stockUnit}
            onChange={(e) => handleFormData("stockUnit", e)}
            disabled={isLoading}
          />
        </div>
        <div className="flex-1">
          <Label
            htmlFor="stock"
            className="block text-gray-600 mb-1.5"
            required
          >
            Total Stock
          </Label>
          <StockInput
            type="number"
            id="stock"
            placeholder="Enter quantity"
            value={numToStr(formData.totalStock)}
            unit={formData.stockUnit}
            onChange={(e) => handleFormData("totalStock", Number(e))}
            disabled={isLoading}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="price-breakdown" required>
          Add price per quantity
        </Label>
        <div>
          <PriceBreakdownInput
            value={formData.pricePerQuantity}
            onChange={(e) => handleFormData("pricePerQuantity", e)}
            unit={formData.stockUnit}
          />
        </div>
      </div>

      <div className="mt-10 flex items-center gap-3 justify-self-end">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          onClick={handleSaveProduct}
          disabled={isLoading}
          loading={isLoading}
        >
          <CloudCheck size={17} />
          Save product
        </Button>
      </div>
    </div>
  );
};
