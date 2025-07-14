export function formatError(err: any) {
  return {
    message: err?.message || 'Unknown error',
    cause: err?.stack || undefined,
  };
}
