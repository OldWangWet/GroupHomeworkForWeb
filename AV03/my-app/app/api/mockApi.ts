import { Ad, User, PlatformStats,Statistic } from '@/types';

// 获取用户列表
const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('http://localhost:8803/user/list/1/100', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const result = await response.json();

    if (result.code === '00000' && result.data?.records) {
      return result.data.records.map((record: any) => ({
        id: record.id,
        role: record.role,
        username: record.username,
        password: record.password,
        image: record.image || '/placeholder.svg?height=100&width=100&text=User',
        apiEndpoint: record.apiEndpoint || '',
        originurl: record.originurl ||'',
        description: record.description || '',
        profitShare: record.profitShare || 0,
        ads: [],
        receivedTraffic: record.generatedTraffic || 0,
        generatedTraffic: record.receivedTraffic || 0,
        receivedRevenue: record.generatedRevenue || 0,
        generatedRevenue: record.receivedRevenue || 0,
      }));
    } else {
      console.error('Failed to fetch users:', result.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// 获取广告数据
const fetchAdsForUser = async (userId: number): Promise<Ad[]> => {
  try {
    const response = await fetch(`http://localhost:8803/advertisement/getadvertisements/${userId}`);
    const result = await response.json();

    if (result.code === '00000' && Array.isArray(result.data)) {
      return result.data.map((ad: any) => ({
        id: ad.id,
        name: ad.name,
        category: ad.category,
        description: ad.description || '',
        image: ad.image || '/placeholder.svg?height=200&width=300&text=Ad',
        jumpurl: ad.jumpurl || '',
        impressions: ad.impressions || 0,
        clicks: ad.clicks || 0,
        conversions: ad.conversions || 0,
        isActive: true, // 假设所有广告默认激活
      }));
    } else {
      console.error(`Failed to fetch ads for user ${userId}:`, result.message);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching ads for user ${userId}:`, error);
    return [];
  }
};

// 获取用户和广告数据
export const getUsersWithAds = async (): Promise<User[]> => {
  const users = await fetchUsers();

  const usersWithAds = await Promise.all(
    users.map(async (user) => {
      const ads = await fetchAdsForUser(user.id);
      return { ...user, ads };
    })
  );

  return usersWithAds;
};

let mockUsers: User[] = [];


// 初始化用户和广告数据
(async () => {
  mockUsers = await getUsersWithAds();
})();

export { mockUsers };

const saveUsers = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
  }
};

export const getUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    resolve(mockUsers);
  });
};


export const getUser = (username: string): Promise<User | undefined> => {
  return new Promise((resolve) => {
    const user = mockUsers.find(u => u.username === username);
    resolve(user);
  });
};

// 获取用户信息
const fetchUserById = async (id: number): Promise<User | undefined> => {
  try {
    const response = await fetch(`http://localhost:8803/user/get-one-user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (result.code === '00000' && result.data) {
      // 将后端返回的用户数据进行映射
      const user = {
        id: result.data.id,
        role: result.data.role,
        username: result.data.username,
        password: result.data.password,
        image: result.data.image || '/placeholder.svg?height=100&width=100&text=User',
        apiEndpoint: result.data.apiEndpoint || '',
        originurl:result.data.originurl||'',
        description: result.data.description || '',
        profitShare: result.data.profitshare || 0,
        ads: [], // 暂时不填充广告，等获取广告数据后再更新
        receivedTraffic: result.data.generatedTraffic || 0,
        generatedTraffic: result.data.receivedTraffic || 0,
        receivedRevenue: result.data.generatedRevenue || 0,
        generatedRevenue: result.data.receivedRevenue || 0,
      };
      return user;
    } else {
      console.error('Failed to fetch user:', result.message);
      return undefined;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return undefined;
  }
};

// 获取指定用户及其广告数据
export const getUserWithAdsById = async (id: number): Promise<User | undefined> => {
  const user = await fetchUserById(id);

  if (user) {
    const ads = await fetchAdsForUser(user.id);
    return { ...user, ads };
  } else {
    return undefined;
  }
};


export const updateUser = (updatedUser: User): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockUsers.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        mockUsers[index] = updatedUser;
        saveUsers();
      }
      resolve(updatedUser);
    }, 500);
  });
};

