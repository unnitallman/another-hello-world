import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Button, Pane } from "neetoui";
import { Input, Textarea } from "neetoui/formik";

import JobSheetsApi from "apis/job_sheets";
import formValidationSchemas from "constants/formValidationSchemas";

export default function JobSheetForm({ onClose, refetch, JobSheet, isEdit }) {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async values => {
    try {
      setSubmitted(true);
      if (isEdit) {
        await JobSheetsApi.update(JobSheet.id, values);
      } else {
        await JobSheetsApi.create(values);
      }
      refetch();
      onClose();
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <Formik
      initialValues={JobSheet}
      onSubmit={handleSubmit}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={formValidationSchemas.JobSheetsForm}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form className="w-full">
          <Pane.Body className="space-y-6">
            <Input
              label="Name"
              name="name"
              className="w-full flex-grow-0"
              required
            />
            <Input
              label="Email"
              name="email"
              className="w-full flex-grow-0"
              required
            />
            <Input
              label="Phone"
              name="phone"
              className="w-full flex-grow-0"
              required
            />
            <Input
              label="IMEI/Serial"
              name="device_emei_or_serial_number"
              className="w-full flex-grow-0"
              required
            />
            <Textarea
              label="Reported problem"
              name="device_problem_reported"
              className="w-full flex-grow-0"
              rows={2}
              required
            />
            <Textarea
              label="Accessories received"
              name="device_accessories_received"
              className="w-full flex-grow-0"
              rows={2}
              required
            />
            <Textarea
              label="Device condition"
              name="device_condition"
              className="w-full flex-grow-0"
              rows={2}
              required
            />
            <Textarea
              label="Diagnosis"
              name="service_report_diagnosis"
              className="w-full flex-grow-0"
              rows={2}
              required
            />
            <Textarea
              label="Parts used"
              name="service_parts_used"
              className="w-full flex-grow-0"
              rows={2}
              required
            />
          </Pane.Body>
          <Pane.Footer>
            <Button
              type="submit"
              label={isEdit ? "Update" : "Save Changes"}
              size="large"
              style="secondary"
              className="mr-3"
              disabled={isSubmitting}
              loading={isSubmitting}
              onClick={e => {
                e.preventDefault();
                setSubmitted(true);
                handleSubmit();
              }}
            />

            <Button
              onClick={onClose}
              label="Cancel"
              size="large"
              style="text"
            />
            <Button
              type="submit"
              label="PRINT"
              size="large"
              style="primary"
              className="mr-3"
              disabled={isSubmitting}
              loading={isSubmitting}
              onClick={e => {
                e.preventDefault();
                window.open("/print/" + JobSheet.id, "_blank").focus();
              }}
            />
          </Pane.Footer>
        </Form>
      )}
    </Formik>
  );
}
