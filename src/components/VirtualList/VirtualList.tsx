import React, { useContext, useMemo, useState } from "react";
import TicketCard from "../TicketCard";
import { TicketsContext } from "../../pages/TicketListPage/TicketListPage";

interface VirtualListProps {
  heightPx: number;
  ticketHeightPx?: number;
}

/**
 * A component responsible for rendering a virtual list of tickets
 * should allow user to smoothly scroll through a large (10000+) list of tickets with no performance issues
 */
const VirtualList: React.FC<VirtualListProps> = ({
  heightPx,
  ticketHeightPx = 200,
}) => {
  const { tickets } = useContext(TicketsContext);

  // keep track of the current scroll position from top in list container
  const [scrollTop, setScrollTop] = useState(0);

  /**
   * calculate the total available scroll height based on the number of tickets and the ticket height
   * if we don't use a component with full scroll height available
   * the scroll height will reset everytime we re-calculate the rendered tickets list below
   */
  const fullScrollHeight = useMemo(
    () => (tickets ? tickets.length * ticketHeightPx : 0),
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
        tickets ? tickets.length - 1 : 0
      ),
    [ticketsStartIndex, heightPx, ticketHeightPx, tickets]
  );

  // height of the rendered tickets list, this is used to set the visible window height
  const renderedTicketsHeight = useMemo(
    () => (ticketsEndIndex - ticketsStartIndex) * ticketHeightPx,
    [ticketsEndIndex, ticketsStartIndex, ticketHeightPx]
  );

  // top position of the rendered tickets list, this is used to set the visible window top position
  const renderedTicketsTop = useMemo(
    () => ticketsStartIndex * ticketHeightPx,
    [ticketsStartIndex, ticketHeightPx]
  );

  // slice the tickets array to get the tickets to render, only render the ones that should be visible
  const renderedTickets = useMemo(
    () =>
      tickets?.slice(
        Math.max(0, ticketsStartIndex - 1),
        Math.min(ticketsEndIndex + 1, tickets.length)
      ) ?? [],
    [tickets, ticketsStartIndex, ticketsEndIndex]
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
