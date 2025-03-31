import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { FilterUser } from '@/models/api-schema/userType'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { Separator } from '@radix-ui/react-dropdown-menu'


export default function FilterUserCard({ user }: { user: FilterUser }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-start p-4">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={user.portfolio?.[0]?.url || ''} alt={`${user.fname} ${user.lname}`} />
            <AvatarFallback>
              {user.fname.charAt(0)}{user.lname.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-medium">{user.fname} {user.lname}</h3>
            <p className="text-sm text-muted-foreground">
              {user.categories[0]?.name} / {user.subCategories[0]?.name || user.subCategories[0]?.locationType}
            </p>
          </div>
        </div>
        <Separator />
        <div className="p-4 grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium">Ethnicity:</span> {user.profile.ethnicity}
          </div>
          <div>
            <span className="font-medium">Hair:</span> {user.profile.hairColor}, {user.profile.hairTexture}
          </div>
          <div>
            <span className="font-medium">Eyes:</span> {user.profile.eyeColor}
          </div>
          <div>
            <span className="font-medium">Skin:</span> {user.profile.skinTone}
          </div>
          <div className="col-span-2">
            <span className="font-medium">Features:</span> {user.profile.facialFeatures.join(", ")}
          </div>
          <div className="col-span-2">
            <span className="font-medium">City:</span> {user.city.join(", ")}
          </div>
          <div className="col-span-2 flex gap-2 mt-2">
            {user.profile.tattoo?.length > 0 && <Badge variant="outline">Tattoo</Badge>}
            {user.profile.piercing?.length > 0 && <Badge variant="outline">Piercing</Badge>}
            {user.profile.scars?.length > 0 && <Badge variant="outline">Scars</Badge>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
