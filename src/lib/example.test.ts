import { add } from '$lib/example'
import { expect, it } from 'vitest'

type Spec = {
	name: string
	a: number
	b: number
	expected: number
}

const specs: Spec[] = [
	{ name: '1 + 2 = 3', a: 1, b: 2, expected: 3 },
	{ name: '2 + 3 = 5', a: 2, b: 3, expected: 5 },
	{ name: '3 + 4 = 7', a: 3, b: 4, expected: 7 },
]

it.each(specs)('add($a, $b) -> $expected', (spec) => {
	const { a, b, expected } = spec

	expect(add(a, b)).toBe(expected)
})
