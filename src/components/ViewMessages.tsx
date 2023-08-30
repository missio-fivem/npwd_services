import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Message } from "../types/service";
import fetchNui from "../utils/fetchNui";
import CallIcon from "@mui/icons-material/Call";
import { usePlayerJob } from "../atoms/service-atoms";

interface ViewMessagesProps {}

export const ViewMessages: React.FC<ViewMessagesProps> = () => {
  const playerJob = usePlayerJob();
  const [messages, setMessages] = useState<Message[] | undefined>([]);

  const getMessages = async () => {
    const data = await fetchNui<Message[]>("npwd:services:getMessages", {
      job: playerJob,
    });
    setMessages(data);
  };

  useEffect(() => {
    getMessages();
  }, []);

  const handleStartCall = (number: string) => {
    fetchNui("npwd:services:callPlayer", {
      number,
      playerJob,
    });
  };

  return (
    <Box>
      {messages?.map((v) => {
        return (
          <Box
            sx={{
              backgroundColor: "black",
              padding: "0.3rem 0.5rem 0.5rem",
              borderRadius: "0.3rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontSize={17} color="white" fontWeight="bold">
                {v.senderNumber}
              </Typography>

              <IconButton
                onClick={() => handleStartCall(v.senderNumber)}
                sx={{ color: "white" }}
              >
                <CallIcon />
              </IconButton>
            </Box>

            <Box sx={{ color: "white" }}>{v.content}</Box>
          </Box>
        );
      })}
    </Box>
  );
};
