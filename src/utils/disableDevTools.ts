/**
 * Prevents F12, DevTools shortcuts, view source, and right-click inspection
 * silently without displaying any on-screen alert or prompt.
 */
export function setupDevToolsProtection(): () => void {
  const handleKeyDown = (e: KeyboardEvent) => {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I or Cmd+Option+I (Inspect)
    // Ctrl+Shift+J or Cmd+Option+J (Console)
    // Ctrl+Shift+C or Cmd+Option+C (Elements)
    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U / Cmd+Option+U (View Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+S / Cmd+S (Save Page)
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  // Block right-click context menu silently
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  window.addEventListener('keydown', handleKeyDown, { capture: true });
  window.addEventListener('contextmenu', handleContextMenu, { capture: true });

  return () => {
    window.removeEventListener('keydown', handleKeyDown, { capture: true });
    window.removeEventListener('contextmenu', handleContextMenu, { capture: true });
  };
}
