import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import { Job } from "../types/service";
import MessageIcon from "@mui/icons-material/Message";
import ViewIcon from "@mui/icons-material/ViewColumn";
import CloseIcon from "@mui/icons-material/Close";
import fetchNui from "../utils/fetchNui";
import { NavLink } from "react-router-dom";
import { isEnvBrowser } from "../utils/misc";
import { usePlayerJob, useServiceJobs } from "../atoms/service-atoms";

interface JobsListProps {}

interface JobBoxProps {
  job: Job;
  playerJob: string;
}

export const JobBox: React.FC<JobBoxProps> = ({ job, playerJob }) => {
  const [open, setOpen] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  const handleSend = () => {
    if (messageContent.length === 0) return;

    if (isEnvBrowser()) {
      console.log("message", messageContent, "anonymous", anonymous);
    } else {
      fetchNui("npwd:services:sendMessage", {
        content: messageContent,
        anonymous: anonymous,
        job: job,
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: job.color,
        padding: "0.3rem",
        borderRadius: "0.4rem",
      }}
    >
      <Box
        sx={{
          backgroundColor: job.color,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontSize={17} color="white" fontWeight="bold">
          {job.label}
        </Typography>

        <Box>
          <IconButton onClick={() => setOpen(!open)} sx={{ color: "white" }}>
            {!open ? <MessageIcon /> : <CloseIcon />}
          </IconButton>

          {playerJob == job.name && (
            <NavLink to={"/services/messages"}>
              <IconButton sx={{ color: "white" }}>
                <ViewIcon />
              </IconButton>
            </NavLink>
          )}
        </Box>
      </Box>

      {open && (
        <Box>
          <TextField
            onChange={(e) => setMessageContent(e.target.value)}
            label="Viesti"
            fullWidth
            multiline
            rows={5}
          />

          <FormControlLabel
            control={
              <Checkbox onChange={(e) => setAnonymous(e.target.checked)} />
            }
            label="Anonyymi"
          />
          <Button
            fullWidth
            onClick={handleSend}
            sx={{ marginTop: "0.4rem" }}
            color="inherit"
            variant="contained"
          >
            Lähetä
          </Button>
        </Box>
      )}
    </Box>
  );
};

export const JobsList: React.FC<JobsListProps> = () => {
  const jobs = useServiceJobs();
  const playerJob = usePlayerJob();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
      }}
    >
      {jobs.map((v, k) => (
        <JobBox job={v} playerJob={playerJob} />
      ))}
    </Box>
  );
};
