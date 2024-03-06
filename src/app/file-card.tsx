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
  
  
import { Doc } from "../../convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import { DeleteIcon, FileTextIcon, GanttChartIcon, ImageIcon, MoreVertical, TextIcon, TrashIcon } from "lucide-react"
import { ReactNode, useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
  
function FileCardActions({ file }: { file: Doc<"files"> }){

    const { toast } = useToast();
    const deleteFile = useMutation(api.files.deleteFile);
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
        <DropdownMenuTrigger><MoreVertical/></DropdownMenuTrigger>
        <DropdownMenuContent>
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

function getFileUrl(fileId: Id<"_storage">): string {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`
}

export function FileCard({ file }: { file: Doc<"files">}){
  const typeIcons = {
    "image": <ImageIcon />, 
    "pdf": <FileTextIcon />,
    "csv": <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;

    return(
    <Card>
    <CardHeader className="relative">
        <CardTitle className="flex gap-2">
        <div className="flex justify-center">{typeIcons[file.type]}</div>
        {file.name}
        </CardTitle>
        <div className="absolute top-1 right-1">
            <FileCardActions file={file}/>
        </div>
        <CardDescription>{file.desc}</CardDescription>
    </CardHeader>
    <CardContent className="h-[200px] flex justify-center items-center">
      {
        file.type ===  'image' && <Image 
        alt={file.name}
        width="200"
        height="100"
        src={getFileUrl(file.fileId)}
        />
      }
     {file.type ===  'csv' && <GanttChartIcon className="w-20 h-20"/>}
     {file.type ===  'pdf' && <FileTextIcon className="w-20 h-20"/>}
    </CardContent>
    <CardFooter className="flex justify-center">
        <Button onClick={()=>{
          window.open(getFileUrl(file.fileId), "_blank")
        }}>Download</Button>
    </CardFooter>
    </Card>

    )
}