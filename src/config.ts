import { createMeshConfig } from "@baditaflorin/mesh-common";

export const config = createMeshConfig({
  appName: "mesh-choice-board",
  breadcrumbs: false,
  description: "A shared, multi-select decision board for small groups.",
  accentHex: "#7c3aed",
  version: __APP_VERSION__,
  commit: __GIT_COMMIT__,
});
