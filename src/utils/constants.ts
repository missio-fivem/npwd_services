import { Job, Message } from "../types/service";

export const MockJobs: Job[] = [
  { name: "police", label: "Poliisi", color: "#135DD8" },
  { name: "ambulance", label: "Ensihoito", color: "#ff0000" },
];

export const MockMessages: Message[] = [
  {
    job: "police",
    content: "Testi gay",
    senderNumber: "1321-2312213-213",
  },
];
