/**
 * Design tokens — single source of truth for colors, spacing, and typography.
 * All shared components consume these instead of hardcoded values.
 */

export const colors = {
  // Brand
  gold: "#b8960c",
  goldLight: "#d4af37",
  beige: "#f5f0e8",
  beigeLight: "#faf9f7",

  // Neutrals
  black: "#0a0a0a",
  charcoal: "#1a1a1a",
  surface: "#111111",

  // Opacity helpers (used as Tailwind arbitrary values)
  goldBorder: "rgba(184,150,12,0.2)",   // border-[#b8960c]/20
  goldBorderSoft: "rgba(184,150,12,0.1)", // border-[#b8960c]/10
} as const;

/** Tailwind class fragments — keeps components DRY without a CSS-in-JS lib */
export const tw = {
  // Text colors
  textGold: "text-[#b8960c]",
  textGoldLight: "text-[#d4af37]",
  textOnDark: "text-white/80",
  textMuted: "text-white/50",
  textDimmed: "text-white/30",

  // Backgrounds
  bgBlack: "bg-[#0a0a0a]",
  bgCharcoal: "bg-[#1a1a1a]",
  bgBeige: "bg-[#f5f0e8]",
  bgPage: "bg-[#faf9f7]",

  // Borders
  borderGold: "border-[#b8960c]",
  borderGoldFaint: "border-[#b8960c]/20",
  borderGoldSoft: "border-[#b8960c]/10",

  // Buttons — primary (gold fill)
  btnPrimary:
    "bg-[#b8960c] text-white hover:bg-[#d4af37] transition-colors duration-300 tracking-widest uppercase text-xs",
  // Buttons — secondary (dark fill)
  btnSecondary:
    "bg-[#0a0a0a] text-white hover:bg-[#b8960c] transition-colors duration-300 tracking-widest uppercase text-xs",
  // Buttons — outline (gold border)
  btnOutline:
    "border border-[#d4af37] text-[#d4af37] hover:bg-[#b8960c] hover:text-white hover:border-[#b8960c] transition-all duration-300 tracking-widest uppercase text-xs",
  // Buttons — ghost (white border, used on dark backgrounds)
  btnGhost:
    "border border-white/40 text-white hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-300 tracking-widest uppercase text-xs",

  // Button sizes
  btnSm: "px-5 py-2.5",
  btnMd: "px-8 py-3.5",
  btnLg: "px-10 py-4",

  // Card
  card: "bg-white rounded-sm shadow-sm hover:shadow-xl transition-shadow duration-500",
  cardDark: "bg-[#1a1a1a] border border-[#b8960c]/10 rounded-sm",

  // Input (light)
  input:
    "w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#b8960c] transition-colors",
  // Input (dark — admin)
  inputDark:
    "w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#b8960c] transition-colors",

  // Badge
  badge: "bg-[#0a0a0a]/80 text-[#d4af37] text-xs px-3 py-1 tracking-widest uppercase",

  // Divider ornament
  dividerDot: "w-1.5 h-1.5 rounded-full bg-[#b8960c]",
  dividerLine: "h-px w-16 bg-[#b8960c]/40",

  // Label (form)
  label: "block text-xs tracking-widest uppercase text-gray-500 mb-2",
  labelDark: "block text-xs tracking-widest uppercase text-white/40 mb-2",
} as const;
