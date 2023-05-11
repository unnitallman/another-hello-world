# frozen_string_literal: true

class Api::V1::JobSheetsController < Api::V1::BaseController
  before_action :load_job_sheet!, only: %i[update show]
  before_action :load_job_sheets!, only: :bulk_delete

  def index
    render json: { job_sheets: JobSheet.order("created_at desc") }
  end

  def create
    if (job_sheet = JobSheet.new(job_sheet_params)) && job_sheet.save
      render status: :ok, json: {
        job_sheet: job_sheet,
        notice: "#{job_sheet.reference_number} has been created!"
      }
    else
      render status: :unprocessable_entity, json: {
        error: job_sheet.errors.full_messages.to_sentence
      }
    end
  end

  def show
    render status: :ok, json: {
      job_sheet: @job_sheet
    }
  end

  def update
    if @job_sheet.update(job_sheet_params)
      render status: :ok, json: {
        notice: "#{@job_sheet.reference_number} has been updated"
      }
    else
      render status: :unprocessable_entity, json: {
        error: @job_sheet.errors.full_messages.to_sentence
      }
    end
  end

  def bulk_delete
    if @job_sheets.destroy_all
      render status: :ok, json: {
        notice: I18n.t("notice.job_sheet", count: @job_sheets.size, action: "deleted")
      }
    else
      render status: :unprocessable_entity, json: { error: "Something went wrong!" }
    end
 end

  private

    def job_sheet_params
      params.require(:job_sheet).permit(
        :name, :email, :phone, :reference_number, :device_emei_or_serial_number,
        :device_problem_reported, :device_accessories_received, :device_condition, :service_report_diagnosis,
        :service_parts_used)
    end

    def load_job_sheet!
      @job_sheet = JobSheet.find(params[:id])
    end

    def load_job_sheets!
      @job_sheets = JobSheet.where(id: params[:ids])
    end
end
