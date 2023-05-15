import { useEffect, useRef, useState } from "react";
import "./TicketListPage.css";
import { listTickets } from "../../api/tickets";
import { Ticket } from "../../api/types";
import VirtualList from "../../components/VirtualList";

function App() {
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

  return (
    <div className="container" ref={ref}>
      <VirtualList tickets={tickets} heightPx={heightPx} />
    </div>
  );
}

export default App;
