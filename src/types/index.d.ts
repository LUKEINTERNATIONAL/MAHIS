interface SessionType {
  id?: number;
  name: string;
}

type Vaccine = {
 schedule_vaccine_id: numbe;
 session_schedule_id: number;
 drug_id: number;
 drug_name?: string;
 voided: boolean,
 missed_doses?: number;
 voided_by: string;
 date_voided: string;
 created_at: string;
 updated_at: string;
 name: string;
}

type Assignee = {
  schedule_assignee_id: number;
  session_schedule_id: number;
  user_id: number;
  voided: number;
  voided_by: string;
  date_voided: string;
  created_at: string;
  updated_at: string;
  username: string;
  given_name:string;
  family_name: string;
}

type SessionSchedule = {
  id?: number;
  session_name: string;
  repeat_type?: string;
  repeat?: string;
  target?: string;
  start_date: Date;
  end_date: Date;
  session_type: SessionType;
  session_vaccines?: { total_clients: number; vaccines: Vaccine[];  total_missed_doses?: number; }
  assignees?: Assignee[];
};

type Role = {
  role: string;
  description: string;
  uuid: string;
};

type Program = {
  program_id: number;
  concept_id: number;
  creator: number;
  date_created: string;
  changed_by: number | null;
  date_changed: string | null;
  retired: number;
  name: string;
  description: string;
  uuid: string;
};

type PersonName = {
  person_name_id: number;
  preferred: number;
  person_id: number;
  prefix: string | null;
  given_name: string;
  middle_name: string | null;
  family_name_prefix: string | null;
  family_name: string;
  family_name2: string | null;
  family_name_suffix: string | null;
  degree: string | null;
  creator: number;
  date_created: string;
  voided: number;
  voided_by: number | null;
  date_voided: string | null;
  void_reason: string | null;
  changed_by: number;
  date_changed: string;
  uuid: string;
};

type Person = {
  person_id: number;
  gender: string | null;
  birthdate: string | null;
  birthdate_estimated: number;
  dead: number;
  death_date: string | null;
  cause_of_death: string | null;
  creator: number;
  date_created: string;
  changed_by: number;
  date_changed: string;
  voided: number;
  voided_by: number | null;
  date_voided: string | null;
  void_reason: string | null;
  uuid: string;
  names: PersonName[];
};

type User = {
  user_id: number;
  system_id: string;
  username: string;
  creator: number;
  date_created: string;
  changed_by: number;
  date_changed: string;
  person_id: number;
  retired: number;
  retired_by: number | null;
  date_retired: string | null;
  retire_reason: string | null;
  uuid: string;
  deactivated_on: string | null;
  location_id: number;
  roles: Role[];
  programs: Program[];
  person: Person;
  name: string;
  id: number;
};

export {
  SessionSchedule,
  SessionType,
  Vaccine,
  Assignee,
  Role,
  Person,
  User,
  PersonName,
  Program,
};