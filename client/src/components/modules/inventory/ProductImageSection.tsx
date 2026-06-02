import { useState } from "react";
import { GalleryModal } from "../image-gallery/GalleryModal";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/components/utils";
import { ProductImageType } from "@/types/dto/productDto";
import { GalleryImageDto } from "@/types/dto/galleryImageDto";

type ProductImageSectionTypes = {
  selectedImages: ProductImageType[];
  onImageChange: (images: ProductImageType[]) => void;
};

export const ProductImageSection = ({
  selectedImages,
  onImageChange,
}: ProductImageSectionTypes) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleImageSelect = (images: GalleryImageDto[]) => {
    const productImages: ProductImageType[] = images.map((img) => ({
      ...(selectedImages.find((selected) => selected.imageId === img._id) || {
        _id: "",
        imageId: img._id,
        priority: selectedImages.length + 1,
        url: img.url,
        name: img.name,
      }),
    }));
    onImageChange(productImages);
  };

  const removeImage = (id: string) => {
    const updatedImages = selectedImages.filter((img) => img.imageId !== id);
    onImageChange(updatedImages);
  };

  console.log("Selected Images in ProductImageSection:", selectedImages);

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {selectedImages.map((image) => (
          <ProductImage
            key={image.imageId}
            image={image}
            onRemove={removeImage}
          />
        ))}
        <Button
          variant="none"
          onClick={() => setIsGalleryOpen(true)}
          className={cn(
            "w-30 h-30 flex flex-col items-center justify-center text-gray-500!",
            "rounded-lg border-2 border-dashed border-border bg-background text-foreground",
          )}
        >
          <ImagePlus size={30} />
          <span className="text-xs mt-1">Add Images</span>
        </Button>
      </div>
      <GalleryModal
        open={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSelect={handleImageSelect}
        selectedImageIds={selectedImages.map((img) => img.imageId)}
      />
    </div>
  );
};

const ProductImage = ({
  image,
  onRemove,
}: {
  image: ProductImageType;
  onRemove: (id: string) => void;
}) => {
  return (
    <div className="relative w-30 h-30 rounded-lg overflow-hidden border group">
      <Image src={image.url} alt={image.name} fill className="object-cover" />
      <Button
        variant="danger"
        onClick={() => onRemove(image.imageId)}
        className="absolute top-1 right-1 p-2"
      >
        <Trash size={12} />
      </Button>
    </div>
  );
};
