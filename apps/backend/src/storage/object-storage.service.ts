export interface StorageUploadInput {
  key: string;
  sourcePath: string;
  contentType?: string;
}

export interface StorageUploadResult {
  provider: "cloudflare-r2" | "backblaze-b2";
  key: string;
  status: "queued" | "uploaded";
}

export const objectStorageService = {
  upload(input: StorageUploadInput): StorageUploadResult {
    return {
      provider: "cloudflare-r2",
      key: input.key,
      status: "queued"
    };
  }
};
