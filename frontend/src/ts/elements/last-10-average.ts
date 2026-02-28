// No DB - average is always 0 without account
export async function update(): Promise<void> {
  // no-op without account
}

export function getWPM(): number {
  return 0;
}

export function getAcc(): number {
  return 0;
}
