interface SessionType {
    id?: number;
    name: string;
}

type SessionSchedule = {
    id?: number;
    session_name: string;
    repeat?: string;
    target?: string;
    start_date: Date;
    end_date: Date;
    session_type: SessionType;
    user_ids?: number[];
}

export {
    SessionSchedule,
    SessionType
}