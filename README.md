
# mui-location-autocomplete

A helper component

## Dependencies

* [react](https://www.npmjs.com/package/react)
* [react-dom](https://www.npmjs.com/package/react-dom)
* [@mui/material](https://www.npmjs.com/package/@mui/material)

## Installation

```bash
npm install --save mui-location-autocomplete
# or
yarn add mui-location-autocomplete
# or
pnpm add mui-location-autocomplete
# or
bun add mui-location-autocompletemui-location-autocomplete
```

## Usage

To start using the `LocationAutocomplete` component, you will need a provider.

### Providers

Currently two providers are supported:

* [Google Maps](https://maps.google.com)
* [MapBox](https://mapbox.com)

Both these providers build on the `DefaultProvider`. This provider also provides the default skeleton for building additional providers.

#### Google Maps

In order to use the Google Maps provider you need an **api key**. You can get the API key by following [this guide](https://developers.google.com/maps/documentation/places/web-service/get-api-key#creating-api-keys).

```typescript
const provider = new GoogleMapsProvider('GOOGLE_MAPS_API_KEY')
```

#### MapBox

In order to use MapBox, you need a **public token**. You can get this API key from the Access tokens section on the [accounts page](https://account.mapbox.com/).

```typescript
const provider = new MapBoxProvider('MAP_BOX_PUBLIC_TOKEN')
```


```typescript
const [value, setValue] = useState<Location | null>(null)

<LocationAutocomplete
  value={value}
  onValueChange={setValue}
  provider={provider}
  />
```

### Example

Consult the example in the `example` folder.

## Customizability

Some options are available when creating the provider. These options are as follows:

```typescript
const options: Options = {
  country?: string // A country code following the ISO-3166-1 standard.
  types?: PlaceType[] // A list containing specifications of what types if preffered from the provider.
  limit: 5 // Used to control the number of suggestions, the default is 5. This might impact billing.
  language?: string // The language to return results in.
}
```

Country codes can be found on the following [wiki](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
