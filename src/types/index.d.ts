// Giving void will make the generic type optional.
// reference : https://stackoverflow.com/a/62280834/3730665
type VoidHandler<T = void> = (...args: T[]) => void;

type ValueOf<T> = T[keyof T];
type KeyOf<T> = keyof T;
type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];

type AspectRatio = 'auto' | 'square' | 'video' | 'thumb' | 'content';
type FileTypeString = '사진' | '비디오' | '오디오';

// ISO 8601 포맷에 대한 타입 정의
// reference: https://gist.github.com/MrChocolatine/367fb2a35d02f6175cc8ccb3d3a20054
interface Date {
  toISOString(): TDateISO; // In TS, interfaces are "open" and can be extended
}

type TYear = `${number}${number}${number}${number}`;
type TMonth = `${number}${number}`;
type TDay = `${number}${number}`;
type THours = `${number}${number}`;
type TMinutes = `${number}${number}`;
type TSeconds = `${number}${number}`;
type TMilliseconds = `${number}${number}${number}`;

type TDateISODate = `${TYear}-${TMonth}-${TDay}`; // Represent a string like `2021-01-08`
type TDateISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`; // Represent a string like `14:42:34.678`

/**
 * Represent a string like `2021-01-08T14:42:34.678Z` (format: ISO 8601).
 * It is not possible to type more precisely (list every possible values for months, hours etc.)
 * as it would result in a warning from TypeScript:
 * Expression produces a union type that is too complex to represent. ts(2590)
 */
type TDateISO = `${TDateISODate}T${TDateISOTime}Z`;
