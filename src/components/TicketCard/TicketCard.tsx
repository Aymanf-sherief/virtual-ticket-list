import { Ticket } from "../../api/types";

interface TicketProps {
  ticket: Ticket;
  heightPx: number;
}

const TicketCard: React.FC<TicketProps> = ({ ticket, heightPx }) => (
  <div className="ticket" key={ticket.id} style={{ height: `${heightPx}px` }}>
    <p className="ticket-subject">{ticket.subject}</p>
    <div className="ticket-priority-status">
      <p className="ticket-priority">priority: {ticket.priority}</p>
      <p className="ticket-status">status: {ticket.status}</p>
    </div>
    <p className="ticket-description">{ticket.description}</p>
  </div>
);

export default TicketCard;
