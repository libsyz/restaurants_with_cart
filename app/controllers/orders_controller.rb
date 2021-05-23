class OrdersController < ApplicationController
  def create
    order = Order.new(details: order_details )
    order.user = current_user
    order.status = 'confirmed'
    order.save
    respond_to do |format|
      format.json { render json: { data: 'confirmed' } }
    end
  end

  private

  def order_details
    params.permit![:_json]
  end
end
