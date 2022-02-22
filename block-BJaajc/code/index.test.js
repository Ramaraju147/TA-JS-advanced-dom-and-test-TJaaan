const { getFullName,isPalindrome,getArea, getCircumference } = require('./index');

test('getFullName 1',() => {
    expect(getFullName('Rama','Raju')).toBe('Rama Raju')
})

test('getFullName 2',() => {
    expect(getFullName('Rama','Raju')).toBe('Rama Raju')
})

test('getFullName 3',() => {
    expect(getFullName('Ram','Raju')).not.toBe('Rama Raju')
})

test('isPalindrome 1',() => {
    expect(isPalindrome('madam')).toBe(true)
})

test('isPalindrome 2',() => {
    expect(isPalindrome('test')).toBe(false)
})

test('isPalindrome 3',() => {
    expect(isPalindrome(121)).toBe(true)
})

test('getArea 1', () => {
    expect(getArea(2)).toBe('The area is 9.36')
})

test('getArea 2', () => {
    expect(getArea(3)).toBe('The area is 21.06')
})

test('getArea 3', () => {
    expect(getArea(3)).not.toBe('The area is 23.06')
})

test('getCircumference 1', () => {
    expect(getCircumference(2)).toBe('The circumference is 9.36')
})

test('getCircumference 2', () => {
    expect(getCircumference(3)).toBe('The circumference is 14.04')
})

test('getCircumference 3', () => {
    expect(getCircumference(3)).not.toBe('The circumference is 23.06')
})