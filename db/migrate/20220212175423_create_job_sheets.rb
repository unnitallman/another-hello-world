# frozen_string_literal: true

class CreateJobSheets < ActiveRecord::Migration[6.1]
  def change
    create_table :job_sheets, id: :uuid do |t|
      t.string :reference_number, null: false
      t.string :name, null: false
      t.string :email, null: false
      t.string :phone, null: false
      t.string :device_emei_or_serial_number, null: false
      t.text :device_problem_reported, null: false
      t.text :device_accessories_received, null: false
      t.text :device_condition, null: false
      t.text :service_report_diagnosis, null: false
      t.text :service_parts_used, null: false
      t.timestamps
    end
  end
end
