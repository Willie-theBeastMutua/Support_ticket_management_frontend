import { TicketComment } from "./comments.model";

export interface Ticket {
    id: number;
    ticketNumber: string;
    title: string;
    description: string;
    userId: number;
    statusId: number;
    priorityId: number;
    categoryId: number;
    created_at: string;
    updated_at: string;
    User: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    };
    TicketStatus: { id: number; name: string };
    TicketPriority: { id: number; name: string };
    TicketCategory: { id: number; name: string };
    TicketComments: TicketComment[];
}