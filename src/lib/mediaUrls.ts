/**
 * Shared URL parsing helpers for YouTube and Facebook media.
 *
 * Used in two places:
 *   - The CMS editor: live validation + thumbnail preview while typing.
 *   - The website: turning stored URLs into embeddable iframe src values.
 *
 * Kept dependency-free so it works in any JS/TS environment (Next.js
 * server components, client components, and the Electron main process).
 */

// ─── YouTube ──────────────────────────────────────────────────────

const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{11}$/

/**
 * Extract a YouTube video ID from any common URL form:
 *   https://www.youtube.com/watch?v=VIDEOID
 *   https://youtu.be/VIDEOID
 *   https://www.youtube.com/embed/VIDEOID
 *   https://www.youtube.com/shorts/VIDEOID
 *   https://www.youtube.com/v/VIDEOID
 *   https://m.youtube.com/watch?v=VIDEOID
 *   https://music.youtube.com/watch?v=VIDEOID
 *   VIDEOID  (a bare 11-char ID)
 *
 * Returns null for anything that doesn't look like a YouTube video.
 */
export function parseYouTubeId(input: string | null | undefined): string | null {
  if (!input || typeof input !== "string") return null
  const s = input.trim()
  if (!s) return null

  // Bare video ID (11 chars, base64url alphabet)
  if (YOUTUBE_ID_RE.test(s)) return s

  try {
    const url = new URL(s)
    const host = url.hostname
      .replace(/^www\./, "")
      .replace(/^m\./, "")
      .replace(/^music\./, "")

    // youtu.be/<id>
    if (host === "youtu.be") {
      const id = url.pathname.slice(1).split("/")[0]
      return YOUTUBE_ID_RE.test(id) ? id : null
    }

    // youtube.com / youtube-nocookie.com
    if (
      host === "youtube.com" ||
      host === "youtube-nocookie.com" ||
      host.endsWith(".youtube.com") ||
      host.endsWith(".youtube-nocookie.com")
    ) {
      // /watch?v=ID
      const v = url.searchParams.get("v")
      if (v && YOUTUBE_ID_RE.test(v)) return v

      // /embed/ID  |  /shorts/ID  |  /v/ID  |  /live/ID
      const m = url.pathname.match(
        /^\/(?:embed|shorts|v|live)\/([A-Za-z0-9_-]{11})/
      )
      if (m) return m[1]
    }
  } catch {
    // Not a URL and not a bare ID — fall through to null
  }

  return null
}

/**
 * Build the embed URL for a YouTube video ID.
 *
 * Uses youtube-nocookie.com so no tracking cookies are set until the
 * user clicks play. Important for GDPR / French data-consciousness.
 *
 * Returns null if the input isn't a valid ID.
 */
export function youTubeEmbedUrl(videoId: string | null | undefined): string | null {
  if (!videoId || !YOUTUBE_ID_RE.test(videoId)) return null
  return `https://www.youtube-nocookie.com/embed/${videoId}`
}

/**
 * Build a thumbnail URL from a YouTube video ID. No API key required —
 * these URLs are public and stable.
 *
 * Sizes:
 *   default  → 120×90
 *   mqdefault → 320×180
 *   hqdefault → 480×360  (may have black bars)
 *   sddefault → 640×480  (may have black bars)
 *   maxresdefault → 1280×720 (only exists for HD uploads; may 404)
 *
 * Defaults to hqdefault — most reliable, never 404s for a real video.
 */
export function youTubeThumbnailUrl(
  videoId: string | null | undefined,
  size: "default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault" = "hqdefault"
): string | null {
  if (!videoId || !YOUTUBE_ID_RE.test(videoId)) return null
  return `https://i.ytimg.com/vi/${videoId}/${size}.jpg`
}

/**
 * Extract a start time (in seconds) from a YouTube URL with a `t=`
 * query parameter, in case you ever want to support that.
 *
 * Handles both `t=42` (seconds) and `t=1m30s` (YouTube's timestamp form).
 */
export function parseYouTubeStartTime(input: string | null | undefined): number | null {
  if (!input) return null
  try {
    const url = new URL(input)
    const t = url.searchParams.get("t")
    if (!t) return null

    // Plain number → seconds
    if (/^\d+$/.test(t)) return parseInt(t, 10)

    // YouTube timestamp form: 1h2m3s
    const m = t.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/)
    if (!m) return null
    const [, h, mm, ss] = m
    return (parseInt(h || "0", 10) * 3600) +
           (parseInt(mm || "0", 10) * 60) +
           parseInt(ss || "0", 10)
  } catch {
    return null
  }
}

// ─── Facebook ─────────────────────────────────────────────────────

/**
 * Facebook Reel URLs come in several shapes:
 *   https://www.facebook.com/reel/1234567890123456
 *   https://www.facebook.com/<page>/videos/<id>
 *   https://www.facebook.com/watch/?v=<id>
 *   https://fb.watch/abcXYZ/
 *   https://m.facebook.com/reel/1234567890123456
 *
 * We don't try to normalize them — Facebook's embed API takes the full
 * URL. We only validate that it looks like a Facebook URL at all.
 */
export function isFacebookReelUrl(input: string | null | undefined): boolean {
  if (!input || typeof input !== "string") return false
  const s = input.trim()
  if (!s) return false
  try {
    const url = new URL(s)
    const host = url.hostname.replace(/^www\./, "").replace(/^m\./, "")
    return (
      host === "facebook.com" ||
      host === "fb.watch" ||
      host === "fb.com" ||
      host.endsWith(".facebook.com")
    )
  } catch {
    return false
  }
}

/**
 * Facebook's official iframe embed URL. Facebook only renders the
 * player if the reel is public; private or age-gated content falls
 * back to a link-style preview.
 *
 * `showText=false` hides the caption overlay; set to true to include it.
 */
export function facebookEmbedUrl(
  reelUrl: string | null | undefined,
  { width = 560, showText = false }: { width?: number; showText?: boolean } = {}
): string | null {
  if (!isFacebookReelUrl(reelUrl)) return null
  const params = new URLSearchParams({
    href: reelUrl as string,
    show_text: showText ? "true" : "false",
    width: String(width)
  })
  return `https://www.facebook.com/plugins/video.php?${params.toString()}`
}

// ─── Generic URL validation ───────────────────────────────────────

/**
 * Validate that a string parses as a URL with http/https scheme.
 * Used by the CMS's `url` field type for generic link inputs.
 */
export function isValidHttpUrl(input: string | null | undefined): boolean {
  if (!input || typeof input !== "string") return false
  try {
    const url = new URL(input.trim())
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

// ─── Cloudinary URL transformations ───────────────────────────────

/**
 * Inject a Cloudinary transformation into a delivery URL. Useful for
 * generating thumbnails on the fly without re-uploading.
 *
 * Example:
 *   thumbUrl(photo.url, 600, 400)
 *   // https://res.cloudinary.com/.../upload/w_600,h_400,c_fill,q_auto,f_auto/v123/...
 *
 * Returns the input unchanged if it doesn't look like a Cloudinary URL.
 */
export function cloudinaryThumb(
  url: string | null | undefined,
  width: number,
  height: number,
  crop: "fill" | "fit" | "limit" = "fill"
): string {
  if (!url) return ""
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url
  }
  const transformation = `w_${width},h_${height},c_${crop},q_auto,f_auto`
  return url.replace("/upload/", `/upload/${transformation}/`)
}