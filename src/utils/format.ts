export const handleCpfInputFormatting = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.replace(/\D/g, '')
    let formattedValue = value
    if (value.length > 3) {
      formattedValue = value.substring(0, 3) + '.' + value.substring(3)
    }
    if (value.length > 6) {
      formattedValue = formattedValue.substring(0, 7) + '.' + value.substring(6)
    }
    if (value.length > 9) {
      formattedValue =
        formattedValue.substring(0, 11) + '-' + value.substring(9, 11)
    }
    if (value.length > 11) {
      formattedValue = formattedValue.substring(0, 14) // Limit to 123.456.789-00
    }
    e.target.value = formattedValue // Update visual input
  }

 export const handleTelephoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')

    let formattedValue = value
    if (value.length > 0) {
      formattedValue = '(' + value
    }
    if (value.length > 2) {
      formattedValue =
        formattedValue.substring(0, 3) + ') ' + value.substring(2)
    }
    if (value.length > 7) {
      formattedValue =
        formattedValue.substring(0, 10) + '-' + value.substring(7)
    }

    // Limit to phone format (XX) XXXXX-XXXX
    if (value.length > 11) {
      formattedValue = formattedValue.substring(0, 16)
    }

    e.target.value = formattedValue
  }