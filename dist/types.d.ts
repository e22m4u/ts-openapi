/**
 * A callable type with the "new" operator
 * allows class and constructor.
 */
export interface Constructor<T = object> {
    new (...args: any[]): T;
}
/**
 * A type of object prototype which excludes
 * function and scalar values.
 */
export type Prototype<T = object> = T & object & {
    bind?: never;
} & {
    call?: never;
} & {
    prototype?: object;
};
/**
 * Make a specific property optional.
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
/**
 * Identity.
 */
export type Identity<T> = T;
/**
 * Flatten.
 */
export type Flatten<T> = Identity<{
    [k in keyof T]: T[k];
}>;
