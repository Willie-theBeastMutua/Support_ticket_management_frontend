import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/tickets.model';
import { TicketComment } from '../models/comments.model';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private apiUrl = 'http://localhost:3000/api/v1/tickets';

  constructor(private http: HttpClient) { }

  createTicket(data: any): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, data);
  }

  listTickets(statusId?: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl, { params: statusId ? { statusId } : {} });
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }

  updateTicket(id: number, data: any): Observable<Ticket> {
    return this.http.patch<Ticket>(`${this.apiUrl}/${id}`, data);
  }

  addComment(ticketId: number, content: string, isInternal: boolean = false): Observable<TicketComment> {
    return this.http.post<TicketComment>(`${this.apiUrl}/${ticketId}/comments`, { content, isInternal });
  }
}
