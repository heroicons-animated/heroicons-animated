import fs from "node:fs";
import path from "node:path";
import { SITE } from "@/constants";
import type { Schema } from "./registry-schema";

const FRAMEWORK_NAME = "React";
const ICONS_DIR = path.join(import.meta.dirname, "../react/src/icons");
const ICON_EXTENSION = ".tsx";
const REGISTRY_PATH = path.join(import.meta.dirname, "../public/r");
const REGISTRY_INDEX_PATH = path.join(REGISTRY_PATH, "registry.json");
const REGISTRY_ROOT_PATH = path.join(import.meta.dirname, "../registry.json");
const ITEM_SCHEMA_URL = "https://ui.shadcn.com/schema/registry-item.json";
const REGISTRY_SCHEMA_URL = "https://ui.shadcn.com/schema/registry.json";
const DEPENDENCIES = ["motion"];

const stripContentFromSchema = (schema: Schema): Schema => {
  const { files, $schema: _itemSchema, ...rest } = schema;
  return {
    ...rest,
    files: files.map((file) => {
      const { content: _content, ...fileWithoutContent } = file;
      return fileWithoutContent;
    }),
  };
};

const writeSchemaFile = (
  registryPath: string,
  name: string,
  schema: Schema
) => {
  fs.writeFileSync(
    path.join(registryPath, `${name}.json`),
    JSON.stringify(schema, null, 2)
  );
};

const buildRegistryItems = (): Schema[] => {
  const registryItems: Schema[] = [];

  if (!fs.existsSync(ICONS_DIR)) {
    console.warn(`  ⚠️  Icons directory not found: ${ICONS_DIR}`);
    console.warn("  ⚠️  Run icon generation scripts first.\n");
    return registryItems;
  }

  const iconFiles = fs
    .readdirSync(ICONS_DIR)
    .filter((file) => file.endsWith(ICON_EXTENSION));

  for (const file of iconFiles) {
    const name = file.replace(ICON_EXTENSION, "");
    const content = fs.readFileSync(path.join(ICONS_DIR, file), "utf8");

    const schema: Schema = {
      $schema: ITEM_SCHEMA_URL,
      name,
      title: name,
      description: `Animated ${name} icon for ${FRAMEWORK_NAME}`,
      type: "registry:ui",
      registryDependencies: [],
      dependencies: DEPENDENCIES,
      files: [
        {
          path: `${name}${ICON_EXTENSION}`,
          content,
          type: "registry:ui",
        },
      ],
    };

    writeSchemaFile(REGISTRY_PATH, name, schema);
    registryItems.push(stripContentFromSchema(schema));
  }

  return registryItems;
};

const buildRegistry = () => {
  if (!fs.existsSync(REGISTRY_PATH)) {
    fs.mkdirSync(REGISTRY_PATH, { recursive: true });
  }

  console.log(`\n🔨 Building ${FRAMEWORK_NAME} registry components...\n`);

  const registryItems = buildRegistryItems();

  const registryIndex = {
    $schema: REGISTRY_SCHEMA_URL,
    name: SITE.NAME,
    homepage: SITE.URL,
    items: registryItems,
  };

  const registryIndexJson = JSON.stringify(registryIndex, null, 2);
  fs.writeFileSync(REGISTRY_INDEX_PATH, registryIndexJson);
  fs.writeFileSync(REGISTRY_ROOT_PATH, registryIndexJson);

  console.log(
    `✅ Built ${registryItems.length} ${FRAMEWORK_NAME} registry components`
  );
  console.log(`✅ Updated ${FRAMEWORK_NAME} registry.json\n`);
};

buildRegistry();
