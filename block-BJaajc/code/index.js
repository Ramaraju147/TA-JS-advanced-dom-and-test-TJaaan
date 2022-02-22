const pi = 2.34;

function getFullName(firstName,lastName){
return firstName+' '+lastName;
}

function isPalindrome(str){
    let originalValue = String(str);
    let reverseValue = '';
    for(let i=originalValue.length-1;i>=0;i--){
        reverseValue += originalValue[i]
    }
    return originalValue===reverseValue;
}

function getCircumference(radius){
return `The circumference is ${2*pi*radius}`;
}

function getArea(radius){
    return `The area is ${pi*radius*radius}`;
}

module.exports = { getFullName,isPalindrome,getCircumference, getArea }