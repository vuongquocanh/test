import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService, ContactDto } from '@proxy/contacts';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ListService],
})
export class ContactComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'mobile', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  contact : any = { items: [], totalCount: 0 } as PagedResultDto<ContactDto>;

  form: FormGroup;
  
  isModalOpen = false;

  selectedContact = {} as ContactDto;

  constructor(public readonly list: ListService, private contactService: ContactService, private fb: FormBuilder, private confirmation: ConfirmationService) {}

  ngOnInit() {
    const contactStreamCreator = (query) => this.contactService.getList(query);

    this.list.hookToQuery(contactStreamCreator).subscribe((response) => {
      this.contact = response;
    });
  }

  createContact() {
    this.selectedContact = {} as ContactDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editContact(id: string) {
    this.contactService.get(id).subscribe((contact) => {
      this.selectedContact = contact;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  delete(id: string) {
  this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
    if (status === Confirmation.Status.confirm) {
      this.contactService.delete(id).subscribe(() => this.list.get());
    }
  });
}

  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      mobile: ['', Validators.pattern("(84|0[3|5|7|8|9])+([0-9]{8})")],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedContact.id
      ? this.contactService.update(this.selectedContact.id, this.form.value)
      : this.contactService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
