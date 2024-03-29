import React from "react";

import { Pane, Typography } from "neetoui";

import Form from "./Form";

export default function EditJobSheetPane({
  fetchJobSheets,
  showPane,
  setShowPane,
  JobSheet,
}) {
  const onClose = () => setShowPane(false);

  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Edit JobSheet
        </Typography>
      </Pane.Header>
      <Form
        onClose={onClose}
        refetch={fetchJobSheets}
        JobSheet={JobSheet}
        isEdit={true}
      />
    </Pane>
  );
}
