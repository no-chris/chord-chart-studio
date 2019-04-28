export default function padColumns(columnCount, allColumns = []) {
	for (let i = (allColumns.length || 0); i < columnCount; i++) {
		allColumns.push([]);
	}
	return allColumns;
}
