export type Proxied<T> = { [prop: string]: Proxied<T> };

/**
 * @description Proxy object (Meta-programming)
 * @param instance object
 * @returns A proxied object
 */
export const proxy = <T extends object>(instance: T, handler: ProxyHandler<T>): Proxied<T> & T =>
    new Proxy(instance, handler) as Proxied<T> & T;

const a = {
    a: 2,
};
const b = {
    b: 2,
};
const c = {
    get: () => b,
};
const d = proxy(a, c);

d.b;
