import { Typography } from '@mui/material'
import {
  GoogleMapsProvider,
  Location,
  LocationAutocomplete,
} from 'mui-location-autocomplete'
import { useState } from 'react'

// Using env variables to not include key in repository.
const provider = new GoogleMapsProvider(process.env.NEXT_PUBLIC_KEY ?? '', {
  types: ['address'],
})

const Home = () => {
  const [value, setValue] = useState<Location | null>(null)

  return (
    <>
      <Typography>Not component issue</Typography>
      <LocationAutocomplete
        value={value}
        onValueChange={setValue}
        provider={provider}
        noOptionsValues={[
          {
            fullText: 'Langelinie, 2100 København Ø',
            primaryText: 'Langelinie',
            secondaryText: '2100 København Ø',
          },
        ]}
      />
    </>
  )
}

export default Home
