import { Ad, User, PlatformStats } from '@/types';

const getInitialUsers = (): User[] => {
  if (typeof window !== 'undefined') {
    const storedUsers = localStorage.getItem('mockUsers');
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
  }
  return [
    {
      id: 1,
      role: 1,
      username: "admin1",
      password: "adminpass",
      image: "/placeholder.svg?height=100&width=100&text=AD",
      apiEndpoint: "",
      description: "System Administrator",
      profitShare: 0,
      ads: [],
      receivedTraffic: 0,
      generatedTraffic: 0,
      receivedRevenue: 0,
      generatedRevenue: 0,
    },
    {
      id: 2,
      role: 0,
      username: "user1",
      password: "userpass",
      image: "/placeholder.svg?height=100&width=100&text=U1",
      apiEndpoint: "/api/user/2",
      description: "Tech gadget enthusiast",
      profitShare: 8,
      ads: [
        {
          id: 1,
          name: "New Smartphone Launch",
          category: "Technology",
          image: "/placeholder.svg?height=200&width=300&text=Smartphone",
          description: "Experience the future with our latest smartphone!",
          redirectUrl: "https://example.com/new-smartphone",
          impressions: 25000,
          clicks: 1200,
          conversions: 100,
          isActive: true,
        },
        {
          id: 2,
          name: "Smart Home Devices",
          category: "Technology",
          image: "/placeholder.svg?height=200&width=300&text=SmartHome",
          description: "Transform your home with our smart devices!",
          redirectUrl: "https://example.com/smart-home",
          impressions: 15000,
          clicks: 800,
          conversions: 50,
          isActive: true,
        },
      ],
      receivedTraffic: 15000,
      generatedTraffic: 25000,
      receivedRevenue: 1500,
      generatedRevenue: 2500,
    },
    {
      id: 3,
      role: 0,
      username: "user2",
      password: "userpass",
      image: "/placeholder.svg?height=100&width=100&text=U2",
      apiEndpoint: "/api/user/3",
      description: "Fashion trendsetter",
      profitShare: 10,
      ads: [
        {
          id: 3,
          name: "Summer Collection",
          category: "Fashion",
          image: "/placeholder.svg?height=200&width=300&text=SummerFashion",
          description: "Get ready for summer with our latest collection!",
          redirectUrl: "https://example.com/summer-collection",
          impressions: 30000,
          clicks: 1500,
          conversions: 200,
          isActive: true,
        },
      ],
      receivedTraffic: 25000,
      generatedTraffic: 0,
      receivedRevenue: 1250,
      generatedRevenue: 0,
    },
  ];
};

let mockUsers: User[] = getInitialUsers();

export const getUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUsers), 500);
  });
};

export const getUser = (username: string): Promise<User | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.username === username);
      resolve(user);
    }, 500);
  });
};

export const getUserById = (id: number): Promise<User | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === id);
      resolve(user);
    }, 500);
  });
};

export const updateUser = (updatedUser: User): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockUsers.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        mockUsers[index] = updatedUser;
        if (typeof window !== 'undefined') {
          localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
        }
      }
      resolve(updatedUser);
    }, 500);
  });
};

export const getAdApiEndpoint = (userId: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === userId);
      resolve(user ? user.apiEndpoint : "");
    }, 500);
  });
};

export const getPlatformStats = (): Promise<PlatformStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stats: PlatformStats = {
        totalUsers: mockUsers.filter(u => u.role === 0).length,
        totalAds: mockUsers.reduce((sum, user) => sum + user.ads.length, 0),
        totalImpressions: mockUsers.reduce((sum, user) => 
          sum + user.ads.reduce((adSum, ad) => adSum + ad.impressions, 0), 0),
        totalClicks: mockUsers.reduce((sum, user) => 
          sum + user.ads.reduce((adSum, ad) => adSum + ad.clicks, 0), 0),
        totalConversions: mockUsers.reduce((sum, user) => 
          sum + user.ads.reduce((adSum, ad) => adSum + ad.conversions, 0), 0),
      };
      resolve(stats);
    }, 500);
  });
};

export const deleteAd = (userId: number, adId: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        mockUsers[userIndex].ads = mockUsers[userIndex].ads.filter(ad => ad.id !== adId);
        if (typeof window !== 'undefined') {
          localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
        }
      }
      resolve();
    }, 500);
  });
};

