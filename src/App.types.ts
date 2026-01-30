export interface Governor {
  id_num: string;
  name: string;
  college_dep: string;
  password: string;
}

export interface Event {
  id: number;
  event_code: string;
  gove_id: number;
  name: string;
  date: string;
}
