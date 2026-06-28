export type AppMetadataStatus = "foundation-ready";

export type AppMetadataInput = {
  name: string;
  packageName: string;
};

export type AppMetadata = AppMetadataInput & {
  status: AppMetadataStatus;
};

export function createAppMetadata(input: AppMetadataInput): AppMetadata {
  return {
    ...input,
    status: "foundation-ready"
  };
}
