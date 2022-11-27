What does `never` do in `TypeScript`?

In TypeScript, never is treated as the “no value” type. You will often see it being used as a dead-end type. A union type like string | never in TypeScript will evaluate to string, discarding never.

To understand that, you can think of string and never as mathematical sets where string is a set that holds all string values, and never is a set that holds no value (∅ set). The union of such two sets is obviously the former alone.

By contrast, the union string | any evaluates to any. Again, you can think of this as a union between the string set and the universal set (U) that holds all sets, which, to no one’s surprise, evaluates to itself.

This explains why never is used as an escape hatch because, combined with other types, it will disappear.
