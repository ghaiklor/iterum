export function log (message: string): null {
  process.stdout.write(`${message}\n`);
  return null;
}
