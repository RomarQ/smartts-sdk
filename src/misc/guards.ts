export const hasToString = (e: unknown): e is { toString: () => string } => {
    if (typeof e === 'function') {
        return 'toString' in e.prototype;
    }
    if (e && typeof e === 'object') {
        return 'toString' in e;
    }
    return false;
};
