export type Proxied<T> = T & { [prop: string]: any };

/**
 * Proxy object (Meta-programming)
 *
 * @param instance object
 *
 * @returns A proxied object
 */
export const proxy = <T extends object>(instance: T, handler: ProxyHandler<T>): Proxied<T> =>
    new Proxy(instance, handler) as Proxied<T>;
