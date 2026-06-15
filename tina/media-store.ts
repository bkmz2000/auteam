import type {
  Media,
  MediaList,
  MediaListOptions,
  MediaStore,
  MediaUploadOptions,
} from "tinacms";

const normalizeDirectory = (dir?: string) =>
  (dir || "").replace(/^\/+|\/+$/g, "");

const makeMedia = (filename: string, src: string, directory: string): Media => ({
  type: "file",
  id: src,
  filename,
  directory,
  src,
  thumbnails: {
    "75x75": src,
    "400x400": src,
    "1000x1000": src,
  },
});

export class VercelBlobMediaStore implements MediaStore {
  accept = "image/*";

  constructor(_tinaApi?: unknown) {}

  async persist(files: MediaUploadOptions[]): Promise<Media[]> {
    const results: Media[] = [];
    for (const { file, directory } of files) {
      const dir = normalizeDirectory(directory);
      const pathname = dir ? `${dir}/${file.name}` : file.name;
      const res = await fetch(
        `/api/media/upload?pathname=${encodeURIComponent(pathname)}`,
        {
          method: "POST",
          body: file,
          headers: { "Content-Type": file.type || "application/octet-stream" },
        }
      );
      if (!res.ok) throw new Error(`Upload failed (${res.status})`);
      const { url } = await res.json();
      results.push(makeMedia(file.name, url, directory || "/"));
    }
    return results;
  }

  async list(options?: MediaListOptions): Promise<MediaList> {
    const params = new URLSearchParams();
    if (options?.directory) params.set("directory", options.directory);
    if (options?.offset) params.set("cursor", String(options.offset));
    if (options?.limit) params.set("limit", String(options.limit));
    const res = await fetch(`/api/media?${params.toString()}`);
    if (!res.ok) throw new Error(`Failed to list media (${res.status})`);
    return res.json();
  }

  async delete(media: Media): Promise<void> {
    const res = await fetch("/api/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: media.src }),
    });
    if (!res.ok) throw new Error(`Failed to delete media (${res.status})`);
  }
}
