'use client';

import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFile);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton>
          <Button>Sign out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode='modal'>
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>

      {/* Display data dari database */}
      {files?.map(file => {
        return <div key={file._id}>{file.name}</div>;
      })}

      {/* Membuat data */}
      <Button onClick={()=>{
        createFile({
          name: "Hello World!",
        });
      }}>Click me</Button>
    </main>
  );
}
