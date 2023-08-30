import React, { useEffect, useState } from "react";
import { NuiProvider } from "react-fivem-hooks";
import { Route, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./styles/header.styles";
import { IPhoneSettings } from "@project-error/npwd-types";
import { i18n } from "i18next";
import {
  IconButton,
  Theme,
  StyledEngineProvider,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Job } from "./types/service";
import { MockJobs } from "./utils/constants";
import fetchNui from "./utils/fetchNui";
import { ServerPromiseResp } from "./types/common";
import { JobsList } from "./components/JobsList";
import { isEnvBrowser } from "./utils/misc";
import { ViewMessages } from "./components/ViewMessages";

const Container = styled.div<{ isDarkMode: any }>`
  flex: 1;
  padding: 1.5rem;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  overflow: auto;
  max-height: 100%;
  background-color: #fafafa;
  ${({ isDarkMode }) =>
    isDarkMode &&
    `
    background-color: #212121;
  `}
`;
interface AppProps {
  theme: Theme;
  i18n: i18n;
  settings: IPhoneSettings;
}

const App = (props: AppProps) => {
  const history = useHistory();
  const [playerJob, setPlayerJob] = useState("police");
  const [jobs, setJobs] = useState<Job[] | undefined>([]);

  const isDarkMode = props.theme.palette.mode === "dark";

  useEffect(() => {
    if (isEnvBrowser()) {
      setJobs(MockJobs);
    } else {
      fetchNui<ServerPromiseResp<Job[]>>("npwd:services:getJobs").then(
        (resp) => {
          setJobs(resp.data);
        }
      );
    }
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={props.theme}>
        <Container isDarkMode={isDarkMode}>
          <Header>
            <IconButton color="primary" onClick={() => history.goBack()}>
              <ArrowBack />
            </IconButton>
            <Typography fontSize={24} color="primary" fontWeight="bold">
              Services
            </Typography>
          </Header>

          <Route path={"/"} exact>
            <JobsList jobs={jobs || []} playerJob={playerJob} />
          </Route>

          <Route path={"/messages"}>
            <ViewMessages
              playerJob={playerJob}
              color={jobs?.find((v) => v.name == playerJob)?.color || "red"}
            />
          </Route>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

const WithProviders: React.FC<AppProps> = (props) => (
  <NuiProvider>
    <App {...props} />
  </NuiProvider>
);

export default WithProviders;
