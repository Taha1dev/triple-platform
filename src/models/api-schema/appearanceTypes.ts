export interface AppearanceDetails {
  _id: string
  ethnicity: string[]
  hairColor: string[]
  hairTexture: string[]
  eyeColor: string[]
  skinTone: string[]
  facialFeatures: string[]
  tattoo: string[]
  piercing: string[]
  scars: string[]
  __v: number
}

export interface AppearanceState {
  appearance: AppearanceDetails[] | null
  loading: boolean
  error: string | null
}
