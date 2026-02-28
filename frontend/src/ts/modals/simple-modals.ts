// Stub for simple-modals — uses browser confirm instead of custom modal
type PopupOptions = {
  yes?: () => void | Promise<void>;
  no?: () => void | Promise<void>;
  modalChain?: unknown;
};

export function showPopup(
  id: string,
  _args?: string[],
  options?: PopupOptions
): void {
  if (options?.yes) {
    if (confirm(`Confirm action: ${id}`)) {
      void options.yes();
    } else {
      options.no?.();
    }
  }
}
