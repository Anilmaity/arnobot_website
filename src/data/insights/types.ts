/**
 * Shapes shared by the four category files and the index.
 *
 * Kept apart from `index.ts` so a category file can import a type without
 * pulling in the module that imports the category file back.
 */

export type InsightCategory = 'Technology' | 'Industry' | 'Company' | 'Engineering';

/** One titled section of an article body. Rendered heading, then paragraphs in order. */
export interface ArticleSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

/**
 * A post as written in a category file. The read time is not authored — it
 * is derived from the word count in `index.ts`, so it cannot drift from the
 * copy the way a hand-typed "7 min read" did.
 */
export interface InsightDraft {
  readonly slug: string;
  readonly category: InsightCategory;
  readonly title: string;
  /** The short brief: overlaid on the hero, and the card copy on the index. */
  readonly excerpt: string;
  /** As displayed. */
  readonly date: string;
  /** Machine-readable twin of `date`, for <time datetime> and sorting. */
  readonly isoDate: string;
  /** The picture behind the hero, and the card thumbnail on the index. */
  readonly image: string;
  /** The article itself. Rendered in order by /insights/[slug]. */
  readonly body: readonly ArticleSection[];
  /** The takeaways, closing the article. Three or four short lines. */
  readonly summary: readonly string[];
}

/** A post as the pages read it. */
export interface InsightPost extends InsightDraft {
  readonly readTime: string;
}
