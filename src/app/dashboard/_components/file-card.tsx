import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button"
import { DeleteIcon, MoreVertical,   StarIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast"
  
function FileCardActions({ file }: { file: Doc<"files"> }){

    const { toast } = useToast();
    const deleteFile = useMutation(api.files.deleteFile);
    const toggleFavorite = useMutation(api.files.toggleFavorite);
    const [IsConfirmOpen, setIsConfirmOpen] = useState(false); 
    return ( 
        <>
        <AlertDialog open={IsConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <AlertDialogTrigger></AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={async() => {
                await deleteFile({fileId: file._id,
            });
            toast({
                variant: "default",
                title: "File Deleted",
                description: "Your file is now gone from the app"
              });
            }}>Continue
            </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
        <DropdownMenuItem
            onClick={() => {
              toggleFavorite({
                fileId: file._id,
              });
            }}
            className="flex gap-1 items-center cursor-pointer"
          >
            <StarIcon className="w-4 h-4" /> Favorite
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
          onClick={() => setIsConfirmOpen(true)}
          className="flex gap-1 text-red-600 items-center cursor-pointer">
            <TrashIcon className="w-4 h-4" />Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
}

export function FileCard({ file }: { file: Doc<"files">}){
    return(
    <Card>
    <CardHeader className="relative">
        <CardTitle>
            {file.name}
        </CardTitle>
        <div className="absolute top-1 right-1">
            <FileCardActions file={file}/>
        </div>
        <CardDescription>{file.desc}</CardDescription>
    </CardHeader>
    <CardContent>
        <p>{}</p>
    </CardContent>
    <CardFooter>
        <Button>Download</Button>
    </CardFooter>
    </Card>

    )
}