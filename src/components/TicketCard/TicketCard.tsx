import React, { useCallback, useContext, useState } from "react";
import { Ticket } from "../../api/types";
import { TicketsContext } from "../../pages/TicketListPage/TicketListPage";

interface TicketProps {
  ticket: Ticket;
  heightPx: number;
}

const TicketCard: React.FC<TicketProps> = ({ ticket, heightPx }) => {
  const ticketsContext = useContext(TicketsContext);

  const [isEditing, setIsEditing] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<Ticket>(ticket);

  const onChangeTicket = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTicket((ticket) => ({
        ...ticket,
        [e.target.name]: e.target.value,
      }));
    },
    [setCurrentTicket]
  );

  const handleDelete = useCallback(
    () => ticketsContext.deleteTicket?.(ticket),
    [ticketsContext, ticket]
  );

  const handleSave = useCallback(() => {
    ticketsContext.updateTicket?.(ticket);
    setIsEditing(false);
  }, [ticketsContext, ticket]);

  return (
    <div
      className="ticket"
      key={currentTicket.id}
      style={{ height: `${heightPx}px` }}
    >
      {isEditing ? (
        <input
          name="subject"
          onChange={onChangeTicket}
          value={currentTicket.subject}
        />
      ) : (
        <p className="ticket-subject">{currentTicket.subject}</p>
      )}

      <div className="ticket-priority-status">
        {isEditing ? (
          <div className="ticket-priority">
            <span>priority: </span>
            <input
              name="priority"
              onChange={onChangeTicket}
              value={currentTicket.priority}
            />
          </div>
        ) : (
          <p className="ticket-priority">priority: {currentTicket.priority}</p>
        )}
        {isEditing ? (
          <div className="ticket-status">
            <span>status: </span>
            <input
              name="status"
              onChange={onChangeTicket}
              value={currentTicket.status}
            />
          </div>
        ) : (
          <p className="ticket-status">status: {currentTicket.status}</p>
        )}
      </div>
      {isEditing ? (
        <input
          name="description"
          onChange={onChangeTicket}
          value={currentTicket.description}
        />
      ) : (
        <p className="ticket-description">{currentTicket.description}</p>
      )}
      <div className="button-controls">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => setIsEditing((editing) => !editing)}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
        {isEditing && <button onClick={handleSave}>Save</button>}
      </div>
    </div>
  );
};

export default TicketCard;
