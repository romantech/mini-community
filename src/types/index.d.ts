// Giving void will make the generic type optional.
// reference : https://stackoverflow.com/a/62280834/3730665
type VoidHandler<T = void> = (...args: T[]) => void;

type AspectRatio = 'auto' | 'square' | 'video' | 'thumb' | 'content';
