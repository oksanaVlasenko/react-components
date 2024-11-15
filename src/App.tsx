
import { useState } from 'react'
import Dropdown from './components/select/Dropdown.js'
import './App.css'


function App() {
  const [selectedValue, setSelectedValue] = useState<string | number | null>(2);
  
  const handleSelectChange = (newSelectedValue: string | number  | null) => {
    setSelectedValue(newSelectedValue); 
  };

  const handleOpenList = () => {}

  const handleCloseList = () => {}

  const handleClearValue = () => {
    console.log('clear value')
  }
  
  const options = [
    {
      "id": 1,
      "label": "Item 1 lorem86 lorem86 lorem23",
      "disabled": true,
      "icon": `<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
           </svg>`
    },
    {
      "id": 2,
      "label": "Item 2 lorem94 lorem79 lorem81 Item 2 lorem94 lorem79 lorem81Item 2 lorem94 lorem79 lorem81",
      "disabled": false
    },
    {
      "id": 3,
      "label": "Item 3 lorem75 lorem96 lorem65",
      "disabled": false
    },
    {
      "id": 4,
      "label": "Item 4 lorem46 lorem56 lorem32",
      "disabled": true
    },
    {
      "id": 5,
      "label": "Item 5 lorem76 lorem85 lorem90",
      "disabled": false
    },
    {
      "id": 6,
      "label": "Item 6 lorem12 lorem33 lorem47",
      "disabled": true
    },
    {
      "id": 7,
      "label": "Item 7 lorem19 lorem66 lorem21",
      "disabled": false
    },
    {
      "id": 8,
      "label": "Item 8 lorem58 lorem73 lorem99",
      "disabled": true
    },
    {
      "id": 9,
      "label": "Item 9 lorem28 lorem94 lorem65",
      "disabled": false
    },
    {
      "id": 10,
      "label": "Item 10 lorem38 lorem44 lorem55",
      "disabled": true
    },
    {
      "id": 11,
      "label": "Item 11 lorem78 lorem91 lorem25",
      "disabled": false
    },
    {
      "id": 12,
      "label": "Item 12 lorem61 lorem88 lorem17",
      "disabled": true
    },
    {
      "id": 13,
      "label": "Item 13 lorem72 lorem49 lorem83",
      "disabled": false
    },
    {
      "id": 14,
      "label": "Item 14 lorem84 lorem40 lorem93",
      "disabled": true
    },
    {
      "id": 15,
      "label": "Item 15 lorem51 lorem45 lorem82",
      "disabled": false
    },
    {
      "id": 16,
      "label": "Item 16 lorem39 lorem60 lorem64",
      "disabled": true
    },
    {
      "id": 17,
      "label": "Item 17 lorem27 lorem68 lorem34",
      "disabled": false
    },
    {
      "id": 18,
      "label": "Item 18 lorem15 lorem62 lorem80",
      "disabled": true
    },
    {
      "id": 19,
      "label": "Item 19 lorem11 lorem20 lorem59",
      "disabled": false
    },
    {
      "id": 20,
      "label": "Item 20 lorem30 lorem63 lorem42",
      "disabled": true
    }
  ]  

  return (
    <>
      <h1>React Components</h1>

      <Dropdown 
        selectedValue={selectedValue}
        size='large'
        options={options}
        onSelectChange={handleSelectChange}
        onOpenList={handleOpenList}
        onCloseList={handleCloseList}
        onClearValue={handleClearValue}
      />
    </>
  )
}

export default App
