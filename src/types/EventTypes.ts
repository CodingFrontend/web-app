// Generated by https://quicktype.io
export interface EventTypes {
  id: number;
  name: string;
  address: string;
  date: string;
  status: string;
  comment: string;
}

export interface AddEventParams {
  name: string;
  address: string | null;
  date: string;
  status: string;
  comment: string | null;
}

export interface UpdateEventParams {
  status: string;
}
