import type { SessionSchedule } from "@/types";
import { Service } from "./service";

/**
 * @class SessionScheduleService
 * @extends Service class
 */
export class SessionScheduleService extends Service {
    constructor() {
        super();
    }

    /**
     * @method create create a session schedule
     * @param session {SessionSchedule}
     * @returns @typeof Service
     */
    async create(session: SessionSchedule): Promise<Service> {
        return Service.postJson("eir/session-schedules", session);
    }

    /**
     * @method get get a session schedule by id
     * @param sessionId session id
     * @returns @typeof Service
     */
    async get(sessionId: number): Promise<Service> {
        return Service.getJson("eir/session-schedules", { session_id: sessionId });
    }

    /**
     * @method getSession get all session schedules paginated and filtered
     * @param start_date
     * @param end_date
     * @param session_name
     * @param page
     * @param perPage
     * @returns @typeof Service
     */
    async getSessions(
        start_date: Date,
        end_date: Date,
        session_name: string = "",
        page: number = 1,
        perPage: number = 10
    ): Promise<Service> {
        return Service.getJson("eir/session-schedules", {
            start_date: start_date,
            end_date: end_date,
            session_name: session_name,
            page: page,
            page_size: perPage,
        });
    }
}
