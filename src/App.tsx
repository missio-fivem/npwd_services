import React from "react";
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
import { JobsList } from "./components/JobsList";
import { ViewMessages } from "./components/ViewMessages";
import { RecoilRoot } from "recoil";

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
  const isDarkMode = props.theme.palette.mode === "dark";

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

          <Route path={"/services"} exact>
            <JobsList />
          </Route>

          <Route path={"/services/messages"}>
            <ViewMessages />
          </Route>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

const WithProviders: React.FC<AppProps> = (props) => (
  <RecoilRoot>
    <NuiProvider>
      <App {...props} />
    </NuiProvider>
  </RecoilRoot>
);

export default WithProviders;
