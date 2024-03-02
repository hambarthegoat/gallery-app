import { ConvexError, v } from "convex/values";
import {mutation, query} from "./_generated/server";

// Membuat/upload file
export const createFile = mutation({
    args: {
        name: v.string(),
    },
    async handler(ctx, args) {

        // Validasi login user
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new ConvexError("You must be logged in to upload a file!");
        }

        await ctx.db.insert("files", {
            name: args.name,
        });
    },
});

// Mendapatkan file kembali dari database
export const getFile = query({
    args: {},
    async handler (ctx, args) {
        
        // Validasi login user
        const identity = await ctx.auth.getUserIdentity();
        
        if(!identity){
            return [];
        }
        return ctx.db.query('files').collect()
    },
});