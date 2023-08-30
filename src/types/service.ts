export interface Player {
  name: string;
  phoneNumber: string;
  job: string;
}

export interface Job {
  label: string;
  name: string;
  color: string;
}

export interface Message {
  job: string;
  content: string;
  senderNumber: string;
  anonymous?: boolean;
}
