import { Location } from '../models/Location'

export type PlaceType =
  | 'address'
  | 'country'
  | 'region'
  | 'postcode'
  | 'district'
  | 'place'
  | 'locality'
  | 'neighborhood'
  | 'poi'

export interface Options {
  country?: string
  types?: PlaceType[]
  limit?: number
  language?: string
}

export abstract class DefaultProvider {
  options?: Options

  constructor(options?: Options) {
    this.options = options
  }

  public abstract getLocations(input: string): Promise<Location[]>
}
