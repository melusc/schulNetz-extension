export const emptyObject = (object: Record<string, unknown>) => {
	for (const key of Object.getOwnPropertyNames(object)) {
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete object[key];
	}
};
