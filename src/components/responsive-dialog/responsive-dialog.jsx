'use client'

import { useMediaQuery } from '@/hooks/use-media-query'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/ui-components/dialog'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/ui-components/drawer'

/**
 * Composant de dialogue responsive qui s'affiche en drawer sur mobile et en dialog sur desktop
 * @param {Object} props
 * @param {boolean} props.open - État d'ouverture du dialogue
 * @param {function} props.onOpenChange - Callback appelé lors du changement d'état
 * @param {React.ReactNode} props.trigger - Élément déclencheur du dialogue
 * @param {string} props.title - Titre du dialogue
 * @param {string} props.description - Description du dialogue
 * @param {React.ReactNode} props.children - Contenu du dialogue
 * @param {Object} props.actions - Actions du dialogue
 * @param {React.ReactNode} props.actions.cancel - Bouton d'annulation
 * @param {React.ReactNode} props.actions.confirm - Bouton de confirmation
 * @param {string} [props.size='default'] - Taille du dialogue ('default' | 'sm' | 'lg')
 * @param {string} [props.side='bottom'] - Côté d'ouverture du drawer sur mobile ('top' | 'right' | 'bottom' | 'left')
 */
export function ResponsiveDialog({
    open,
    onOpenChange,
    trigger,
    title,
    description,
    children,
    actions,
    size = 'default',
    side = 'bottom',
}) {
    const isMobile = useMediaQuery('(max-width: 768px)')

    const sizeClasses = {
        default: 'sm:max-w-[425px]',
        sm: 'sm:max-w-[320px]',
        lg: 'sm:max-w-[600px]',
    }

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
                <DrawerContent side={side}>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>{title}</DrawerTitle>
                        {description && (
                            <DrawerDescription>{description}</DrawerDescription>
                        )}
                    </DrawerHeader>
                    {children && <div className="px-4">{children}</div>}
                    {actions && (
                        <DrawerFooter className="pt-2">
                            {actions.cancel && (
                                <DrawerClose asChild>
                                    {actions.cancel}
                                </DrawerClose>
                            )}
                            {actions.confirm}
                        </DrawerFooter>
                    )}
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className={sizeClasses[size]}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                {children}
                {actions && (
                    <DialogFooter className="flex justify-end gap-2 mt-4">
                        {actions.cancel}
                        {actions.confirm}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}
