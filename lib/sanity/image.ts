import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

import { dataset, isSanityConfigured, projectId } from "./env";

const builder = isSanityConfigured()
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(source: SanityImageSource | undefined) {
  if (!builder || !source) return undefined;
  return builder.image(source).quality(90).auto("format").url();
}
