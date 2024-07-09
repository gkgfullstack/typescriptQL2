export type SiteManagementInfo = {
  ID?: string;
  name: string;
  dataSource: string;
  productType: string;
  imageURL?: string;
  imageData?: string;
  enableMetadata?: boolean;
  enableFingerprintName?: boolean;
  bookmarkCreated?: boolean | number;
  active?: number;
};
