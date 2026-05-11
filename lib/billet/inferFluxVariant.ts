import type { BilletContentItem, FluxVariant } from "@/types/sanity";

function itemType(item: BilletContentItem | undefined) {
  if (!item || typeof item !== "object") return undefined;
  return "_type" in item ? item._type : undefined;
}

export function inferFluxVariant(
  content: BilletContentItem[] | undefined,
  previewText: string | null | undefined,
): FluxVariant {
  const blocks = content ?? [];
  const text = (previewText ?? "").trim();
  const first = blocks[0];
  const t0 = itemType(first);

  if (blocks.length === 1) {
    if (t0 === "bodyImage") return "image-hero";
    if (t0 === "bodyVideo") return "video-hero";
  }

  if (t0 === "bodyImage" && text.length < 140) return "image-featured";
  if (t0 === "bodyVideo") return "video-hero";
  if (text.length > 340) return "text-long";

  return "mixed";
}
