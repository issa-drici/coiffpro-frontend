import Header from '@/app/(app)/Header'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export const metadata = {
    title: 'Laravel - Dashboard',
}

const Dashboard = () => {
    return (
        <>
            <Header title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xs sm:rounded-lg">
                        <div className="p-6 bg-blue-400 border-b border-gray-200">
                            You are logged in Riyad!
                        </div>
                        <Button>Clique ici</Button>
                        <AlertDialog>
                            <AlertDialogTrigger>Ouvrir</AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Etes-vous sûr de vouloir supprimer votre compte ?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Cela supprimera toutes vos données de navigation. Cela ne peut pas être annulé.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Annuler
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                        Continuer
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
