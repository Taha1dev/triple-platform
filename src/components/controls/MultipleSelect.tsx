/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from '@/components/theme-provider'
import { Badge } from '@/components/ui/badge'
import { setSelectedCities } from '@/store/slices/citiesCountriesSlice'
import { AppDispatch } from '@/store/store'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Select, { MultiValue } from 'react-select'

const getCustomStyles = (isDarkMode: boolean) => ({
  control: (provided: any) => ({
    ...provided,
    backgroundColor: isDarkMode ? 'hsl(240, 10%, 4%)' : 'hsl(0, 0%, 100%)',
    border: `1px solid ${
      isDarkMode ? 'hsl(240, 5%, 24%)' : 'hsl(240, 5%, 84%)'
    }`,
    borderRadius: '6px',

    boxShadow: 'none',
    minHeight: '36px',
    padding: '2px 4px', // Reduced padding
    '&:hover': {
      borderColor: isDarkMode ? 'hsl(240, 5%, 34%)' : 'hsl(240, 5%, 64%)', // Slightly lighter on hover
    },
  }),
  option: (provided: any, state: { isSelected: any; isFocused: any }) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? isDarkMode
        ? 'hsl(240, 5%, 24%)'
        : 'hsl(240, 5%, 96%)'
      : state.isFocused
      ? isDarkMode
        ? 'hsl(240, 5%, 20%)'
        : 'hsl(240, 5%, 96%)'
      : 'transparent', // Default background
    color: isDarkMode ? 'hsl(0, 0%, 100%)' : 'hsl(240, 10%, 4%)',
    padding: '6px 12px',
    fontSize: '14px',
    '&:active': {
      backgroundColor: isDarkMode ? 'hsl(240, 5%, 24%)' : 'hsl(240, 5%, 96%)',
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: isDarkMode ? 'hsl(240, 5%, 24%)' : 'hsl(240, 5%, 96%)',
    borderRadius: '4px',
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: isDarkMode ? 'hsl(0, 0%, 100%)' : 'hsl(240, 10%, 4%)',
    padding: '2px 6px',
    fontSize: '14px',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: isDarkMode ? 'hsl(240, 5%, 64%)' : 'hsl(240, 5%, 64%)',
    ':hover': {
      backgroundColor: isDarkMode ? 'hsl(240, 5%, 34%)' : 'hsl(240, 5%, 84%)',
      color: isDarkMode ? 'hsl(0, 0%, 100%)' : 'hsl(240, 10%, 4%)', // Hover icon color
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: '6px',
    border: `1px solid ${
      isDarkMode ? 'hsl(240, 5%, 24%)' : 'hsl(240, 5%, 84%)'
    }`,
    backgroundColor: isDarkMode ? 'hsl(240, 10%, 4%)' : 'hsl(0, 0%, 100%)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  }),
  menuList: (provided: any) => ({
    ...provided,
    maxHeight: '200px',
    overflowY: 'auto',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: isDarkMode ? 'hsl(240, 5%, 64%)' : 'hsl(240, 10%, 4%)',
    fontSize: '14px',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: isDarkMode ? 'hsl(0, 0%, 100%)' : 'hsl(240, 10%, 4%)',
    fontSize: '14px',
  }),
})

interface MultipleSelectProps {
  options: string[]
}

const MultipleSelect = ({ options }: MultipleSelectProps) => {
  const { theme } = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const isDarkMode = theme === 'dark'

  const [localSelectedCities, setLocalSelectedCities] = useState<
    { value: string; label: string }[]
  >([])

  const selectOptions = options.map(option => ({
    value: option,
    label: option,
  }))
  const handleChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>,
  ) => {
    const selectedValues = selectedOptions.map(option => option.value)
    setLocalSelectedCities(
      selectedOptions as { value: string; label: string }[],
    )

    dispatch(setSelectedCities(selectedValues))
  }

  return (
    <>
      <Select
        isMulti
        isSearchable={true}
        options={selectOptions}
        styles={getCustomStyles(isDarkMode)}
        className='w-full h-full absolute z-10'
        placeholder='Select options...'
        onChange={handleChange}
        value={localSelectedCities}
      />
      <div className='mt-4 flex flex-wrap gap-2'>
        {localSelectedCities.map(({ value, label }) => (
          <Badge key={value} variant='default'>
            {label}
          </Badge>
        ))}
      </div>
    </>
  )
}

export default MultipleSelect
