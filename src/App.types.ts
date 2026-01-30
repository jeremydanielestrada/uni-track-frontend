export interface Governor {
  id_num: string;
  name: string;
  college_dep: string;
  password: string;
}
export interface Students {
  id: number;
  id_num: string;
  program: string;
  event_id: number;
  assigned_by: number;
  is_assigend: boolean;
  name: string;
  college_dep: string;
  events?: Event[];
}

export interface Event {
  id: number;
  event_code: string;
  gove_id: number;
  name: string;
  date: string;
  students?: Students[];
}
