# Components

## List

1. [Buttons](#buttons)
   * [Button](#button)
   * [Ghost Button](#ghost-button)
   * [Social Button](#social-button)
   * [Label with Icon](#label-with-icon)
2. [Card](#card)
3. [Form](#form)
    * [ComboBox](#combo-box)
    * [Input Field](#input-field)
    * [Counter](#counter)
    * [Radio Button](#radio-button)
4. [Photo Uploader](#photo-uploader)
5. [Typography](#typography)
6. [Products](#products)
    * [Cart Product](#cart-product)
    * [Product Card](#product-card)
    * [Product Slider](#product-slider)
7. [Header](#header)
8. [Drop Down](#drop-down)

## Buttons

### Button

```html
<Button> Button <Button>
```

| Props | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| `children` | string | - | Required | - |
| `type` | string | Button's color | Required | btn--red |
| `onClick` | function | Action will be called | Required | - |
| `className` | string | - | - | empty string |
| `disable` | boolean | - | - | false |

### Ghost Button

```html
<GhostButton> Ghost Button </GhostButton>
```

| Props | Type | Description | Required | Default Value
| --- | --- | --- | --- | --- |
| `children` | string | - | Required | - |
| `onClick` | function | Action will be called | Required | - |
| `icon` | string | Icon's name | - | - |
| `iconWidth` | number | Icon's width | - | - |
| `className` | string | - | - | empty string |
| `disable` | boolean | - | - | false |

### Social Button

```html
<SocialButton> Facebook </SocialButton>
```

| Props | Type | Description | Required | Default Value |
| --- | --- | --- | --- | -- |
| `social` | string | Facebook or Google | - | - |
| `onClick` | function | Action will be called | Required | - |
| `className` | string | - | - | empty string |

### Label With Icon

```html
<LabelWithIcon> Add new </LabelWithIcon>
```

| Props | Type | Description | Required | Default Value |
| --- | --- | --- | --- | -- |
| `children` | string | - | Required | - |
| `onClick` | function | Action will be called | Required | - |
| `className` | string | - | - | empty string |

----

## Card

```html
<Card> Some divs </Card>
```

| Props | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| `children` | string | - | Required | - |
| `className` | string | - | - | empty string |

----

## Form

### Combo-box

```html
<ComboBox />
```

| Props | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| `icon` | string | Icon's name | - | - |
| `iconWidth` | number | Icon's width | - | - |
| `placeholderImg` | string | Image that will be replaced with icon location | - | - |
| `placeholder` | string | - | Required | - |
| `items` | array | Item's array (See above for object structure) | - | - |
| `setData` | function | Function that updated value in your parent's component | - | - |
| `onChange` | function | Function will be executed when user changes his selection | - | - |
| `select` | any | Default selection for the input | - | - |
| `className` | string | - | - | empty string |

#### APIs

| Method | Usage | Params | Returns |
| --- | --- | --- | --- |
| `toggleMenuList()` | Shows/hides the menu list | - | - |
| `hideMenuList()` | Hides menu list | - | - |
| `updateValue(newValue, newApiValue)` | Updates combo-box values | string or number, string or number | - |
| `updatePlaceholderImg(newImg)` | Updates the current shown image | base64 or url | - |
| `getInputValue()` | Returns the current apiValue | - | number or string |
| `onTyping(e)` | Updates current typing, and filter the menu list | event | - |
| `updateItems(items)` | Replaces current menu list with a new one | array | - |
| `select(value)` | Selects an item and update combo-box's value and apiValue  | string | - |
| `clearSelected()` | Clears current selected item | - | - |
| `showErrorMessage(errorMessage)` | Shows error message | string | - |
| `hideErrorMessage()` | Hides error message | - | - |
| `isValid()` | Validates input's data | - | boolean |
| `filterList(keyword)` | Filters menu list | string or number | - |
| `validate()` | Runs some validation checks | - | - |
| `focus()` | Move focus on combo-box | - | - |
| `aVSAn(keyword)` | Choose between a/An | - | - |

#### Items array

```javascript
[{
  data: {
    placeholder: //When component is selected, this is what will be display in the combo-box,
    value: //This is the value that will be returned,
    searchable: //an array of keywords that use can filter the list with,
    img: //If the component have images this image will be shown in combo-box
  },
  component: <div>Component will be rendered inside the menu list</div>
}]
```

### Input Field

```html
<InputField />
```

| Props | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| `type` | string | Input's type | Required | text |
| `icon` | string | Icon's name | - | - |
| `iconWidth` | number | Icon's width | - | - |
| `center` | bool | Center the placeholder | - | - |
| `placeholder` | string | - | Required | - |
| `value` | string | Defines the value for the input | - | - |
| `validationChecks` | array | Array of regexes and error message to loop through | - | - |
| `setDate` | function | Function that set's a value in the parent component | - | - |
| `onBlur` | function | Function that is triggered when the input loses focus  | - | - |
| `onTyping` | function | Function that is triggered when the user is typing  | - | - |
| `helperImages` | array | Array of photos to show in the input as helpers  | - | - |
| `helperIcon` | string | Icon's name  | - | - |
| `helperIconWidth` | number | Icon's width  | - | - |
| `maxWidth` | number | Max number of characters | - | - |
| `formatOnTyping` | function | Function that format the value onBlur | - | - |
| `inputId` | string | - | - | - |
| `autoComplete` | string | - | - | - |
| `name` | string | - | - | - |
| `disabled` | boolean | - | - | false |
| `className` | string | - | - | empty string |

#### APIs

| Method | Usage | Params | Returns |
| --- | --- | --- | --- |
| `onFocus()` | Triggered when user focuses on the input | - | - |
| `onBlur()` | Triggered when user leaves the input | - | - |
| `getInputValue()` | Returns the current apiValue | - | number or string |
| `onTyping(e)` | Updates current value | event | - |
| `showErrorMessage(errorMessage)` | Shows error message | string | - |
| `hideErrorMessage()` | Hides error message | - | - |
| `isValid()` | Validates input's data | - | boolean |
| `validate()` | Runs some validation checks | - | - |
| `focus()` | Move focus on input field | - | - |

#### Validation checks array

```javascript
[
  {
    regex: // Regex to match,
    errorMessage: //Error message that will show it the input's value doesn't match
  }
]
```

#### Helper images array

```javascript
[
  {
    image: // Image src,
    height: // Image height
  }
]
```

----

### Counter

```html
<Counter />
```

| Props | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| `value` | number | Starting value | Required | - |
| `setData` | function | Function that updated value in your parent's component | - | - |
| `onChange` | function | Function will be executed when user clicks on -/+ buttons | - | - |
| `className` | string | - | - | empty string |

#### APIs

| Method | Usage | Params | Returns |
| --- | --- | --- | --- |
| `increaseCount()` | - | - | - |
| `decreaseCount()` | - | - | - |
| `onChange()` | Triggered when user increase/decreases count | - | - |
| `getInputValue()` | Returns the current apiValue | - | number or string |
| `isValid()` | Validates input's data | - | boolean |
| `validate()` | Runs some validation checks | - | - |

### Radio Button

```html
<RadioButton />
```

| Props | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| `selected` | number | Option that should be selected | Required | - |
| `options` | array | Array of options | Required | - |
| `listAlignment` | string | Alignement class (flex-col or flex-row) | - | flex-col |
| `setData` | function | Function that updated value in your parent's component | - | - |
| `onChange` | function | Function will be executed when user clicks on -/+ buttons | - | - |
| `className` | string | - | - | empty string |

#### APIs

| Method | Usage | Params | Returns |
| --- | --- | --- | --- |
| `updateValue(value)` | Updates the current selected value | - | - |
| `getInputValue()` | Returns the current value | - | number or string |
| `isValid()` | Validates input's data | - | boolean |
| `validate()` | Runs some validation checks | - | - |
| `focus()` | Move focus on input field | - | - |
| `setData` | function | Function that updated value in your parent's component | - | - |

#### Options array

```javascript
[
  {
    name: // Option name,
    value: // Value that will be returned,
    component: // Component that will be rendered
  }
]
```

## Photo Uploader

```html
<PhotoUploader />
```

| Props | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| `value` | string | Photo will be uploaded | - | - |
| `showCropper` | boolean | Choose between open a cropper or not | - | - |
| `className` | string | Should vary between multiple instances | Required | - |
| `setData` | function | Function that updated value in your parent's component | - | - |

## Typography

```html
<Title> Title </Title>
<Heading> Heading </Heading>
<Subheading> Subheading </Subheading>
<Text> Text </Text>
<Caption> Caption </Caption>
```

| Props | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| `children` | string, array, object | Text that will rendered | Required | - |
| `onClick` | function | Function will be called onClick | - | - |
| `htmlFor` | string, number | - | - | - |
| `className` | string | Should vary between multiple instances | - | empty string |

## Products

### Cart Product

```html
<CartProduct />
```

| Props | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| `product` | object | Product object | Required | - |
| `navigate` | func | Action will be made on edit | Required | - |
| `onDelete` | func | Action will be made on delete | Required | - |
| `currency` | string | Billing currency | Required | - |

#### APIs

| Method | Usage | Params | Returns |
| --- | --- | --- | --- |
| `markAsDeleted()` | Mark the product as deleted | - | - |
| `restoreDefault()` | Undo the delete action | - | - |

### Product card

```html
<ProductCard />
```

| Props | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| `onClick` | func | On click action | - | - |
| `headerImage` | string | Product card background image | - | - |
| `headerIcon` | string | Product icon | - | - |
| `headerIconWidth` | number | Product icons' width | - | - |
| `title` | string | Product name | - | - |
| `description` | string | Product description | - | - |
| `footerIcon` | string | Subscribe icon | - | - |
| `footerIconWidth` | number | Subscribe icon's width | - | - |
| `footerIconColor` | string | Subscribe color | - | - |
| `footerText` | string | Subscribe text | - | - |
| `isRegistered` | boolean | Indicates if the user is already subscribed to the product | - | - |
| `isLoading` | boolean | Indicates if the product card is in loading state | - | - |

### Product Slider

```html
<ProductSlider> <div>... </ProductSlider>
```

| Props | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| `children` | array | - | Required | - |

#### APIs

| Method | Usage | Params | Returns |
| --- | --- | --- | --- |
| `hideSliderController()` | - | - | - |
| `moveSliderToLeft()` | - | - | - |
| `moveSliderToRight()` | - | - | - |

## Header

```html
<Header />
```

| Props | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| `headerItems` | object | Items will be rendered in the header | - | - |
| `itemsClass` | string | Extra class to be added to items container | - | empty string |

## loading

This component is used for `react-loadable` **only**

| Props | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| `isLoading` | boolean | - | - | - |
| `timedOut` | boolean | - | - | - |
| `error` | boolean | - | - | - |
| `pastDelay` | boolean | - | - | - |

# Drop-down

```html
<DropDown />
```

| Props | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| `placeholder` | object | Selected component of drop-down | - | - |
| `items` | array | Item's array (See above for object structure) | Required | - |
| `setData` | function | Function that updated value in your parent's component | - | - |
| `onChange` | function | Function will be executed when user changes his selection | - | - |
| `select` | number | Value for pre-selected item | Required | - |
| `className` | string | - | - | empty string |
| `disable` | bool | - | - | false |

## APIs

| Method | Usage | Params | Returns |
| --- | --- | --- | --- |
| `toggleDropDown()` | Shows/hides the drop-down list | - | - |
| `hideDropDown()` | Hides drop-down list | - | - |
| `updateValue(newValue, newPlaceholder)` | Updates drop-down values | string or number, string or number | - |
| `getDropDownValue()` | Returns the current apiValue | - | number or string |
| `select(value)` | Selects an item and update drop-down's value and apiValue  | string | - |
