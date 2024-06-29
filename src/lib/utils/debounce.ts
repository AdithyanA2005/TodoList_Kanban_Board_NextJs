type DebounceCallback = (...args: any[]) => void;

export default function debounce(cb: DebounceCallback, delay = 1000): DebounceCallback {
  let timeout: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
