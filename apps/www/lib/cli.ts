import type { Framework } from "@heroicons-animated/shared";
import { type PACKAGE_MANAGER, SITE } from "@heroicons-animated/shared";
import { getPackageManagerPrefix } from "./get-package-manager-prefix";

type PackageManager = (typeof PACKAGE_MANAGER)[keyof typeof PACKAGE_MANAGER];

export const getFileExtension = (framework: Framework): string => {
  switch (framework) {
    case "react":
      return "tsx";
    case "vue":
      return "vue";
    case "svelte":
      return "svelte";
    default:
      return "tsx";
  }
};

export const getFrameworkName = (framework: Framework): string => {
  switch (framework) {
    case "react":
      return "React";
    case "vue":
      return "Vue";
    case "svelte":
      return "Svelte";
    default:
      return "React";
  }
};

export const getShadcnCLI = (framework: Framework): string => {
  switch (framework) {
    case "react":
      return "shadcn";
    case "vue":
      return "shadcn-vue";
    case "svelte":
      return "shadcn-svelte";
    default:
      return "shadcn";
  }
};

export const getRegistryPathPrefix = (framework: Framework): string => {
  switch (framework) {
    case "react":
      return "/";
    case "vue":
      return "/vue/";
    case "svelte":
      return "/svelte/";
    default:
      return "/";
  }
};

export const getRegistryUrl = (
  framework: Framework,
  iconName: string
): string => {
  const baseUrl = `${SITE.URL}/r`;
  return framework === "react"
    ? `${baseUrl}/${iconName}.json`
    : `${baseUrl}/${framework}/${iconName}.json`;
};

export const getCLICommand = (
  packageManager: PackageManager,
  framework: Framework,
  iconName: string
): string => {
  const prefix = getPackageManagerPrefix(packageManager);
  const cli = getShadcnCLI(framework);
  const registryUrl = getRegistryUrl(framework, iconName);
  return `${prefix} ${cli} add "${registryUrl}"`;
};
