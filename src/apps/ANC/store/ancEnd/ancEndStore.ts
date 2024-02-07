import { defineStore } from "pinia"

const ancEndForm ={
        Inlabour:{
        name:"In labour",
        value:"Inlabour"
    },
        liveBirth:{
        name:"Live birth",
        value:"liveBirth"
    },
       stillbirth:{
        name:"Stillbirth",
        value:"stillbirth"
    },
        miscarriage:{
        name:'Miscarriage',
        value:'miscarriage'
    },
        abortion:{
        name:"Abortion",
        value:"abortion"
    },
        death:{
        name:"Death",
        value:"death"
    },
        lostFollowUp:{
        name:"Lost to follow up",
        value:"lostFollowUp"
    },
        timeScheduledReferral:{
        name:"time scheduled referral",
        value:"timeScheduledReferral"
    },
        movedAway:{
        name:"Moved away",
        value:" movedAway"
    },
        falsePregnancy:{
        name:"False pregnancy",
        value:"falsePregnancy"
    },
        wrongEntry:{
        name:"Wrong entry",
        value:"wrongEntry"
    },
        otherOnClosingANC:{
        name:"Other",
        value:"otherOnClosingANC"
    },
    specifyOnAncClosing:{
        name:"Specify",
        value:"specifyOnAncClosing"
    },
        dateofDelivery:{
        name:"Date of delivery",
        value:"dateofDelivery"
    },
        timeOfDelivery:{
        name:"Time of delivery",
        value:"timeOfDelivery"
    },
        home:{
        name:"Home",
        value:"home"
    },
       healthCareFacility:{
        name:"Health-care facility",
        value:"healthCareFacility"
    },
        otherOnPlaceDelivery:{
        name:"Other",
        value:"otherOnPlaceDelivery"
    },
        specifyOnPlaceDelivery:{
        name:"Specify",
        value:"specifyOnPlaceDelivery"
    },
       pretermDeathYes:{
        name:"Yes",
        value:"no"
    },
        pretermDeathNo:{
        name:"No",
        value:"no"
    },
        normal:{
        name:"Normal",
        value:"normal"
    },
        forceps:{
        name:"Forceps",
        value:"forceps"
    },
        vacuum:{
        name:"Vacuum",
        value:"vacuum"
    },
        cSection:{
        name:"C-section",
        value:"cSection"
    },
        weight:{
        name:"Weight",
        value:"weight"
    },
   
}

export const useAncEndStore = defineStore('ancEndStore',{
    state: () =>({
        referralInfo:[] as any,
    }),
        actions:{
        addReferralInfo(data:any){
            this.referralInfo = data
        }
    },
    persist:true
})