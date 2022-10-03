import type { AuditedEntityDto } from '@abp/ng.core';

export interface ContactDto extends AuditedEntityDto<string> {
  name?: string;
  email?: string;
  photo?: string;
  mobile?: string;
  company?: string;
  title?: string;
}

export interface CreateUpdateContactDto {
  name: string;
  email?: string;
  photo?: string;
  mobile: string;
  company?: string;
  title?: string;
}
