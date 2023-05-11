import React, { useState } from "react";

import { Alert } from "neetoui";

import JobSheetsApi from "apis/job_sheets";

const DeleteAlert = ({
  refetch,
  onClose,
  selectedJobSheetIds,
  setSelectedJobSheetIds,
}) => {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await JobSheetsApi.destroy({ ids: selectedJobSheetIds });
      onClose();
      setSelectedJobSheetIds([]);
      refetch();
    } catch (error) {
      logger.error(error);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <Alert
      isOpen
      onSubmit={handleDelete}
      onClose={onClose}
      message="Are you sure you want to continue? This cannot be undone."
      title={`Delete ${selectedJobSheetIds.length} ${
        selectedJobSheetIds.length > 1 ? "JobSheets" : "JobSheet"
      }?`}
      isSubmitting={deleting}
    />
  );
};

export default DeleteAlert;
