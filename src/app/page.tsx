"use client";

import {  
  useOrganization,
  useUser } from "@clerk/nextjs";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { UploadButton } from "./upload-button";
import { FileCard } from "./file-card";
 

export default function Home() {

  // Variabel yang diperlukan
  const organization = useOrganization();
  const user = useUser();

  let orgId : string | undefined = undefined;
  if(organization.isLoaded && user.isLoaded){
    orgId = organization.organization?.id ?? user.user?.id;
  };

  const files = useQuery(api.files.getFile, orgId ? {orgId} : "skip");
  
  return (
    <main className="container mx-auto pt-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Your Files</h1>
        <UploadButton />
      </div>
      {/* Display data dari database */}
      
      <div className="grid grid-cols-4 gap-4">
      {files?.map(file => {
        return <FileCard key={file._id} file={file} />;
      })}
      </div>


      {/* Membuat data. Data akan di input berdasarkan org.id */}

    </main>
  );
}
