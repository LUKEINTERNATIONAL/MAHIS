import { defineStore } from 'pinia'

export const useConfigurationStore = defineStore('configurationStore',{
    state: () => ({
        registrationDisplayType: 'list'
    }),
    actions:{
        setRegistrationDisplayType(data: any){
            this.registrationDisplayType = data
        }
    },
    persist:true,

})