class CartController < ApplicationController
  def show
  end

  def cartinfo
    total = 0
    params.permit![:_json].map do |param|
      dish = Dish.find(param['dishId'])
      total += ( dish.price.to_i  * param['amount'].to_i )
      param.merge!( { dishPrice: dish.price,
                     dishName: dish.name
                    })
    end
      respond_to do |format|
        format.json { render json: { items: params[:_json], total: total } }
      end
  end
end
