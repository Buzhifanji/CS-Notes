export interface LinkNode<T> {
    value: T,
    next: LinkNode<T> | null
}