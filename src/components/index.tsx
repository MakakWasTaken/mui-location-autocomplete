import { useEffect, useState, FC, useRef } from 'react'
import Box from '@mui/material/Box'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import { Location } from '../models/Location'
import { useDebouncedCallback } from 'use-debounce'
import { DefaultProvider, Options } from '../providers'
import React from 'react'

export interface LocationAutocompleteProps {
  defaultInputValue?: string
  value: Location | null
  onValueChange: (location: Location | null) => void
  provider: DefaultProvider
  debounceMs?: number

  noOptionsText?: string
  textFieldProps?: TextFieldProps
  options?: Options
}

export const LocationAutocomplete: FC<LocationAutocompleteProps> = ({
  defaultInputValue = '',
  value,
  onValueChange,

  provider,
  debounceMs = 200,

  noOptionsText,
  textFieldProps,
}) => {
  const [inputValue, setInputValue] = useState(defaultInputValue)
  const [options, setOptions] = useState<readonly Location[]>([])

  const fetchCounter = useRef(0)

  const fetch = useDebouncedCallback(
    async (input: string, callback: (results: readonly Location[]) => void) => {
      if (!provider) {
        throw new Error('Provider not configured')
      }

      // Call the provider
      const locations = await provider.getLocations(input)

      callback(locations)
    },
    debounceMs,
  )

  useEffect(() => {
    let active = true

    if (!provider) {
      return undefined
    }
    if (!inputValue) {
      setOptions(value ? [value] : [])
      return undefined
    }

    // Fetch counter is used to control the number of loading elements.
    fetchCounter.current += 1
    fetch(inputValue, (locations: readonly Location[]) => {
      fetchCounter.current -= 1
      if (active) {
        setOptions(locations)
      }
    })

    return () => {
      active = false
    }
  }, [provider, inputValue])

  if (!provider) {
    return null
  }

  return (
    <Autocomplete
      id="location-autocomplete"
      key="location-autocomplete"
      sx={{ width: 300 }}
      getOptionLabel={(option: any) =>
        typeof option === 'string' ? option : option.primaryText
      }
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      loading={fetchCounter.current > 0}
      noOptionsText={noOptionsText ?? 'No locations'}
      onChange={(_: any, newValue: Location | null) => {
        setOptions(newValue ? [newValue, ...options] : options)
        onValueChange(newValue)
      }}
      onInputChange={(_: any, newInputValue: string) => {
        setInputValue(newInputValue)
      }}
      isOptionEqualToValue={(option: Location, value: Location) => {
        return (
          option.primaryText === value.primaryText &&
          option.secondaryText === value.secondaryText
        )
      }}
      renderInput={(params) => (
        <TextField
          {...textFieldProps}
          {...params}
          label={textFieldProps?.placeholder ?? 'Add a location'}
          fullWidth
        />
      )}
      renderOption={(props, location: Location) => {
        const key = location.fullText.replaceAll(',', '').replaceAll(' ', '-')
        return (
          <Box
            component="li"
            {...props}
            key={key}
            sx={{
              textAlign: 'left',
            }}
          >
            <Box>
              <Typography sx={{ textAlign: 'left' }}>
                {location.primaryText}
              </Typography>
              {location.secondaryText && (
                <Typography variant="body2" color="text.secondary">
                  {location.secondaryText}
                </Typography>
              )}
            </Box>
          </Box>
        )
      }}
    />
  )
}
