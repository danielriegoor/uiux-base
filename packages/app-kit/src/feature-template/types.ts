export type FeatureExampleStatus = "active" | "paused";

export type FeatureExample = {
  id: string;
  name: string;
  status: FeatureExampleStatus;
  updatedAt: string;
};

export type FeatureExampleInput = {
  name: string;
  status?: FeatureExampleStatus;
};
