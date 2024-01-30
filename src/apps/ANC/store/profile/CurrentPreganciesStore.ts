import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useCurrentPregnanciesStore = defineStore('currentPregnanciesStore',{
    state: () => ({
        currentPregnancies:[    
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',
                data:
                { 
                    rowData:[
                        {
                            colData: [
                                {
                                    inputHeader: 'LNMP',
                                    value: '',
                                    name: 'LNMP',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: '',
                                    isDatePopover: true,
                                    icon: icons.calenderPrimary,
                                    placeholder: 'Pick the date',
                                },
                                {
                                    inputHeader: 'Ultrasound scan date',
                                    value: '',
                                    name: 'ultrasound',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: '',
                                    isDatePopover: true,
                                    icon: icons.calenderPrimary,
                                    placeholder: 'Pick the date',
                                },
                                
                            ],
                            
                        },
                         {
                        colData: [
                            {
                                inputHeader: 'Gestation age',
                                value: '',
                                name: 'gestation',
                                required: true,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: '',
                                
                            },
                            
                        ],}
                   

                    ],
                
                },
            },
          
             
        ] as any,
       deliveryDate :[{
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        data:
        { 
            rowData:[
                {
                    colData: [
                        {
                            inputHeader: 'Expected Delivery Date',
                            value: '',
                            name: 'EDD',
                            required: true,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: '',
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: 'Pick the date',
                        },
                        
                    ],
                    
                },
           

            ],
        
        },
                
    }]
    }),
    actions:{
        setPrevPregnancies(data: any){
            this.currentPregnancies = data
        },
        setDeliveryDate(data: any){
            this.deliveryDate = data
        },


      
    },
    persist:true,

})