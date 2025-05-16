export interface Spending {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSpendingDto {
  date: string;
  category: string;
  amount: number;
  description: string;
}

export interface UpdateSpendingDto extends Partial<CreateSpendingDto> {}

export interface SpendingFilters {
  startDate?: string;
  endDate?: string;
  category?: string;
  minAmount?: number;
  maxAmount?: number;
} 