import { useCallback, useEffect, useRef, useState } from "react";
import "./TicketListPage.css";
import { listTickets } from "../../api/tickets";
import { Ticket } from "../../api/types";
import VirtualList from "../../components/VirtualList";
import React from "react";

interface TicketsContextData {
  tickets?: Ticket[];
  updateTicket?: (ticket: Ticket) => void;
  deleteTicket?: (ticket: Ticket) => void;
  addTicket?: (ticket: Ticket) => void;
}

export const TicketsContext = React.createContext<TicketsContextData>({});

const TicketListPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [heightPx, setHeightPx] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeightPx(ref.current?.clientHeight ?? 0);
  }, [setHeightPx, ref]);

  useEffect(() => {
    listTickets()
      .then((tickets) => setTickets(tickets))
      .catch((err) => console.error(err));
  }, []);

  const updateTicket = useCallback(
    (ticket: Ticket) =>
      setTickets((tickets) =>
        tickets.map((t) => (t.id === ticket.id ? ticket : t))
      ),
    [setTickets]
  );

  const deleteTicket = useCallback(
    (ticket: Ticket) =>
      setTickets((tickets) => tickets.filter((t) => t.id !== ticket.id)),
    [setTickets]
  );

  const addTicket = useCallback(
    (ticket: Ticket) => setTickets((tickets) => [ticket, ...tickets]),
    [setTickets]
  );

  return (
    <div className="container" ref={ref}>
      <TicketsContext.Provider
        value={{
          tickets,
          updateTicket,
          deleteTicket,
          addTicket,
        }}
      >
        <VirtualList tickets={tickets} heightPx={heightPx} />
      </TicketsContext.Provider>
    </div>
  );
};

export default TicketListPage;
