# React + TypeScript + Vite

# Dropdown Component

The Dropdown component is a flexible and customizable dropdown menu that allows users to select an option from a list of available choices. It supports search functionality, error text, custom sizes, and icon rendering within the dropdown options. This component is designed to work seamlessly with React and TypeScript, and it includes a variety of optional features such as clearing the selected value and handling click events outside the dropdown.

## Features
 - **Customizable options**: Render a list of selectable options.
 - **Searchable**: Users can filter the options based on a search query.
 - **Error handling**: Displays error text below the dropdown when needed.
 - **Icons**: Optionally display icons next to each dropdown option.
 - **Size variations**: The dropdown can be displayed in small, medium, or large sizes.
 - **Clear selection**: Users can clear the selected value with a click on the "X" icon.
 - **Tooltip support**: If the selected value is too long, a tooltip will display on hover.
 - **Click outside handling**: Closes the dropdown when clicking outside of it.

 ## Props

`selectedValue` **(required)**
 - Type: `string | number | null`
 - Description: The currently selected value in the dropdown.

`label` **(optional)**
 - Type: `string | number | null | undefined`
 - Default: `'Label'`
 - Description: The label for the dropdown, displayed above the selected value or input.

`options` **(optional)**
 - Type: `Option[]`
 - Default: `[]`
 - Description: An array of options to be displayed in the dropdown list.

`disabled` **(optional)**
 - Type: `boolean | null`
 - Default: `false`
 - Description: Whether the dropdown is disabled. When true, no interaction is allowed.

`errorText` **(optional)**
 - Type: `string | null`
 - Default: `null`
 - Description: Error message to be displayed below the dropdown if any.

`size` **(optional)**
 - Type: `'small' | 'medium' | 'large'`
 - Default: `'medium'`
 - Description: Size of the dropdown. Choose from small, medium, or large.

`searchPlaceholder` **(optional)**
 - Type: `string | null`
 - Default: `'Search...'`
 - Description: Placeholder text for the search input when searching through options.

`notFoundText` **(optional)**
 - Type: `string | null`
 - Default: `'Nothing was found'`
 - Description: Message to display when no options match the search query.

`onSelectChange` **(required)**
 - Type: `(newSelectedValue: string | number | null) => void`
 - Description: Callback function to handle the selection change. It will be called with the new selected value.

`onOpenList` **(optional)**
 - Type: `() => void`
 - Description: Callback function triggered when the dropdown is opened.

`onCloseList` **(optional)**
 - Type: `() => void`
 - Description: Callback function triggered when the dropdown is closed.

`onClearValue` **(optional)**
 - Type: `() => void`
Description: Callback function triggered when the "clear" button (X icon) is clicked to clear the selected value.

## Example Usage

### Basic Usage

```javascript
import React, { useState } from 'react';
import Dropdown from './Dropdown';

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string | number | null>(null);

  const options = [
    { id: 1, label: 'Option 1', icon: '<svg>...</svg>' },
    { id: 2, label: 'Option 2', icon: '<svg>...</svg>' },
    { id: 3, label: 'Option 3', disabled: true },
  ];

  const handleSelectChange = (newValue: string | number | null) => {
    setSelectedValue(newValue);
  };

  return (
    <Dropdown
      selectedValue={selectedValue}
      options={options}
      onSelectChange={handleSelectChange}
      size="medium"
    />
  );
};

export default App;


## Styles
The component uses an external SCSS file for styling. You can modify the Dropdown.scss file to fit your design requirements. The component supports custom sizes (small, medium, large), and you can customize the layout and colors via CSS.

## Conclusion
This Dropdown component is highly flexible, allowing for a wide range of use cases, from simple selection to advanced features like search, error handling, and custom icons. The component works well in any React project and can be easily customized to meet your needs.