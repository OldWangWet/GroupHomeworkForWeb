import { News, Category } from '../types'

const fetchnews =async ():Promise<News[]>=>{
  try{
    console.log("asdf")
    const response=await fetch('http://localhost:8802/news/list/1/100',{
      method:'Post',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({}),
    });
    const result=await response.json();
    if(result.code==='00000'&&result.data?.records){
      return result.data.records.map((record:any)=>({
        id:record.id.toString(),
        name:record.name || '',
        price:record.price||0,
        category:record.category || '',
        image:record.image || '',
        description:record.description || '',
      }));
    }else {
      console.error('failed to fetch:',result.message);
      return [];
    }
  }catch (error){
    console.error('Error fetching:',error);
    return [];
  }
};

let news:News[]=[];
(async()=>{
  news=await fetchnews();
})();
export async function getNews(): Promise<News[]> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return news
}

const categories: Category[] = [
  { id: 'all', name: '全部' },
  { id: 'electronics', name: '电子产品' },
  { id: 'clothing', name: '服装' },
  { id: 'entertainment', name: '娱乐' },
  { id: 'food', name: '美食' },
]

export async function getCategories(): Promise<Category[]> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return categories
}

export async function getNewsById(id: string): Promise<News> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const newsItem = news.find(item => item.id === id)
  if (!newsItem) throw new Error('News not found')
  return newsItem
}

export async function updateLikes(id: string, likes: number): Promise<void> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const newsItem = news.find(item => item.id === id)
  if (newsItem) {
    newsItem.price = likes
  }
}

