import { DefaultProvider, Options } from '.'
import { Location } from '../models/Location'

interface MapBoxFeature {
  center: [number, number]
  geometry: { type: string; coordinates: [number, number] }
  id: string
  place_name: string
  properties: { accuracy: string; maxbox_id: string }
  relevance: 1
  text: string
  address?: string
}

interface MapBoxResponse {
  attribution: string
  features: MapBoxFeature[]
  query: string[]
  type: string
}

export class MapBoxProvider extends DefaultProvider {
  private publicKey: string
  private url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

  constructor(publicKey: string, options?: Options) {
    super(options)
    this.publicKey = publicKey
  }

  /**
   * Get the locations from MapBox
   */
  public async getLocations(input: string): Promise<Location[]> {
    const url = new URL(`${this.url}${input}.json`)

    url.searchParams.set('access_token', this.publicKey)
    if (this.options?.country) {
      url.searchParams.set('country', this.options.country)
    }
    if (this.options?.types) {
      url.searchParams.set('types', this.options.types.join(','))
    }
    if (this.options?.language) {
      url.searchParams.set('language', this.options?.language)
    }
    if (this.options?.limit) {
      url.searchParams.set('limit', this.options.limit.toString())
    }
    url.searchParams.set('promixity', 'ip'.toString())

    try {
      // Fetch the results
      const response = await fetch(url)

      const data: MapBoxResponse = await response.json()

      return data.features?.map<Location>((feature) => {
        const split = feature.place_name.split(', ')
        return {
          fullText: feature.place_name,
          primaryText: split[0],
          secondaryText: split.splice(1).join(', '),
        }
      })
    } catch (err: any) {
      console.error(err.message || err)
    }
    return []
  }
}
