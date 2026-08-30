/** Shared domain types for the ARNOBOT site content. */

export type ProductId = 'saibya' | 'atm' | 'nexus' | 'altius';

export interface ProductShowcaseItem {
  readonly title: string;
  readonly img: string;
  readonly video: string;
}

export interface Product {
  readonly id: ProductId;
  readonly name: string;
  readonly subtitle: string;
  /** Rendered as two lines separated by a <br />, as in the original hero. */
  readonly heroTitleLines: readonly [string, string];
  readonly heroBg: string;
  readonly heroVideo: string;
  readonly mainImage: string;
  readonly brochure: string;
  readonly gallery: readonly string[];
  readonly overview: string;
  readonly specs: ReadonlyArray<readonly [label: string, value: string]>;
  readonly features: readonly string[];
  readonly applications: readonly string[];
  readonly showcase?: readonly ProductShowcaseItem[];
}

export type IndustryId =
  | 'defence'
  | 'maritime'
  | 'power'
  | 'industrial'
  | 'infrastructure'
  | 'asset'
  | 'solar';

export interface IndustryRobot {
  readonly name: string;
  readonly desc: string;
  readonly image: string;
  readonly specs: readonly string[];
}

export interface Industry {
  readonly id: IndustryId;
  readonly title: string;
  readonly desc: string;
  readonly robots: readonly IndustryRobot[];
  readonly apps: readonly string[];
}

export type PressCategory = 'Defense & UGVs' | 'Industrial NDT' | 'Corporate & Facility';

export interface PressRelease {
  readonly id: number;
  readonly tag: PressCategory;
  readonly badgeClass: string;
  readonly date: string;
  readonly dateline: string;
  readonly title: string;
  readonly excerpt: string;
  readonly image: string;
  readonly body: readonly string[];
}

export type BlogArticleId = 1 | 2 | 3;

export interface BlogArticle {
  readonly id: BlogArticleId;
  readonly slug: string;
  readonly category: string;
  readonly title: string;
  readonly leadExcerpt: string;
  /** Shorter summary used on the /blog index cards. */
  readonly cardExcerpt: string;
  readonly heroThumb: string;
  readonly heroImage: string;
  readonly date: string;
  readonly readTime: string;
  readonly author: string;
  readonly role: string;
  readonly takeaways: readonly string[];
  readonly tags: readonly string[];
  readonly prevId: BlogArticleId;
  readonly nextId: BlogArticleId;
  readonly toc: readonly string[];
}

/** Query-string state shared by the contact and career pages. */
export type FormErrorCode = 'captcha' | 'required' | 'email' | 'mail' | (string & {});

/** A teardown returned by every imperative behaviour module. */
export type Cleanup = () => void;
