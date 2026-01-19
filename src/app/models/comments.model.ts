export interface TicketComment {
    id: number;
    ticketId: number;
    userId: number;
    content: string;
    isInternal: boolean;
    created_at: string;
}
