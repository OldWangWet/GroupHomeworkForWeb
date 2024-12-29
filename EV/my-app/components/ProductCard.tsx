import Link from 'next/link'
import { Product } from '../types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mt-2">{product.category}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/products/${product.id}`} passHref>
          <Button className="w-full">查看详情</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

