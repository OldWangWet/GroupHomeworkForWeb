import { Product, Category } from '../types'

const fetchproducts =async ():Promise<Product[]>=>{
  try{
    const response=await fetch('http://localhost:8801/product/list/1/100',{
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

let products:Product[]=[];
(async()=>{
  products=await fetchproducts();
})();

const categories: Category[] = [
  { id: 'electronics', name: '电子产品' },
  { id: 'entertainment', name: '娱乐' },
  { id: 'dailygoods', name: '日用品' },
  { id: 'food', name: '食品' },
]

export const getProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return products
}

export const getProduct = async (id: string): Promise<Product | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return products.find(product => product.id === id)
}

export const getCategories = async (): Promise<Category[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return categories
}

