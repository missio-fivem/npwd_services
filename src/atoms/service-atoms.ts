import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { Job } from "../types/service";
import fetchNui from "../utils/fetchNui";
import { MockJobs } from "../utils/constants";

const jobs = atom({
  key: "serviceJobs",
  default: selector<Job[]>({
    key: "defaultServiceJobs",
    get: async () => {
      const data = await fetchNui<Job[]>("npwd:services:getJobs", {}, MockJobs);
      return data;
    },
  }),
});

const job = atom({
  key: "playerJob",
  default: selector<string>({
    key: "defaultPlayerJob",
    get: async () => {
      const data = await fetchNui<string>("npwd:services:getJob", {}, "");
      return data;
    },
  }),
});

export const usePlayerJob = () => useRecoilValue(job);
export const useServiceJobs = () => useRecoilValue(jobs);
