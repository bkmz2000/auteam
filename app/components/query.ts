// Helper to add timeout to Tina queries
export async function queryWithTimeout<T>(
  queryFn: () => Promise<{ data: T }>,
  timeoutMs = 5000
): Promise<{ data: T } | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const result = await Promise.race([
      queryFn(),
      new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error('Query timeout')), timeoutMs)
      ),
    ]);

    clearTimeout(timeoutId);
    return result;
  } catch (e) {
    console.error('Query error or timeout:', e);
    return null;
  }
}
