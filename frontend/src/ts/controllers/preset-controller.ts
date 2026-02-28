// Preset controller stub: no accounts, no presets
export async function apply(_id: string): Promise<void> {
  // no-op without account
}

export async function getPreset(_id: string): Promise<undefined> {
  return undefined;
}
