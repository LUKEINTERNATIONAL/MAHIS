export function arePropertiesNotEmpty(obj:any, arr: any) {
    return arr.every((property: any) => obj[property] !== '');

}
  