# frozen_string_literal: true

class JobSheet < ApplicationRecord
  validates_presence_of :name, :email, :phone, :reference_number, :device_emei_or_serial_number,
    :device_problem_reported, :device_accessories_received, :device_condition, :service_report_diagnosis,
    :service_parts_used

  before_validation :generate_reference_number

  def to_param
    reference_number
  end

  private

    def generate_reference_number
      count = JobSheet.count + 1000
      self.reference_number = "COK#{count}"
    end
end
