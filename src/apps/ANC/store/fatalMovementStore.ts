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
        fatalMovements:[
             {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Select whether the woman has felt the baby make:',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: fatalForm.normalFetalMovement.name,
                            value: fatalForm.normalFetalMovement.value
                        },
                        {
                            name: fatalForm.reducedPoorFetalMovement.name,
                            value: fatalForm.reducedPoorFetalMovement.value,
                        },
                        {
                            name: fatalForm.noFetalMovement.name,
                            value: fatalForm.noFetalMovement.value,
                        },
                    ]
                }
            },
        ]
    })
})        
