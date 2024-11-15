import { useState, useRef, useEffect } from 'react'

import { Tooltip } from 'react-tooltip'

import { 
  ChevronDownIcon, 
  XMarkIcon, 
  CheckIcon, 
  MagnifyingGlassIcon, 
  FaceFrownIcon
} from '@heroicons/react/20/solid';

import './Dropdown.scss'

type Option = {
  id: string | number;
  label: string | number;
  disabled?: boolean | null; 
  icon?: string | null;
};

interface DropdownProps {
  selectedValue: string | null | number;
  label?: string | null | undefined | number; 
  options?: Option[];
  disabled?: boolean | null;
  errorText?: string | null;
  size?: 'small' | 'medium' | 'large';
  searchPlaceholder?: string | null;
  notFoundText?: string | null;
  onSelectChange: (newSelectedValue: string | number | null) => void;
  onOpenList?: () => void;
  onCloseList?: () => void;
  onClearValue?: () => void;
}

function highlightMatch(value: string, search: string | null) {
  if (!search) return value;

  const searchIndex = String(value).toUpperCase().indexOf(String(search).toUpperCase());

  if (searchIndex >= 0) {
    const start = value.substring(0, searchIndex);
    const match = value.substring(searchIndex, searchIndex + search.length);
    const end = value.substring(searchIndex + search.length);

    return `${start}<b>${match}</b>${end}`;
  }

  return value;
}

const Dropdown: React.FC<DropdownProps> = ({ 
  selectedValue, 
  label = 'Label',
  options, 
  disabled,
  errorText, 
  size = 'medium',
  notFoundText = 'Nothing was found',
  searchPlaceholder = 'Search...',
  onSelectChange, 
  onOpenList, 
  onCloseList,
  onClearValue
}) => {
  const textRef = useRef<HTMLParagraphElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isTruncated, setIsTruncated] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string | number | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')

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
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
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
  
  useEffect(() => {
    if (textRef.current && containerRef.current) {
      const textWidth = textRef.current.scrollWidth;
      const containerWidth = containerRef.current.clientWidth;
      setIsTruncated(textWidth > containerWidth);
    }
  }, [selected]);

  useEffect(() => {
    if (!selectedValue) return 

    if (!options || options.length === 0) return
    
    const option = options.find(o => o.id === selectedValue)

    if (option) {
      setSelected(option.label ?? null)
    }
  }, [selectedValue, options])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);  
        
        onCloseList?.()
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={dropdownRef}
      className={`dropdown-container ${disabled ? 'disabled' : ''} ${size}`}
    >
      <span className='dropdown-label'>
        {label}  
      </span> 

      <div 
        className={`
          dropdown-selected 
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          ${errorText ? 'has-error' : ''}
        `}
        ref={containerRef}
        onClick={() => toggleList()}
      >
        {selected ? (
          <p 
            className={`dropdown-selected-value ${disabled ? 'disabled' : ''}`}
            ref={textRef}
          >
            {selected}
          </p>
        ) : (
          <input
            type="text"
            className="dropdown-search-input"
            value={searchQuery}
            placeholder={String(searchPlaceholder)}
            disabled={Boolean(disabled)}
            onChange={handleSearchChange}
          />
        )}
        
        {selected && 
          <XMarkIcon 
            aria-hidden="true" 
            className={`dropdown-icon text-rose-600 ${disabled ? 'disabled' : ''}`} 
            onClick={(e) => clearSelected(e)}
          />
        }

        {
          !selected && 
          <MagnifyingGlassIcon aria-hidden="true" 
            className={`h-4 w-4 text-gray-900 ${disabled ? 'text-slate-400' : ''}`}
          />
        }

        <ChevronDownIcon 
          aria-hidden="true" 
          className={`dropdown-icon text-gray-900 ${disabled ? 'disabled' : ''} ${isOpen ? 'opened' : ''}`}
        />

        {
          isTruncated && 
          <Tooltip
            anchorSelect=".selected-text"
            content={selected ? `${selected}` : ''}
          />
        }
      </div>

      {
        errorText && 
        <small className='hint absolute left-0 top-full mt-1 z-0 text-red-500'>{errorText}</small>
      }
      
      {
        isOpen && 
        <div
          className="dropdown-list custom-scrollbar"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((item) => {
              const highlightedLabel = highlightMatch(String(item.label), searchQuery)

              return (
                <p 
                  key={item.id}
                  className={`dropdown-option ${item.disabled ? 'disabled text-slate-400' : 'text-gray-700'}`}
                  onClick={() => selectItem(item)}
                >
                  {
                    item.icon && 
                    <span 
                      className={`option-icon-wrapper  ${item.disabled ? 'disabled' : ''}`} 
                      dangerouslySetInnerHTML={{ __html: item.icon }} 
                    />
                  }
                  
                  <span 
                    className='truncate' 
                    style={{ width: "calc(100% - 1.5rem)" }}
                    title={String(item.label)}
                    dangerouslySetInnerHTML={{ __html: highlightedLabel }}
                  /> 
  
                  {item.id === selectedValue && 
                    <CheckIcon 
                      className="w-4 h-4 text-green-600" 
                      style={{ marginRight: '-0.5rem' }}
                    />
                  }
                </p>
              )
            })
            ) : (
              <div className='dropdown-empty-search'>
                <FaceFrownIcon className='not-found-icon'/>

                <p className='not-found-text'>
                  {notFoundText}
                </p>
              </div>
            )
          }
        </div>
      }
    </div>
  )
}

export default Dropdown