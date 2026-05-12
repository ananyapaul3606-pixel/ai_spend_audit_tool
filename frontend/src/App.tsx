export default function App() {
  return (
    <AppRoutes />
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import AppShell from "./components/layout/AppShell";
import ScrollToHash from "./components/ScrollToHash";
import AuditInputPage from "./pages/AuditInputPage";
import ResultsPage from "./pages/ResultsPage";
import GraphAnalysisPage from "./pages/GraphAnalysisPage";
import ShareableLinkPage from "./pages/ShareableLinkPage";
import AISummaryPage from "./pages/AISummaryPage";
import GetReportPage from "./pages/GetReportPage";
import PerToolBreakdownPage from "./pages/PerToolBreakdownPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route
          path="/"
          element={
            <AppShell>
              <HomePage />
            </AppShell>
          }
        />
        <Route
          path="/audit"
          element={
            <AppShell>
              <AuditInputPage />
            </AppShell>
          }
        />
        <Route
          path="/results"
          element={
            <AppShell>
              <ResultsPage />
            </AppShell>
          }
        />
        <Route
          path="/analysis"
          element={
            <AppShell>
              <GraphAnalysisPage />
            </AppShell>
          }
        />
        <Route
          path="/share"
          element={
            <AppShell>
              <ShareableLinkPage />
            </AppShell>
          }
        />
        <Route
          path="/summary"
          element={
            <AppShell>
              <AISummaryPage />
            </AppShell>
          }
        />
        <Route
          path="/get-report"
          element={
            <AppShell>
              <GetReportPage />
            </AppShell>
          }
        />
        <Route
          path="/breakdown"
          element={
            <AppShell>
              <PerToolBreakdownPage />
            </AppShell>
          }
        />
        <Route
          path="/report/:id"
          element={
            <AppShell>
              <ReportPage />
            </AppShell>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
