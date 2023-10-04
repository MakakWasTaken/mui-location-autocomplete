import { DefaultProvider } from './providers'
import { GoogleMapsProvider } from './providers/googlemaps'
import { MapBoxProvider } from './providers/mapbox'
import { Location } from './models/Location'
import { LocationAutocomplete } from './components'

export {
  LocationAutocomplete,
  DefaultProvider,
  MapBoxProvider,
  GoogleMapsProvider,
}

export type { Location } from './models/Location'
export type { PlaceType, Options } from './providers'

export default LocationAutocomplete
