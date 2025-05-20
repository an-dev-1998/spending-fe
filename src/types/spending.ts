export interface Spending {
  id: string;
  date: string;
  category: {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  category_id: number;
  amount: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export interface CreateSpendingDto {
  date: string;
  category_id: number;
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