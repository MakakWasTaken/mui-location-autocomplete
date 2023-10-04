import { Typography } from '@mui/material'
import {
  LocationAutocomplete,
  Location,
  GoogleMapsProvider,
} from 'mui-location-autocomplete'
import { useState } from 'react'

const provider = new GoogleMapsProvider(process.env.NEXT_PUBLIC_KEY ?? '', {
  types: ['address'],
})

const Home = () => {
  const [value, setValue] = useState<Location | null>(null)

  return (
    <>
      <Typography>Not component issue</Typography>
      // Using env variables to not include key in repository.
      <LocationAutocomplete
        value={value}
        onValueChange={setValue}
        provider={provider}
      />
    </>
  )
}

export default Home
