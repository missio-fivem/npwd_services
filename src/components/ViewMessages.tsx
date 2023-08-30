import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Message } from "../types/service";
import { isEnvBrowser } from "../utils/misc";
import { MockMessages } from "../utils/constants";
import { ServerPromiseResp } from "../types/common";
import fetchNui from "../utils/fetchNui";
import CallIcon from "@mui/icons-material/Call";

interface ViewMessagesProps {
  playerJob: string;
  color: string;
}

export const ViewMessages: React.FC<ViewMessagesProps> = ({
  playerJob,
  color,
}) => {
  const [messages, setMessages] = useState<Message[] | undefined>([]);

  useEffect(() => {
    if (isEnvBrowser()) {
      setMessages(MockMessages.filter((v) => v.job == playerJob));
    } else {
      fetchNui<ServerPromiseResp<Message[]>>("npwd:services:getMessages", {
        job: playerJob,
      }).then((resp) => {
        setMessages(resp.data);
      });
    }
  }, []);

  const handleStartCall = (number: string) => {
    fetchNui<ServerPromiseResp>("npwd:services:callPlayer", {
      number,
      playerJob,
    }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <Box>
      {messages?.map((v) => {
        return (
          <Box
            sx={{
              backgroundColor: color,
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
