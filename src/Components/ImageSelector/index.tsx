import classNames from "classnames";
import { FC, useEffect, useState } from "react";

import { IconRemoveCircle } from "Components/Icons";
import Spinner from "Components/Spinner";

import { IImage, IImageSelectorProps } from "./types";

const ImageSelector: FC<IImageSelectorProps> = ({
  images,
  onSorted,
  value,
  onSelected,
  onDelete
}) => {
  const [selected, setSelected] = useState<IImage>(value || images[0]);
  const [hoveredImage, setHoveredImage] = useState<IImage | null>(null);
  const [itemToDelete, setItemToDelete] = useState<IImage | null>(null);
  const [draggingImage, setDraggingImage] = useState<IImage | null>(null);

  useEffect(() => {
    setSelected(value);
  }, [images.length, value]);

  const handleDragStart = (image: IImage) => {
    setDraggingImage(image);
  };

  const handleDragOver = (image: IImage) => {
    if (!onSorted) return;
    if (draggingImage) {
      const draggingIndex = images.indexOf(draggingImage);
      const targetIndex = images.indexOf(image);

      const imagesCopy: IImage[] = [...images];
      imagesCopy.splice(draggingIndex, 1);
      imagesCopy.splice(targetIndex, 0, draggingImage);

      onSorted(imagesCopy);
    }
  };

  const handleDragEnd = () => {
    setDraggingImage(null);
  };

  return (
    <div className='yl-grid yl-grid-cols-4 yl-gap-4'>
      {images.map(image => {
        return (
          <div
            data-testid={`image-${image.id}`}
            onClick={() => {
              setSelected(image);
              onSelected(image);
            }}
            {...(onSorted && {
              draggable: true,
              onDragStart: () => handleDragStart(image),
              onDragOver: () => handleDragOver(image),
              onDragEnd: handleDragEnd
            })}
            onMouseEnter={() => setHoveredImage(image)}
            onMouseLeave={() => setHoveredImage(null)}
            key={image.id}
            style={{ backgroundImage: `url(${image.url})` }}
            className={classNames(
              "yl-relative yl-aspect-square yl-h-full yl-w-full yl-min-w-[150px] yl-cursor-pointer yl-bg-cover yl-bg-center yl-bg-no-repeat opacity-70",
              {
                "!opacity-100": selected.url === image.url,
                "yl-flex yl-items-center yl-justify-center yl-border-rose-500 opacity-50":
                  itemToDelete?.url === image.url
              }
            )}
          >
            {itemToDelete?.url === image.url && (
              <Spinner className='!yl-w-24 yl-text-red-500' />
            )}

            {!itemToDelete && hoveredImage?.url === image.url && (
              <IconRemoveCircle
                data-testid={`icon-remove-circle-${image.id}`}
                onClick={async e => {
                  try {
                    e.stopPropagation();
                    setItemToDelete(image);
                    await onDelete(image);
                  } catch (error) {
                  } finally {
                    setItemToDelete(null);
                  }
                }}
                className='yl-absolute yl-right-1 yl-top-1 yl-w-4 yl-cursor-pointer yl-text-primary-text-color transition duration-200 ease-in hover:yl-text-rose-700'
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImageSelector;
