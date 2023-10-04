import { DefaultProvider, Options } from '.'
import { Location } from '../models/Location'

interface MatchedSubstring {
  length: number
  offset: number
}

interface GoogleMapsPrediction {
  description: string
  matched_substrings: MatchedSubstring[]
  structured_formatting: {
    main_text: string
    main_text_matched_substrings: MatchedSubstring[]
    secondary_text: string
    secondary_text_matched_substrings: MatchedSubstring[]
  }
  terms: { offset: number; value: string }[]
}

interface GoogleMapsResponse {
  predictions: GoogleMapsPrediction[]
  status: string
  error_message?: string
  info_messages?: string[]
}

export class GoogleMapsProvider extends DefaultProvider {
  private publicKey: string
  private url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'

  constructor(publicKey: string, options?: Options) {
    super(options)
    this.publicKey = publicKey
  }

  private mapOptionTypes(): string[] {
    if (!this.options?.types) {
      return []
    }
    return this.options.types.map((type) => {
      switch (type) {
        case 'region':
          return 'regions'
        case 'postcode':
          return 'postal_code'
        case 'place':
          return 'establishment'
        case 'poi':
          return 'point_of_interest'
        default:
          return type
      }
    })
  }

  /**
   * Get the locations from Google Maps API
   */
  public async getLocations(input: string): Promise<Location[]> {
    const url = new URL(this.url)

    url.searchParams.set('input', input)
    url.searchParams.set('key', this.publicKey)
    if (this.options?.country) {
      url.searchParams.set('components', `country:${this.options.country}`)
    }
    const types = this.mapOptionTypes()
    if (types.length > 0) {
      url.searchParams.set('types', types.join(','))
    }
    if (this.options?.language) {
      url.searchParams.set('language', this.options?.language)
    }
    if (this.options?.limit) {
      url.searchParams.set('limit', this.options.limit.toString())
    }

    const response = await fetch(url)

    const data: GoogleMapsResponse = await response.json()

    if (data.error_message) {
      console.error(data.error_message)
      return []
    }

    return data.predictions.map<Location>((prediction) => {
      const structFormat = prediction.structured_formatting
      return {
        fullText: `${structFormat.main_text} ${structFormat.secondary_text}`,
        primaryText: structFormat.main_text,
        secondaryText: structFormat.secondary_text,
      }
    })
  }
}
