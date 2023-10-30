module Filterable
    extend ActiveSupport::Concern

    module ClassMethods
        def filter(filtering_params)
            results = where(nil)
            filtering_params.each do |k, v|
                results = results.public_send("filter_by_#{k}", v) unless(v == '0' || v.empty?) 
            end
            results
        end
    end
end