import { toastController, modalController, popoverController } from "@ionic/vue";
import ConfimationSheet from "@/components/DataViews/actionsheet/ConfirmationSheet.vue"
import { NavBtnInterface } from "@/components/HisDynamicNavFooterInterface";
import  { icons }  from '@/utils/svg'
interface AlertConfirmationOtions {
  header?: string;
  confirmBtnLabel?: string;
  cancelBtnLabel?: string;
}

async function toast(message: string, color="primary", duration=2000, icon = '') {
    const toast = await toastController.create({
      message: message,
      position: "top",
      animated: true,
      duration: duration,
      color: color,
      cssClass: 'custom-toast',
      icon: `data:image/svg+xml;utf8,`+icon,
      keyboardClose: true,
      buttons: [
        {
          text: 'X',
          role: 'cancel',
          handler: () => {
            console.log('Dismiss clicked');
          },
        },
      ]
    });
    return toast.present();
}

export function toastWarning(message: string, duration=2000) {
  return toast(message, 'warning', duration, icons.warningAlert)
}

export function toastSuccess(message: string, duration=1000) {
  return toast(message, 'success', duration, icons.successAlert)
}

export function toastDanger(message: string, duration=2000) {
  return toast(message, 'danger', duration, icons.dangerAlert)
}

export function createAlert(message: string, header= '' as string, btns = [] as Array<NavBtnInterface>) {
  return modalController.create({
    component: ConfimationSheet,
    backdropDismiss: false,
    cssClass: "small-modal custom-modal-backdrop",
    componentProps: {
      subtitle: header,
      body: message,
      actionButtons: btns
    }
})
}

export async function alertConfirmation(message: string, options = {} as AlertConfirmationOtions) {
  const alert = await createAlert(message, options.header || 'Confirmation', [
    {
      name: options.cancelBtnLabel || 'No',
      size: 'large',
      slot: 'start',
      color: 'danger',
      visible: true,
      role: 'Cancel',
      onClick: ({role}: any) => modalController.dismiss(role)
    },
    {
        name: options.confirmBtnLabel || 'Yes',
        size: 'large',
        slot: 'end',
        color: 'success',
        visible: true,
        role: 'Confirm',
        onClick: ({role}: any) => modalController.dismiss(role)
    }
  ])
  alert.present()
  const { data } = await alert.onDidDismiss()
  return data === 'Confirm' 
}

export async function infoAlert(message: string, header="Information") 
{
  const alert = await createAlert(message, header, [
    {
      name: "OK",
      size: 'large',
      slot: 'end',
      color: 'success',
      visible: true,
      role: 'Confirm',
      onClick: () => modalController.dismiss()
    }
  ]) 
  alert.present() 
}

export async function createModal(modalComponet: any, options = {} as AlertConfirmationOtions) {
  const modal = await modalController.create({
                component: modalComponet,
                backdropDismiss: false,
                cssClass: "large-modal"
            });
            modal.present();
}
export  function createPopover(massege: any, e: any, btns = [] as Array<NavBtnInterface>) {
  return  popoverController.create({
    component: ConfimationSheet,
    backdropDismiss: false,
    event:e,
    cssClass: "delete-popover",
    showBackdrop: false,
    side: 'bottom',
    reference: 'event',
    alignment: 'center',
    componentProps: {
      subtitle: '',
      body: massege,
      actionButtons: btns
    }
});
}
export async function popoverConfirmation(massege: string, e: any,options = {} as AlertConfirmationOtions) {
    const popover = await createPopover( massege,e,[
        {
          name: 'Delete',
          size: 'small',
          slot: 'start',
          color: 'danger',
          icon: icons.delete,
          visible: true,
          role: 'Delete',
          onClick: ({role}: any) => popoverController.dismiss(role)
        },
        {
            name: 'Cancel',
            size: 'small',
            slot: 'end',
            color: 'success',
            visible: true,
            role: 'Cancel',
            fill: 'clear',
            onClick: ({role}: any) => popoverController.dismiss(role)
        }
      ]
    );
    popover.present();
    const { data } = await popover.onDidDismiss()
    return data === 'Delete'
}
