export interface RsxConfig {
  defaultDir: string;
  lang: 'JavaScript' | 'TypeScript',
  style: string;
  extraOptions?: {
    jest?: boolean;
    includeIndex?: boolean;
  }
}
