import type { Metadata } from "next";
import { metadata as studioMetadata } from "next-sanity/studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Mycélium — Studio",
};

export { viewport } from "next-sanity/studio";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
