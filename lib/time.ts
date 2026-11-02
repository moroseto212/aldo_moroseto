export async function getCurrentYear(): Promise<number> {
  return new Date().getFullYear();
}

export async function getBuildDate(): Promise<string> {
  return new Date().toISOString();
}
