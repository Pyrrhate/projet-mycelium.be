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
  return (
    <div className="relative z-20 min-h-screen bg-[#101112]">{children}</div>
  );
}
