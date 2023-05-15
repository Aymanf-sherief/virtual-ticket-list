import React, { useState, useCallback, useContext } from "react";
import { TicketsContext } from "../../pages/TicketListPage/TicketListPage";
import { Ticket } from "../../api/types";

const AddTicketForm: React.FC = () => {
  const { tickets, addTicket } = useContext(TicketsContext);

  const [currentTicket, setCurrentTicket] = useState<Ticket>({
    id: `${tickets?.length}-${Math.floor(
      Math.random() * 1_000_000
    )}-${Date.now()}`,
    subject: "",
    priority: "",
    status: "",
    description: "",
  });

  const onChangeTicket = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTicket((ticket) => ({
        ...ticket,
        [e.target.name]: e.target.value,
      }));
    },
    [setCurrentTicket]
  );

  const handleCancel = useCallback(
    () =>
      setCurrentTicket({
        id: `${tickets?.length}-${Math.floor(
          Math.random() * 1_000_000
        )}-${Date.now()}`,
        subject: "",
        priority: "",
        status: "",
        description: "",
      }),
    [setCurrentTicket, tickets?.length]
  );

  const handleAdd = useCallback(() => {
    if (
      !currentTicket.subject ||
      !currentTicket.priority ||
      !currentTicket.status ||
      !currentTicket.description
    ) {
      alert("Please fill out all fields");
      return;
    }
    addTicket?.(currentTicket);
    handleCancel();
  }, [currentTicket, addTicket, handleCancel]);

  return (
    <div className="ticket-form">
      <div>
        <label>Subject: </label>
        <input
          name="subject"
          onChange={onChangeTicket}
          value={currentTicket.subject}
          style={{ width: "80%" }}
        />
      </div>

      <div className="form-priority-status">
        <div>
          <label>priority: </label>
          <input
            name="priority"
            onChange={onChangeTicket}
            value={currentTicket.priority}
          />
        </div>
        <div>
          <label>status: </label>
          <input
            name="status"
            onChange={onChangeTicket}
            value={currentTicket.status}
          />
        </div>
      </div>
      <div>
        <label>Description: </label>
        <input
          name="description"
          onChange={onChangeTicket}
          value={currentTicket.description}
          style={{ width: "80%" }}
        />
      </div>

      <div className="button-controls">
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleAdd}>Save</button>
      </div>
    </div>
  );
};

export default AddTicketForm;
