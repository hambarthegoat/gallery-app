import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Skema table 
export default defineSchema({
  files: defineTable({ name: v.string() }),
});