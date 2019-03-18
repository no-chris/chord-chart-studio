export default (expect, object) => {
	expect(object).toBeInstanceOf(Object);
	expect(object.emit).toBeInstanceOf(Function);
	expect(object.on).toBeInstanceOf(Function);
	expect(object.off).toBeInstanceOf(Function);
};