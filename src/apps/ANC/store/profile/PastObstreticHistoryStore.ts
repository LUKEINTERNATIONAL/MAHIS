import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useObstreticHistoryStore = defineStore('obstreticHistoryStore',{
    state: () => ({
        prevPregnancies: [
            {
                isFinishBtn: false,
                sectionHeader: 'Number of previous pregnancies',
                classDash: 'dashed_bottom_border _padding',
                data:
                { 
                    rowData:[
                        {
                            colData: [
                                {
                                    inputHeader: 'Gravida',
                                    value: '',
                                    name: 'Gravida',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: ''
                                },
                                {
                                    inputHeader: 'Parity',
                                    value: '',
                                    name: 'Parity',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: ''
                                },
                                
                            ],
                            
                        },
                        {
                            colData: [
                            {
                                inputHeader: 'Abortions/Miscarriages',
                                value: '',
                                name: 'abortions',
                                required: true,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: ''
                            },
                            {
                                inputHeader: 'Live births',
                                value: '',
                                name: 'Live births',
                                required: true,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: ''
                            },
                            
                        ]
                    },
                    {
                        colData: [
                        {
                            inputHeader: 'Stillbirths',
                            value: '',
                            name: 'Stillbirths',
                            required: true,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                        },
                        
                    ]
                },

                    ],
                    
                },
          
            },   
        ] as any,
        preterm:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Was last live birth preterm',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Smoking',
                            value: 'smoking'
                        },
                    ]
                }
                    
            },
        ],
        preterm1:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: '',
                            value: 'smoking'
                        },
                    ]
                }
                    
            },
        ],
        preterm2:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: '',
                            value: 'smoking'
                        },
                    ]
                }
                    
            },
        ],
        modeOfDelivery: [
            {
                isFinishBtn: false,
                sectionHeader: 'Mode of delivery',
                classDash: 'dashed_bottom_border _padding',
                data:
                { 
                    rowData:[
                        {
                            colData: [
                                {
                                    inputHeader: 'Mode of delivery',
                                    value: '',
                                    name: 'Gravida',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: ''
                                },
                                {
                                    inputHeader: 'Number of ceasarian',
                                    value: '',
                                    name: 'Parity',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: ''
                                },
                                
                            ],
                            
                        },
                         {
                        colData: [
                            {
                                inputHeader: 'Last ceasarian section',
                                value: '',
                                name: 'ceasarian',
                                required: true,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: '',
                                isDatePopover: true,
                                icon: icons.calenderPrimary,
                                placeholder: 'Pick the date',
                            },
                            
                        ],}
                   

                    ],
                
                },
            },
          
             
        ] as any,

        PreEclampsia: false as boolean,
        Eclampsia: false as boolean,
        Puerperal: false as boolean,
        BabyDeath: false as boolean,
        Convulsions: false as boolean,
        Forceps: false as boolean,
        Mellitus: false as boolean,
        Bleeding: false as boolean,
        Macrosomia: false as boolean,
        Perineal: false as boolean,
        Asphyxia: false as boolean,
        otherComplications: '' as string,
       
    }),
    actions:{
        setPrevPregnancies(data: any){
            this.prevPregnancies = data
        },
        setPreterm(data: any){
            this.preterm = data
        },
        setPreterm1(data: any){
            this.preterm1 = data
        },
        setPreterm2(data: any){
            this.preterm2 = data
        },
        setModeOfDelivery(data:any) {
            this.modeOfDelivery = data
        },
      
        setEclampsia(value: boolean){
            this.Eclampsia = value
        },
        setPreEclampsia(value: boolean){
            this.PreEclampsia = value
        },
        setPuerperal (value: boolean){
            this.Puerperal = value
        },
        setBabyDeath(value: boolean){
            this.BabyDeath = value
        },
        setConvulsions(value: boolean){
            this.Convulsions = value
        },
        setForceps(value: boolean){
            this.Forceps = value
        },
        setMellitus(value: boolean){
            this.Mellitus = value
        },
        setBleeding(value: boolean){
            this.Bleeding = value
        },
        setMacrosomia(value: boolean){
            this.Macrosomia = value
        },
        setPerineal (value: boolean){
            this.Perineal = value
        },
        setAsphyxia(value: boolean){
            this.Asphyxia = value
        },
        setOtherComplications(value: string) {
            this.otherComplications = value
        },
        getOtherComplications() {
            return this.otherComplications
        },


      
    },
    persist:true,

})