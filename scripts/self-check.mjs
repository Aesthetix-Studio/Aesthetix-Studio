import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const api = readFileSync("api/src/index.ts", "utf8");
const admin = readFileSync("src/app/admin/ProjectsAdmin.tsx", "utf8");
const cta = readFileSync("src/app/components/cta-section.tsx", "utf8");

assert(!api.includes("projects (id, title"), "projects insert must use the schema column name");
assert(!api.includes("UPDATE projects SET title="), "projects update must use the schema column name");
assert(admin.includes("name: string"), "project admin should read project.name");
assert(cta.includes("/api/leads"), "homepage CTA should submit leads");
