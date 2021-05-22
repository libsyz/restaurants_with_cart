class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.string :status
      t.string :amount
      t.references :user, null: false, foreign_key: true
      t.json :details

      t.timestamps
    end
  end
end
