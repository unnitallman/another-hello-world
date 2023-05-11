# frozen_string_literal: true

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["reset_and_populate_sample_data"].invoke if Rails.env.development?
end

desc "Populates sample data without resetting the database first"
task populate_sample_data: [:environment] do
  create_sample_data!
  puts "sample data has been added."
end

desc "Populates sample data without after resetting the database"
task reset_and_populate_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data"
  elsif Rails.env.staging?
    puts "Skipping deleting and populating sample data"
  else
    delete_all_records_from_all_tables
    Rake::Task["populate_sample_data"].invoke
  end
end

#
# DO NOT CHANGE ANYTHING IN THIS METHOD
# This is last layer of defense against deleting data in production
# If you need to delete data in staging or in production
# please execute the command manually and do not change this method
#
def delete_all_records_from_all_tables
  if Rails.env.production?
    raise "deleting all records in production is not alllowed"
  else
    Rake::Task["db:schema:load"].invoke
  end
end

def create_sample_data!
  create_user! email: "oliver@example.com"
  create_job_sheets!
end

def create_job_sheets!
  JobSheet.create(
    {
      name: "Srihari Kookal",
      email: "srihari@bigbinary.com",
      phone: "9999999999",
      device_emei_or_serial_number: "ABBPU3498A",
      device_problem_reported: "Not turning ON",
      device_accessories_received: "Charger",
      device_condition: "Normal. No physical damage",
      service_report_diagnosis: "Battery cycles exhausted",
      service_parts_used: "Apple original 4000MAH Battery"
    })

  JobSheet.create(
    {
      name: "Junil Jacob",
      email: "junil@bigbinary.com",
      phone: "9898989898",
      device_emei_or_serial_number: "B123234NB",
      device_problem_reported: "Bad pixels",
      device_accessories_received: "-",
      device_condition: "Scratches on the screen",
      service_report_diagnosis: "Multiple bad pixels located on the screen",
      service_parts_used: "2017 MBP screen"
    })
end

def create_user!(options = {})
  user_attributes = {
    password: "welcome",
    first_name: "Oliver",
    last_name: "Smith",
    role: "super_admin"
  }
  attributes = user_attributes.merge options
  User.create! attributes
end
