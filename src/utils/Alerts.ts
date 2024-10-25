import { toastController, modalController, popoverController } from "@ionic/vue";
import ConfimationSheet from "@/components/DataViews/actionsheet/ConfirmationSheet.vue";
import { NavBtnInterface } from "@/components/HisDynamicNavFooterInterface";
import { icons } from "@/utils/svg";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
interface AlertConfirmationOtions {
    header?: string;
    confirmBtnLabel?: string;
    cancelBtnLabel?: string;
}

export function toastWarning(message: string, duration = 3000) {
    toast.warn(message, {
        theme: "colored",
        autoClose: duration,
        transition: "zoom",
        dangerouslyHTMLString: true,
    });
}

export function toastSuccess(message: string, duration = 3000) {
    toast.success(message, {
        theme: "colored",
        autoClose: duration,
        transition: "zoom",
        dangerouslyHTMLString: true,
    });
}

export function toastDanger(message: string, duration = 3000) {
    toast.error(message, {
        theme: "colored",
        autoClose: duration,
        transition: "zoom",
        dangerouslyHTMLString: true,
    });
}

export function createAlert(message: string, header = "" as string, btns = [] as Array<NavBtnInterface>) {
    return modalController.create({
        component: ConfimationSheet,
        backdropDismiss: false,
        cssClass: "otherVitalsModal",
        componentProps: {
            subtitle: header,
            body: message,
            actionButtons: btns,
        },
    });
}

export async function alertConfirmation(message: string, options = {} as AlertConfirmationOtions) {
    const alert = await createAlert(message, options.header || "Confirmation", [
        {
            name: options.cancelBtnLabel || "No",
            size: "Default",
            slot: "start",
            color: "danger",
            visible: true,
            role: "Cancel",
            onClick: ({ role }: any) => modalController.dismiss(role),
        },
        {
            name: options.confirmBtnLabel || "Yes",
            size: "Default",
            slot: "end",
            color: "success",
            visible: true,
            role: "Confirm",
            onClick: ({ role }: any) => modalController.dismiss(role),
        },
    ]);
    alert.present();
    const { data } = await alert.onDidDismiss();
    return data === "Confirm";
}

export async function infoAlert(message: string, header = "Information") {
    const alert = await createAlert(message, header, [
        {
            name: "OK",
            size: "large",
            slot: "end",
            color: "success",
            visible: true,
            role: "Confirm",
            onClick: () => modalController.dismiss(),
        },
    ]);
    alert.present();
}

export async function createModal(
    modalComponent: any,
    options: any = {},
    BACKDROPDISMISS = true,
    props = {},
    eventHandlers: { [key: string]: (event: CustomEvent<any>) => void } = {}
) {
    const modal = await modalController.create({
        component: modalComponent,
        backdropDismiss: BACKDROPDISMISS,
        cssClass: options.class || "large-modal",
        componentProps: props,
    });

    // Set up event listeners
    Object.entries(eventHandlers).forEach(([eventName, handler]) => {
        modal.addEventListener(eventName, (event: Event) => {
            if (event instanceof CustomEvent) {
                handler(event);
            }
        });
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    return data;
}
export function createPopover(massege: any, e: any, options: any, btns = [] as Array<NavBtnInterface>) {
    return popoverController.create({
        component: ConfimationSheet,
        backdropDismiss: false,
        event: e,
        cssClass: "delete-popover",
        showBackdrop: options.showBackdrop,
        side: "bottom",
        reference: "event",
        alignment: "center",
        componentProps: {
            subtitle: "",
            body: massege,
            actionButtons: btns,
        },
    });
}
export async function popoverConfirmation(massege: string, e: any, options = {} as any) {
    const popover = await createPopover(massege, e, options, [
        {
            name: options.confirmBtnLabel || "Delete",
            size: "small",
            slot: "start",
            color: "danger",
            icon: options.icon || options.icon == "" ? "" : icons.delete,
            visible: true,
            role: "Delete",
            onClick: ({ role }: any) => popoverController.dismiss(role),
        },
        {
            name: "Cancel",
            size: "small",
            slot: "end",
            color: "",
            visible: true,
            role: "Cancel",
            fill: "clear",
            onClick: ({ role }: any) => popoverController.dismiss(role),
        },
    ]);
    popover.present();
    const { data } = await popover.onDidDismiss();
    return data === "Delete";
}
