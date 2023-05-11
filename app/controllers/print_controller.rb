# frozen_string_literal: true

class PrintController < ApplicationController
  layout false

  def show
    @job_sheet = JobSheet.find params[:id]
  end
end
