const isArray = (value) => Object.prototype.toString.call(value) === '[object Array]'
const isString = (value) => Object.prototype.toString.call(value) === '[object String]'

const patternToRegex = (pattern) => {
	let segments = pattern.split('/')

	// tokens to escape
	const escape = ['\\.', '\\(', '\\)']

	// tokens to replace
	const replace = [
		// ‘?’ in the OSC Address Pattern matches any single character
		['\\?', '.'],

		// ‘*’ in the OSC Address Pattern matches any sequence of zero or more characters
		['\\*', '.*'],

		// A comma-separated list of strings enclosed in curly braces (e.g., “{foo,bar}”)
		['\\{(.*?(?:,(?:.*?)))\\}', '($1)'],
		[',', '|'],

		// An exclamation point at the beginning of a bracketed string negates the sense of the list
		['\\[!(.*?)\\]', '[^$1]'],
	]

	segments = segments.map((segment) => {
		let temp = segment

		escape.forEach((token) => {
			const regex = new RegExp(`${token}`, 'g')
			temp = temp.replace(regex, `\\${token}`)
		})

		replace.forEach(([token, replacement]) => {
			const regex = new RegExp(`${token}`, 'g')
			temp = temp.replace(regex, `${replacement}`)
		})

		return temp
	})

	return new RegExp(`^${segments.join('/')}$`)
}

const matchAddress = (addressPattern, address) => {
	if (!isString(addressPattern) || !isString(address)) {
		return false
	}

	try {
		const regex = patternToRegex(addressPattern)
		return regex.test(address)
	} catch {
		return false
	}
}

const matchAddressSpace = (addressPattern, addressSpace) => {
	if (!isString(addressPattern) || !isArray(addressSpace)) {
		return []
	}

	return addressSpace.filter((address) => (isString(address) ? matchAddress(addressPattern, address) : false))
}

const getFilterFn = (addressPattern) => {
	if (!isString(addressPattern)) {
		return () => false
	}

	return matchAddress.bind(null, addressPattern)
}

module.exports = {
	getFilterFn,
	matchAddress,
	matchAddressSpace,
}
