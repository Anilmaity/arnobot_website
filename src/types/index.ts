/** Shared domain types for the ARNOBOT site content. */

export type ProductId = 'saibya' | 'atm' | 'nexus' | 'altius';

export interface ProductShowcaseItem {
  readonly title: string;
  readonly img: string;
  readonly video: string;
}

/** Line icons drawn by `ProductIcon`, keyed by what they depict. */
export type ProductIconName =
  | 'payload'
  | 'drive'
  | 'suspension'
  | 'stairs'
  | 'lightweight'
  | 'invertible'
  | 'rugged'
  | 'magnet'
  | 'control'
  | 'encrypted'
  | 'rapid'
  | 'quiet'
  | 'modular'
  | 'tooling'
  | 'feed'
  | 'transmit'
  | 'analytics'
  | 'defence'
  | 'ammunition'
  | 'transport'
  | 'towing'
  | 'industrial'
  | 'surveillance'
  | 'recon'
  | 'building'
  | 'bridge'
  | 'border'
  | 'radar'
  | 'disaster'
  | 'hazard'
  | 'spray'
  | 'paint'
  | 'grass'
  | 'mapping';

export interface ProductIconItem {
  readonly icon: ProductIconName;
  /**
   * The figure the row turns on — a payload, a weight, a drive layout — set
   * apart from the rest of the phrase so it can be read without reading the
   * sentence. Only where the row genuinely states one.
   */
  readonly lead?: string;
  readonly label: string;
}

/**
 * A turntable render published as a numbered frame set — `frame-00.webp`
 * through `frame-<frames-1>.webp` inside `dir` — which `ProductSpinViewer`
 * spins in place of the photo gallery.
 */
export interface ProductSpin {
  /** Directory under `public/`, no trailing slash. */
  readonly dir: string;
  /** Frames in one full revolution. */
  readonly frames: number;
  /** The frame the viewer opens on and returns to. */
  readonly startIndex: number;
  /** Intrinsic frame size, so the stage reserves its box before anything loads. */
  readonly width: number;
  readonly height: number;
}

export interface Product {
  readonly id: ProductId;
  readonly name: string;
  readonly subtitle: string;
  /** Rendered as two lines separated by a <br />, as in the original hero. */
  readonly heroTitleLines: readonly [string, string];
  readonly heroBg: string;
  readonly heroVideo: string;
  /**
   * A photograph that stands in for the hero video. Where one is set the hero
   * plays nothing and offers no play button — the picture is the hero — and the
   * band takes the full-bleed cinematic treatment, title over the image.
   */
  readonly heroImage?: string;
  /**
   * What `heroImage` actually depicts. The hero is the one image on the page a
   * screen reader cannot infer from the product name, so it is described rather
   * than labelled.
   */
  readonly heroImageAlt?: string;
  /**
   * The one image that stands for the product away from the page — and the last
   * resort the details band falls back to if `spin` and `stillRender` are both
   * absent.
   */
  readonly mainImage: string;
  readonly brochure: string;
  readonly overview: string;
  readonly specs: ReadonlyArray<readonly [label: string, value: string]>;
  readonly features: readonly string[];
  readonly applications: readonly string[];
  /**
   * `features` and `applications` paired with an icon, which lets the product
   * page set each as a marked row instead of a bullet. Optional and supplied
   * together: a product without them keeps the bullet cards.
   */
  readonly featureItems?: readonly ProductIconItem[];
  readonly applicationItems?: readonly ProductIconItem[];
  readonly showcase?: readonly ProductShowcaseItem[];
  /**
   * A 360° render of the machine, and the details band's first choice: a
   * turntable a reader can actually turn says more about the geometry than a
   * strip of photographs of it.
   */
  readonly spin?: ProductSpin;
  /**
   * One image — a keyed render or a photograph — shown on the same stage as
   * `spin` but with nothing to drag, for a machine with no turntable frame set.
   * `spin` wins where both are set, and `mainImage` stands in where neither is.
   */
  readonly stillRender?: string;
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
}

/** A teardown returned by every imperative behaviour module. */
export type Cleanup = () => void;
