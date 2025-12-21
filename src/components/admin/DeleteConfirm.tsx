import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    isPending?: boolean;
}

export const DeleteConfirm = ({
    open,
    onOpenChange,
    onConfirm,
    title = "Apakah Anda yakin?",
    description = "Tindakan ini tidak dapat dibatalkan. Data akan dihapus secara permanen dari server.",
    isPending = false,
}: DeleteConfirmProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="rounded-2xl border-none shadow-elevated">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold text-foreground">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground pt-2">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="pt-4 gap-2">
                    <AlertDialogCancel className="rounded-xl border-border hover:bg-muted font-medium">
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        disabled={isPending}
                        className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold px-6"
                    >
                        {isPending ? "Menghapus..." : "Ya, Hapus"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
