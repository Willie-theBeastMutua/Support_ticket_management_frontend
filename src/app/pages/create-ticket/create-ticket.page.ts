import { Component } from '@angular/core';
import { TicketsService } from '../../services/tickets';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.page.html',
  styleUrls: ['./create-ticket.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CreateTicketPage {
  ticketForm: FormGroup;
  error = '';

  constructor(private ticketsService: TicketsService, private router: Router, private fb: FormBuilder) {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priorityId: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  submit() {
    if (this.ticketForm.invalid) {
      this.error = 'All fields are required';
      return;
    }

    this.ticketsService.createTicket(this.ticketForm.value).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err: any) => this.error = err.error?.message || 'Failed to create ticket'
    });
  }
}
