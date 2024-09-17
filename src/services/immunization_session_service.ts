import { Service } from "@/services/service";
import { construct } from "ionicons/icons";


export class ImmunizationSessionService extends Service {
    constructor(){
        super();
    }

    postSessions(sessions: any){
        return Service.postJson("/immunization/sessions",sessions);
    }

    getSessions(start_date: any, end_date: any, session_name = "", page = 1){
        return Service.getJson("immunization/sessions", { start_date: start_date, 
            end_date: end_date, session_name: session_name, page: page, page_size: 4});
    }

    getSession( sessionId: number) {
        return Service.getJson("immunization/sessions", { session_id: sessionId });
    }

}