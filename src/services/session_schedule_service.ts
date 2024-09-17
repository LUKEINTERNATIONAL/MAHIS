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

    private ENDPOINT: string = "eir/session_schedule";

    /**
     * @method create create a session schedule
     * @param session {SessionSchedule}
     * @returns @typeof Service
     */
    async create(session: SessionSchedule): Promise<Service> {
        return Service.postJson(this.ENDPOINT, session);
    }

    /**
     * @method get get a session schedule by id
     * @param sessionId session id
     * @returns @typeof Service
     */
    async get(sessionId: number): Promise<Service> {
        return Service.getJson(this.ENDPOINT, { session_id: sessionId });
    }

    async update(session: SessionSchedule, sessionId: number): Promise<Service> {
        return Service.putJson(`${this.ENDPOINT}/${sessionId}`, session);
    }

    /**
     * @method delete delete a session schedule
     * @param sessionId 
     * @returns 
     */
    async delete(sessionId: number, reason: string): Promise<Service> {
        return Service.delete(`${this.ENDPOINT}?id=${sessionId}`, { void_reason: reason });
    }

    /**
     * @method getSession get all session schedules paginated and filtered
     * @param _start_date
     * @param _end_date
     * @param _session_name
     * @param _page
     * @param _perPage
     * @returns @typeof Service
     */
    async getSessions(
        _start_date: string = '',
        _end_date: string = '',
        _session_name: string = "",
        _page: number = 1,
        _perPage: number = 10
    ): Promise<Service> {
        return Service.getJson(this.ENDPOINT);
    }
}
