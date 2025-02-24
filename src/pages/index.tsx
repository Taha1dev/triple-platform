import { Home } from "lucide-react"
import CategoryPageLayout from "@/components/category-page-layout"

export default function HomePage() {
  return (
    <CategoryPageLayout
      categoryName="Home"
      categoryIcon={Home}
      featuredItems={<div>Welcome to Triple Platform</div>}
      listItems={<div>Here you can explore all our categories</div>}
      addNewText="Get Started"
    />
  )
}

