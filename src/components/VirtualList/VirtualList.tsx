import React, { useMemo, useState } from "react";
import { Ticket } from "../../api/types";
import TicketCard from "../TicketCard";

interface VirtualListProps {
  tickets: Ticket[];
  heightPx: number;
  ticketHeightPx?: number;
}

const VirtualList: React.FC<VirtualListProps> = ({
  tickets,
  heightPx,
  ticketHeightPx = 200,
}) => {
  // get the current scroll position from top in list container
  const [scrollTop, setScrollTop] = useState(0);

  // calculate the total available scroll height based on the number of tickets and the ticket height
  // if we don't use a component with full scroll height available
  // the scroll height will reset everytime we re-calculate the rendered tickets list below
  const fullScrollHeight = useMemo(
    () => tickets.length * ticketHeightPx,
    [tickets, ticketHeightPx]
  );

  // calculate the index of the first ticket to render based on how far from the top we've scrolled
  const ticketsStartIndex = useMemo(
    () => Math.floor(scrollTop / ticketHeightPx),
    [scrollTop, ticketHeightPx]
  );

  // calculate the index of the last ticket to render based on the start index, container height, and ticket height
  const ticketsEndIndex = useMemo(
    () =>
      Math.min(
        Math.ceil(heightPx / ticketHeightPx) + ticketsStartIndex,
        tickets.length - 1
      ),
    [ticketsStartIndex, heightPx, ticketHeightPx, tickets]
  );

  // slice the tickets array to get the tickets to render, only render the ones that should be visible
  const renderedTickets = useMemo(
    () => tickets.slice(ticketsStartIndex, ticketsEndIndex),
    [tickets, ticketsStartIndex, ticketsEndIndex]
  );

  // height of the rendered tickets list, this is used to set the visible window height
  const renderedTicketsHeight = useMemo(
    () => renderedTickets.length * ticketHeightPx,
    [renderedTickets, ticketHeightPx]
  );

  // top position of the rendered tickets list, this is used to set the visible window top position
  const renderedTicketsTop = useMemo(
    () => ticketsStartIndex * ticketHeightPx,
    [ticketsStartIndex, ticketHeightPx]
  );

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return (
    <div
      // List container
      onScroll={handleScroll}
      className="virtual-list-container"
      style={{ height: `${heightPx}px`, overflowY: "scroll" }}
      about=""
    >
      <div
        // Virtual list container with full scroll height
        style={{ height: fullScrollHeight }}
      >
        <div
          // Rendered tickets list container with only rendered tickets heights (window)
          className="virtual-list"
          style={{
            height: renderedTicketsHeight,
            top: `${renderedTicketsTop}px`,
          }}
        >
          {renderedTickets.map((ticket) => (
            <TicketCard
              ticket={ticket}
              key={ticket.id}
              heightPx={ticketHeightPx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
