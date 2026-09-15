/**
 * QbitAI (量子位) articles fetched from the official website RSS feed.
 *
 * WeChat public accounts are a closed ecosystem with no official API, but
 * QbitAI publishes every article on its WordPress site (qbitai.com) as well,
 * which exposes a standard RSS 2.0 feed. Items carry title/link/lead-in
 * (description), not full text — the LLM digest is built from those.
 *
 * Strategy: fetch the feed, keep items published within the last 48h,
 * deduplicate by link (the feed repeats promoted articles).
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface QbitaiItem {
  title: string;
  url: string;
  /** Lead-in paragraph (RSS <description>), usually one sentence. */
  summary: string;
  author: string;
  publishedAt: string; // ISO 8601
  categories: string[];
}

export interface QbitaiData {
  items: QbitaiItem[];
  fetchSuccess: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FEED_URL = "https://www.qbitai.com/feed";

/** Only keep articles published within this window. */
const MAX_AGE_MS = 48 * 60 * 60 * 1000;

// ---------------------------------------------------------------------------
// XML helpers (lightweight, no dependency — same approach as arxiv.ts)
// ---------------------------------------------------------------------------

function stripCdata(s: string): string {
  return s
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .trim();
}

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code: string) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function extractItemField(item: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`);
  const m = item.match(re);
  return m ? decodeEntities(stripCdata(m[1]!.trim())) : "";
}

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

export async function fetchQbitaiData(): Promise<QbitaiData> {
  try {
    const res = await fetch(FEED_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
      },
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) {
      console.error(`  [qbitai] Feed returned HTTP ${res.status}`);
      return { items: [], fetchSuccess: false };
    }
    const xml = await res.text();

    // Split into <item> blocks.
    const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    if (!itemBlocks.length) {
      console.error("  [qbitai] Feed parsed but no <item> blocks found");
      return { items: [], fetchSuccess: false };
    }

    const cutoff = Date.now() - MAX_AGE_MS;
    const seen = new Set<string>();
    const items: QbitaiItem[] = [];

    for (const block of itemBlocks) {
      const title = extractItemField(block, "title");
      const url = extractItemField(block, "link");
      if (!title || !url || seen.has(url)) continue;
      seen.add(url);

      const pubRaw = extractItemField(block, "pubDate");
      const pubMs = pubRaw ? new Date(pubRaw).getTime() : Number.NaN;
      // An unparseable date should skip the item, not kill the whole fetch.
      if (Number.isNaN(pubMs)) continue;
      if (pubMs < cutoff) continue;
      const publishedAt = new Date(pubMs).toISOString();

      const author = extractItemField(block, "dc:creator");
      const summary = extractItemField(block, "description");
      const categories = [...block.matchAll(/<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g)].map((m) =>
        m[1]!.trim(),
      );

      items.push({ title, url, summary, author, publishedAt, categories });
    }

    console.log(`  [qbitai] Fetched ${items.length} recent articles (feed had ${itemBlocks.length})`);
    return { items, fetchSuccess: true };
  } catch (err) {
    console.error(`  [qbitai] Feed fetch failed: ${err}`);
    return { items: [], fetchSuccess: false };
  }
}
