import React, { useState, useEffect } from "react";

import EmptyJobSheetsListImage from "images/EmptyJobSheetsList";
import { Delete } from "neetoicons";
import { Button, PageLoader } from "neetoui";
import { Container, Header, SubHeader } from "neetoui/layouts";

import JobSheetsApi from "apis/job_sheets";
import EmptyState from "components/Common/EmptyState";

import DeleteAlert from "./DeleteAlert";
import JobSheetTable from "./JobSheetTable";
import NewJobSheetPane from "./Pane/CreateJobSheet";

const JobSheets = () => {
  const [loading, setLoading] = useState(true);
  const [showNewJobSheetPane, setShowNewJobSheetPane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobSheetIds, setSelectedJobSheetIds] = useState([]);
  const [JobSheets, setJobSheets] = useState([]);

  useEffect(() => {
    fetchJobSheets();
  }, []);

  const fetchJobSheets = async () => {
    try {
      setLoading(true);
      const { data } = await JobSheetsApi.fetch();
      setJobSheets(data.job_sheets);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <Header
        title="JobSheets"
        actionBlock={
          <Button
            onClick={() => setShowNewJobSheetPane(true)}
            label="Add New JobSheet"
            icon="ri-add-line"
          />
        }
        searchProps={{
          value: searchTerm,
          onChange: e => setSearchTerm(e.target.value),
        }}
      />
      {JobSheets.length ? (
        <>
          <SubHeader
            rightActionBlock={
              <Button
                label="Delete"
                icon={Delete}
                onClick={() => setShowDeleteAlert(true)}
                disabled={!selectedJobSheetIds.length}
              />
            }
          />
          <JobSheetTable
            setSelectedJobSheetIds={setSelectedJobSheetIds}
            JobSheets={JobSheets}
            fetchJobSheets={fetchJobSheets}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyJobSheetsListImage}
          title="Looks like you don't have any JobSheets!"
          subtitle="Add your JobSheets to send customized emails to them."
          primaryAction={() => setShowNewJobSheetPane(true)}
          primaryActionLabel="Add New JobSheet"
        />
      )}
      <NewJobSheetPane
        showPane={showNewJobSheetPane}
        setShowPane={setShowNewJobSheetPane}
        fetchJobSheets={fetchJobSheets}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedJobSheetIds={selectedJobSheetIds}
          onClose={() => setShowDeleteAlert(false)}
          refetch={fetchJobSheets}
          setSelectedJobSheetIds={setSelectedJobSheetIds}
        />
      )}
    </Container>
  );
};

export default JobSheets;
