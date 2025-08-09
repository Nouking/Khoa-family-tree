"use client";

import React from 'react';

type Tip = {
  selector: string;
  text: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
};

function computePosition(rect: DOMRect, placement: Tip['placement']) {
  const margin = 8;
  switch (placement) {
    case 'top':
      return { left: rect.left + rect.width / 2, top: rect.top - margin, origin: 'bottom center' };
    case 'right':
      return { left: rect.right + margin, top: rect.top + rect.height / 2, origin: 'left center' };
    case 'left':
      return { left: rect.left - margin, top: rect.top + rect.height / 2, origin: 'right center' };
    case 'bottom':
    default:
      return { left: rect.left + rect.width / 2, top: rect.bottom + margin, origin: 'top center' };
  }
}

function pickSmartPlacement(rect: DOMRect, viewport: { w: number; h: number }): Tip['placement'] {
  const spaceTop = rect.top;
  const spaceBottom = viewport.h - rect.bottom;
  const spaceLeft = rect.left;
  const spaceRight = viewport.w - rect.right;
  const maxSpace = Math.max(spaceTop, spaceBottom, spaceLeft, spaceRight);
  if (maxSpace === spaceTop) return 'top';
  if (maxSpace === spaceBottom) return 'bottom';
  if (maxSpace === spaceLeft) return 'left';
  return 'right';
}

const TipBubble: React.FC<{ tip: Tip; index: number }> = ({ tip, index }) => {
  const [style, setStyle] = React.useState<{ left: number; top: number; transform: string } | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = document.querySelector(tip.selector) as HTMLElement | null;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vp = { w: window.innerWidth, h: window.innerHeight };
      const placement = tip.placement || pickSmartPlacement(rect, vp);
      const pos = computePosition(rect, placement);
      setStyle({ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' });
      setVisible(true);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [tip.selector, tip.placement]);

  if (!style || !visible) return null;

  return (
    <div
      className="fixed z-[70] px-3 py-2 rounded-[var(--radius-md)] bg-(--surface-1) shadow-[var(--elevation-2)] border border-(--color-neutral-200) text-(--text-sm)"
      style={{ left: style.left, top: style.top, transform: style.transform }}
      role="tooltip"
    >
      <div className="font-semibold mb-1">Tip {index + 1}</div>
      <div>{tip.text}</div>
    </div>
  );
};

export const ContextTipsOverlay: React.FC<{ tips: Tip[]; onClose: () => void }> = ({ tips, onClose }) => {
  return (
    <div aria-live="polite">
      {/* Backdrop for clarity, click to close */}
      <button
        aria-label="Close tips overlay"
        onClick={onClose}
        className="fixed inset-0 z-[65] bg-black/20"
      />
      {tips.map((t, i) => (
        <TipBubble key={t.selector + i} tip={t} index={i} />
      ))}
    </div>
  );
};

export default ContextTipsOverlay;


