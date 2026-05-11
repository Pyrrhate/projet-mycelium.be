function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1).split("/")[0] ?? null;
    }
    if (u.hostname.includes("youtube.com")) {
      return u.searchParams.get("v");
    }
  } catch {
    return null;
  }
  return null;
}

function vimeoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("vimeo.com")) return null;
    const parts = u.pathname.split("/").filter(Boolean);
    return parts[0] ?? null;
  } catch {
    return null;
  }
}

type Props = {
  url: string;
  title?: string;
  className?: string;
};

export function VideoEmbed({ url, title, className }: Props) {
  const yt = youtubeId(url);
  if (yt) {
    return (
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 ${className ?? ""}`}
      >
        <iframe
          title={title ?? "Vidéo"}
          src={`https://www.youtube-nocookie.com/embed/${yt}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  const vm = vimeoId(url);
  if (vm) {
    return (
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 ${className ?? ""}`}
      >
        <iframe
          title={title ?? "Vidéo"}
          src={`https://player.vimeo.com/video/${vm}`}
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <video
      src={url}
      controls
      playsInline
      className={`w-full rounded-xl border border-white/10 bg-black/50 ${className ?? ""}`}
      title={title}
    >
      <track kind="captions" />
    </video>
  );
}
