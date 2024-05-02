
export function areFieldsValid(propoerties_array: any) {
    let found_ivalid_entry = 0
    propoerties_array.forEach((property: any) => {
        if (property.skip_validation == true) {
            return true
        }
        if (property.dataValue.value == "" || property.dataValue.value === undefined) {
            property.show_error.value = true
            found_ivalid_entry++
        } else if (property.dataValue.value != "" || property.dataValue.value != undefined) {
            if (property.type == "text") {
                if (isInputTextValid(property.dataValue.value) == false) {
                    property.show_error.value = true
                    found_ivalid_entry++
                }
                if (isInputTextValid(property.dataValue.value) == true) {
                    property.show_error.value = false
                }
            }
            if (property.type == "alphanumeric") {
                if (isInputValid(property.dataValue.value) == false) {
                    property.show_error.value = true
                    found_ivalid_entry++
                }
                if (isInputValid(property.dataValue.value) == true) {
                    property.show_error.value = false
                }
            } else {
                property.show_error.value = false
            }
        }
        else {
            property.show_error.value = false
        }
    })

    if (found_ivalid_entry > 0) {
        return false
    } else if (found_ivalid_entry == 0) {
        return true
    }
}

export function isInputTextValid(txt: string): boolean {
    const trimmedText = txt.trim()
    const regex = /^[a-zA-Z\s\t]*$/
    return regex.test(trimmedText)
}

export function isInputValid(txt: string): boolean{
    const trimmedText = txt.trim()
    const regex = /^[a-zA-Z0-9\s\t]*$/
    return regex.test(trimmedText)
}

export function isPasswordValid(txt: string): boolean {
    const trimmedText = txt.trim()
    const regex = /^(?!.*\s)[a-zA-Z0-9@#$%^&+=*!-]{4,}$/
    return regex.test(trimmedText)
}

export function getFieldsValuesObj(properties_array: any[]) {
    let resultObject: { [key: string]: any } = {}; // Define an index signature for dynamic property names

    properties_array.forEach((property: any) => {
        resultObject[property.property_name] = property.dataValue.value; // Assuming each property has a 'property_name' and a 'value'
    })
    return resultObject;
}