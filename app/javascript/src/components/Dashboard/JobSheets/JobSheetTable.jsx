import React, { useState } from "react";

import { Table } from "neetoui";

import EditJobSheetPane from "./Pane/EditJobSheet";

export const COLUMN_DATA = [
  {
    title: "Started On",
    dataIndex: "created_at",
    key: "created_at",
    width: "8%",
  },
  {
    title: "Last Updated",
    dataIndex: "updated_at",
    key: "updated_at",
    width: "8%",
  },
  {
    title: "Ref",
    dataIndex: "reference_number",
    key: "reference_number",
    width: "8%",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "8%",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "8%",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "Phone",
    width: "8%",
  },
  {
    title: "IMEI/Serial",
    dataIndex: "device_emei_or_serial_number",
    key: "device_emei_or_serial_number",
    width: "8%",
  },
  {
    title: "Reported problem",
    dataIndex: "device_problem_reported",
    key: "device_problem_reported",
    width: "8%",
  },
  {
    title: "Accessories",
    dataIndex: "device_accessories_received",
    key: "device_accessories_received",
    width: "8%",
  },
  {
    title: "Condition",
    dataIndex: "device_condition",
    key: "device_condition",
    width: "8%",
  },
  {
    title: "Diagnosis",
    dataIndex: "service_report_diagnosis",
    key: "service_report_diagnosis",
    width: "8%",
  },
  {
    title: "Parts used",
    dataIndex: "service_parts_used",
    key: "service_parts_used",
    width: "8%",
  },
];

export default function JobSheetTable({
  setSelectedJobSheetIds,
  JobSheets = [],
  fetchJobSheets,
}) {
  const [showEditJobSheet, setShowEditJobSheet] = useState(false);
  const [selectedJobSheet, setSelectedJobSheet] = useState({});
  return (
    <>
      <div className="JobSheets-table-height w-full">
        <Table
          rowData={JobSheets}
          columnData={COLUMN_DATA}
          onRowSelect={selectedRowKeys => {
            setSelectedJobSheetIds(selectedRowKeys);
          }}
          onRowClick={(_, JobSheet) => {
            setSelectedJobSheet(JobSheet);
            setShowEditJobSheet(true);
          }}
          allowRowClick={true}
        />
      </div>
      <EditJobSheetPane
        showPane={showEditJobSheet}
        setShowPane={setShowEditJobSheet}
        fetchJobSheets={fetchJobSheets}
        JobSheet={selectedJobSheet}
      />
    </>
  );
}
