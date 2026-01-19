import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets';
import { AuthService } from '../../services/auth';
import { Ticket } from '../../models/tickets.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class DashboardPage implements OnInit {
  tickets: Ticket[] = [];
  filterForm: FormGroup;
  isAdmin: boolean = false;

  constructor(
    private ticketsService: TicketsService,
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.isAdmin = this.auth.isAdmin();

    // Typed FormGroup
    this.filterForm = this.fb.group({
      statusId: new FormControl<string>(''), // never null
    });
  }

  ngOnInit() {
    this.loadTickets();
  }

  /** Getter for the statusId FormControl, avoids TS null issues in template */
  get statusControl(): FormControl<string> {
    return this.filterForm.get('statusId') as FormControl<string>;
  }

  loadTickets() {
    const statusId: string = this.statusControl.value || '';
    const statusNumber = statusId ? Number(statusId) : undefined;

    this.ticketsService.listTickets(statusNumber).subscribe({
      next: (data: Ticket[]) => (this.tickets = data),
      error: (err: any) => console.error(err),
    });
  }

  viewTicket(ticketId: number) {
    this.router.navigate(['/ticket', ticketId]);
  }

  filterChanged() {
    this.loadTickets();
  }
}
