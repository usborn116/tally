class SessionShare < ApplicationRecord
    belongs_to :collaborator, class_name: 'User', foreign_key: "collaborator_id"
    belongs_to :shared_session, class_name: 'Session', foreign_key: "shared_session_id"
end
