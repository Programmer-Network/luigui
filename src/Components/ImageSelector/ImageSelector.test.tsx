import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";

import ImageSelector from "./";

describe("ImageSelector component", () => {
  const mockImages = [
    { id: 1, url: "http://example.com/image1.jpg" },
    { id: 2, url: "http://example.com/image2.jpg" }
  ];

  test("renders correctly - snapshot test", () => {
    const { asFragment } = render(
      <ImageSelector
        images={mockImages}
        value={mockImages[0]}
        onSelected={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders images correctly", () => {
    render(
      <ImageSelector
        images={mockImages}
        value={mockImages[0]}
        onSelected={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    mockImages.forEach(image => {
      expect(screen.getByTestId(`image-${image.id}`)).toBeInTheDocument();
    });
  });

  test("handles image selection", () => {
    const onSelected = vi.fn();
    render(
      <ImageSelector
        images={mockImages}
        value={mockImages[0]}
        onSelected={onSelected}
        onDelete={vi.fn()}
      />
    );
    fireEvent.click(screen.getByTestId(`image-${mockImages[1].id}`));
    expect(onSelected).toHaveBeenCalledWith(mockImages[1]);
  });

  test("handles image deletion", async () => {
    const onDelete = vi.fn().mockResolvedValue([]);
    render(
      <ImageSelector
        images={mockImages}
        value={mockImages[0]}
        onSelected={vi.fn()}
        onDelete={onDelete}
      />
    );

    const imageElement = screen.getByTestId(`image-${mockImages[0].id}`);
    fireEvent.mouseEnter(imageElement);

    const deleteIcon = screen.getByTestId(
      `icon-remove-circle-${mockImages[0].id}`
    );

    fireEvent.click(deleteIcon);

    await vi.waitFor(() => {
      expect(onDelete).toHaveBeenCalledWith(mockImages[0]);
    });
  });

  test("updates selection on prop change", () => {
    const { rerender } = render(
      <ImageSelector
        images={mockImages}
        value={mockImages[0]}
        onSelected={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    rerender(
      <ImageSelector
        images={mockImages}
        value={mockImages[1]}
        onSelected={vi.fn()}
        onDelete={vi.fn()}
      />
    );
  });

  test("calls onSorted with sorted images when an image is dragged and dropped", async () => {
    const onSorted = vi.fn();
    render(
      <ImageSelector
        images={mockImages}
        value={mockImages[0]}
        onSelected={vi.fn()}
        onDelete={vi.fn()}
        onSorted={onSorted}
      />
    );

    const firstImage = screen.getByTestId(`image-${mockImages[0].id}`);
    const secondImage = screen.getByTestId(`image-${mockImages[1].id}`);

    fireEvent.dragStart(firstImage);
    fireEvent.dragOver(secondImage);
    fireEvent.dragEnd(firstImage);

    expect(onSorted).toHaveBeenCalledWith([mockImages[1], mockImages[0]]);
  });
});
