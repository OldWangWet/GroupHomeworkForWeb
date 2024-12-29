export interface Ad {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  redirectUrl: string;
  impressions: number;
  clicks: number;
  conversions: number;
  isActive: boolean;
}

export interface User {
  id: number;
  role: number; // 0 for regular user, 1 for admin
  username: string;
  password: string;
  image: string;
  apiEndpoint: string;
  description: string;
  profitShare: number;
  ads: Ad[];
  receivedTraffic: number;
  generatedTraffic: number;
  receivedRevenue: number;
  generatedRevenue: number;
}

export interface PlatformStats {
  totalUsers: number;
  totalAds: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
}

