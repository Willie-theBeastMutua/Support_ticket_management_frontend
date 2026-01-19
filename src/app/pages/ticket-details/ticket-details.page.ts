import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from '../../services/tickets';
import { AuthService } from '../../services/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ticket } from '../../models/tickets.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.page.html',
  styleUrls: ['./ticket-details.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule]
})
export class TicketDetailsPage implements OnInit {
  ticket!: Ticket;
  commentForm: FormGroup;
  updateForm: FormGroup;
  isAdmin = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private ticketsService: TicketsService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    this.isAdmin = this.auth.isAdmin();
    this.commentForm = this.fb.group({ content: [''], isInternal: [false] });
    this.updateForm = this.fb.group({ statusId: [''], assignedTo: [''], internalNote: [''] });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTicket(id);
  }

  loadTicket(id: number) {
    this.ticketsService.getTicketById(id).subscribe({
      next: (data: Ticket) => this.ticket = data,
      error: (err: any) => this.error = err.error?.message || 'Ticket not found'
    });
  }

  addComment() {
    const { content, isInternal } = this.commentForm.value;
    if (!content) return;
    this.ticketsService.addComment(this.ticket.id, content, isInternal).subscribe(() => this.loadTicket(this.ticket.id));
  }

  updateTicket() {
    this.ticketsService.updateTicket(this.ticket.id, this.updateForm.value).subscribe(() => this.loadTicket(this.ticket.id));
  }
}