// 更新用户信息
const updateUserInfo = async (updatedUser: User): Promise<User> => {
  try {
    // 更新用户的基本信息
    const response = await fetch('http://localhost:8803/user/upd-one-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    const result = await response.json();

    if (result.code === '00000') {
      // 用户更新成功，返回更新后的用户信息
      console.log('User updated successfully');
      return updatedUser;
    } else {
      console.error('Failed to update user:', result.message);
      throw new Error('Failed to update user');
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Error updating user');
  }
};

// 更新用户的广告信息
const updateUserAds = async (userId: number, ads: Ad[]): Promise<void> => {
  try {
    // 更新用户的广告信息
    const response = await fetch(`http://localhost:8803/advertisement/updateadvertisement/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ads),
    });

    const result = await response.json();

    if (result.code === '00000') {
      console.log('User ads updated successfully');
    } else {
      console.error(`Failed to update ads for user ${userId}:`, result.message);
      throw new Error('Failed to update ads');
    }
  } catch (error) {
    console.error(`Error updating ads for user ${userId}:`, error);
    throw new Error('Error updating ads');
  }
};

// 更新用户和广告信息
export const updateUserAndAds = async (updatedUser: User): Promise<User> => {
  try {
    // 更新用户信息
    await updateUserInfo(updatedUser);

    // 更新广告信息
    if (updatedUser.ads && updatedUser.ads.length > 0) {
      await updateUserAds(updatedUser.id, updatedUser.ads);
    }

    // 返回更新后的用户信息
    return updatedUser;
  } catch (error) {
    throw new Error('Error updating user and ads');
  }
};


export const getAdApiEndpoint = (userId: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === userId);
      resolve(user ? user.apiEndpoint : "notfound");
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
        saveUsers();
      }
      resolve();
    }, 500);
  });
};

export const login = (username: string, password: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.username === username && u.password === password);
      resolve(user || null);
    }, 500);
  });
};
// export const login = (username: string, password: string): Promise<User | null> => {
//   return new Promise(async (resolve) => {
//     try {
//       const mockUsers: User[] = await getUsersWithAds(); // 等待异步任务完成
//       const user = mockUsers.find(u => u.username === username && u.password === password);
//       resolve(user || null); // 返回结果
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       resolve(null); // 异常情况下返回 null
//     }
//   });
// };

export const register =  (username: string, password: string): Promise<User | null> => {
  return new Promise(async(resolve) => {
    const existingUser = mockUsers.find(u => u.username === username);
      if (existingUser) {
        if (existingUser.password === password) {
          resolve(existingUser);
        } else {
          resolve(null);
        }
      } else {
        const newUser: User = {
          id: mockUsers.length + 1,
          role: 0,
          username,
          password,
          image: `/placeholder.svg?height=100&width=100&text=${username.charAt(0).toUpperCase()}`,
          apiEndpoint: `管理员未分配接口`,
          originurl:`输入您的网站`,
          description: "还没有介绍",
          profitShare: 0,
          ads: [],
          receivedTraffic: 0,
          generatedTraffic: 0,
          receivedRevenue: 0,
          generatedRevenue: 0,
        };
        const response = await fetch('http://localhost:8803/user/add-one-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });
        mockUsers.push(newUser);
        saveUsers();
        resolve(newUser);
      }
  });
};

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file); // 在 body 中添加图片文件

    // 发起 POST 请求
    const response = await fetch('http://localhost:8803/advertisement/upload', {
      method: 'POST',
      body: formData,
    });

    // 检查响应是否成功
    if (!response.ok) {
      throw new Error(`Failed to upload image. Status: ${response.status}`);
    }

    // 解析后端返回的 JSON 数据，假设 data 是图片的 URL
    const result = await response.json();
    return result.data; // 返回后端提供的图片 URL
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image.'); // 抛出错误供上层处理
  }
};

export const getadlog = async (Id: number): Promise<Statistic[]> => {
  try {
    const response = await fetch(`http://localhost:8803/statistic/getadlog/${Id}`);
    const result = await response.json();

    if (result.code === '00000' && Array.isArray(result.data)) {
      return result.data.map((statistic: any) => ({
        id: statistic.id,
        createyear:statistic.createyear,
        createmonth:statistic.createmonth,
        createday:statistic.createday,
        operation:statistic.operation,
        category: statistic.category,
      }));
    } else {
      console.error(`Failed to fetch ads for user ${Id}:`, result.message);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching ads for user ${Id}:`, error);
    return [];
  }
};

export const getpublog = async (Id: number): Promise<Statistic[]> => {
  try {
    const response = await fetch(`http://localhost:8803/statistic/getpublog/${Id}`);
    const result = await response.json();

    if (result.code === '00000' && Array.isArray(result.data)) {
      return result.data.map((statistic: any) => ({
        id: statistic.id,
        createyear:statistic.createyear,
        createmonth:statistic.createmonth,
        createday:statistic.createday,
        operation:statistic.operation,
        category: statistic.category,
      }));
    } else {
      console.error(`Failed to fetch ads for user ${Id}:`, result.message);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching ads for user ${Id}:`, error);
    return [];
  }
};


