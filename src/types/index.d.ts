// Giving void will make the generic type optional.
// reference : https://stackoverflow.com/a/62280834/3730665
type VoidHandler<T = void> = (...args: T[]) => void;
type ValueOf<T> = T[keyof T];

type AspectRatio = 'auto' | 'square' | 'video' | 'thumb' | 'content';
type FileTypeString = '사진' | '비디오' | '오디오';
