import { MichelsonType } from '../core/enums/type';
import { IExpression } from '../typings/expression';

export type Proxied<T> = T & { [prop: string]: any };

/**
 * Proxy object (Meta-programming)
 *
 * @param instance object
 *
 * @returns A proxied object
 */
export const proxy = <V extends MichelsonType, T extends IExpression<V>>(
    instance: T,
    handler: ProxyHandler<object>,
): Proxied<T> => new Proxy(instance, handler) as Proxied<T>;
