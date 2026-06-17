export interface QuoteRequest {
  id?: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  companySize: 'small' | 'medium' | 'large' | 'enterprise';
  infrastructureNeeds: string[]; // e.g., ['security', 'connectivity', 'cloud', 'backup']
  additionalDetails?: string;
  estimatedMonthly: number;
  createdAt: number; // timestamp
  status: 'Pendente' | 'Analisando' | 'Aprovado' | 'Contato Feito';
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  category: 'Segurança' | 'Conectividade' | 'Cloud' | 'Backup' | 'Hardware';
  color: string; // Tailwind class like "text-red-500 hover:bg-red-50/10"
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'security' | 'connectivity' | 'cloud' | 'backup';
  iconName: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
}
