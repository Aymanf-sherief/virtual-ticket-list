import { Ticket } from "./types";

/**
 * a mock api call that returns anywhere between 100k and 200k tickets
 * @returns {Promise<Ticket[]>} A promise that resolves to an array of tickets
 */
export const listTickets = async (): Promise<Ticket[]> => {
  const min = 100_000;
  const max = 200_000;
  const length = Math.floor(Math.random() * (max - min)) + min;
  return Array.from({ length: length }, (_v, i) => {
    const randomId = `${i}-${Math.floor(
      Math.random() * length * 1000
    )}-${Date.now()}`;

    return {
      id: randomId,
      subject: `Ticket #${randomId}`,
      priority: "high",
      status: "open",
      description: `This is a ticket #${randomId}`,
    };
  });
};
