export default function joinWithAnd<T>(arr: T[]): string {
  const length = arr.length;
  if (length > 1) {
    // For lengths > 1
    // This will give "1st, 2nd, 3rd, ... , (n-1)th and nth"
    return `${arr.slice(0, length - 1).join(", ")} and ${arr[arr.length - 1]}`;
  }

  // For length  = 0 or 1
  // This will give an empty string or the only element itself
  return arr.join();
}
