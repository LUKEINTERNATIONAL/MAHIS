import { defineStore } from "pinia"

const fatalForm={
    normalFetalMovement:{
        name:"Normal fetal movement",
        value:"normalFetalMovement"
    },
       reducedPoorFetalMovement:{
        name:"Reduced or poor fetal movement",
        value:"reducedPoorFetalMovement"
    },
       noFetalMovement:{
        name:"No fetal movement",
        value:"noFetalMovement"
    }
}

export const useFatalMovementStore =  defineStore('fatalMovementStore',{
    state: ()=>({
        fatalMovement:[
             {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: '',
                        selectedValue: '',
                        name:"Fetal movement"
                    },
                    data:[
                        {
                            name: "Normal fetal movement",
                            value: "Normal fetal movement",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: "Reduced or poor fetal movement",
                            value: "Poor fetal movement",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: "No fetal movement",
                            value: "No fetal movements",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                    ]
                }
            },
        ]as any,
    }),

    actions:{
        addFatalMovements(data:any){
            this.fatalMovement =  data
        }
    },
    persist:true
})        
