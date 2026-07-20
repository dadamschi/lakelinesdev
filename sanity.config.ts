"use client";

/**
 * Sanity Studio configuration, mounted at /studio via
 * src/app/studio/[[...tool]]/page.tsx
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "lakelinesdev",
  title: "Lakelines Dev",
  basePath: "/studio",
  // Falls back to a placeholder so the app still builds before you add your
  // real project ID to .env.local
  projectId: projectId || "placeholder",
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings")
              ),
            S.listItem()
              .title("About Page")
              .id("aboutPage")
              .child(
                S.document().schemaType("aboutPage").documentId("aboutPage")
              ),
            S.divider(),
            S.documentTypeListItem("project").title("Projects"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
