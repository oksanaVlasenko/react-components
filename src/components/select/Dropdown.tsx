import { useState } from 'react'

import { useDropdownContext } from '@/context/dropdownContext';
import { useOutsideClick } from '@/customHooks/useOutsideHook';
import { Option } from '@/components/select/Dropdown.types';

import SelectedOption from '@/components/select/SelectedOption'
import OptionList from '@/components/select/OptionList';

import '@/components/select/Dropdown.scss'

const Dropdown: React.FC = () => { 
  const {
    selectedValue,
    options = [],
    disabled,
    size = 'medium',
    onSelectChange,
    onOpenList,
    onCloseList,
    onClearValue
  } = useDropdownContext()

  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const setSelected = (value: string | number | null) => {
    let select: string | number | null = null
    
    if (value) {
      return select = value
    }

    if (!selectedValue) return select

    if (!options || options.length === 0) return select

    const option = options.find(o => o.id === selectedValue)

    if (option) {
      select = option.label
    }

    return select
  } 

  const selected = setSelected(null)

  const selectItem = (item: Option ) => {
    setSelected(item.label ?? null)
    onSelectChange(item.id ?? null)
    setIsOpen(false)
    setSearchQuery('')
  }

  const clearSelected = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()

    setSelected(null)
    onSelectChange(null)
    setIsOpen(false)
    setSearchQuery('')
    onClearValue?.()
  } 

  const toggleList = () => {
    setIsOpen(!isOpen)

    if (!isOpen) {
      onOpenList?.()
    } else {
      onCloseList?.()
    }
  }

  const filteredOptions = options?.filter(item =>
    item.label.toString().toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? []

  const ref = useOutsideClick(() => {
    setIsOpen(false);  
        
    onCloseList?.()
  });

  return (
    <div 
      ref={ref}
      className={`dropdown-container ${disabled ? 'disabled' : ''} ${size}`}
    >
      <SelectedOption 
        selected={selected}
        isOpen={isOpen}
        onSearchQuery={(newSearchValue: string | null) => setSearchQuery(newSearchValue ?? '')}
        onToggle={toggleList}
        onClear={(e) => clearSelected(e)}
      />
      
      {
        isOpen && 
        <OptionList 
          filteredOptions={filteredOptions}
          searchQuery={searchQuery}
          onSelect={selectItem}
        />
      }
    </div>
  )
}

export default Dropdown