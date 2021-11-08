import _ from 'lodash';

import * as selectors from '../../../../src/db/files/selectors';

describe('db/files: selectors', () => {
	describe('getAllTitles()', () => {
		test('should return an empty array if no files are presents', () => {
			const state = {
				db: {
					files: {
						allFiles: {},
					},
				},
			};
			const expected = [];

			const result = selectors.getAllTitles(state);

			expect(result).toEqual(expected);
		});

		test('should return all titles alpha sorted', () => {
			const state = {
				db: {
					files: {
						allFiles: {
							id1: {
								id: 'id1',
								title: 'CCC',
								content: 'content1',
							},
							id2: {
								id: 'id2',
								title: 'aaa',
								content: 'content2',
							},
							id3: {
								id: 'id3',
								title: 'BBB',
								content: 'content3',
							},
						},
					},
				},
			};
			const expected = [
				{ id: 'id2', title: 'aaa' },
				{ id: 'id3', title: 'BBB' },
				{ id: 'id1', title: 'CCC' },
			];
			const result = selectors.getAllTitles(state);

			expect(result).toEqual(expected);
		});

		test('should return the same object on each call with the same data', () => {
			const state = {
				db: {
					files: {
						allFiles: {
							id1: {
								id: 'id1',
								title: 'CCC',
								content: 'content1',
							},
							id2: {
								id: 'id2',
								title: 'aaa',
								content: 'content2',
							},
							id3: {
								id: 'id3',
								title: 'BBB',
								content: 'content3',
							},
						},
					},
				},
			};
			const result1 = selectors.getAllTitles(state);
			const result2 = selectors.getAllTitles(state);

			expect(result1).toBe(result2);
		});

		test('should return the same object on each call, even if file content has changed', () => {
			const state1 = {
				db: {
					files: {
						allFiles: {
							id1: {
								id: 'id1',
								title: 'CCC',
								content: 'content1',
							},
							id2: {
								id: 'id2',
								title: 'aaa',
								content: 'content2',
							},
							id3: {
								id: 'id3',
								title: 'BBB',
								content: 'content3',
							},
						},
					},
				},
			};
			const state2 = _.cloneDeep(state1);
			state2.db.files.allFiles.id1.content = 'newContent1';
			state2.db.files.allFiles.id2.content = 'newContent2';
			state2.db.files.allFiles.id3.content = 'newContent3';

			const result1 = selectors.getAllTitles(state1);
			const result2 = selectors.getAllTitles(state2);

			expect(result1).toBe(result2);
		});
	});

	describe('getOne()', () => {
		test('should return requested file', () => {
			const state = {
				db: {
					files: {
						allFiles: {
							id1: {
								id: 'id1',
								title: 'CCC',
								content: 'content1',
							},
						},
					},
				},
			};
			const expected = { id: 'id1', title: 'CCC', content: 'content1' };

			const result = selectors.getOne(state, 'id1');

			expect(result).toEqual(expected);
		});

		test('should return undefined if file does not exists', () => {
			const state = {
				db: {
					files: {
						allFiles: {},
					},
				},
			};
			const result = selectors.getOne(state, 'id1');

			expect(result).toBeUndefined();
		});
	});

	describe('getCategoryOptions()', () => {
		test('should return saved options for a given file/category', () => {
			const state = {
				db: {
					files: {
						allFiles: {
							id1: {
								id: 'id1',
								options: {
									songFormatting: {
										columnsCount: 3,
										documentSize: 'a2',
									},
								},
							},
						},
					},
				},
			};
			const expected = {
				columnsCount: 3,
				documentSize: 'a2',
			};

			const result = selectors.getCategoryOptions(
				state,
				'id1',
				'songFormatting'
			);

			expect(result).toEqual(expected);
		});

		test('should return a clone of the state', () => {
			const state = {
				db: {
					files: {
						allFiles: {
							id1: {
								id: 'id1',
								options: {
									songFormatting: {
										columnsCount: 3,
										documentSize: 'a3',
									},
								},
							},
						},
					},
				},
			};

			const result = selectors.getCategoryOptions(
				state,
				'id1',
				'songFormatting'
			);

			result.columnsCount = 4;
			result.documentSize = 'a4';
			expect(
				state.db.files.allFiles.id1.options.songFormatting.columnsCount
			).toBe(3);
			expect(
				state.db.files.allFiles.id1.options.songFormatting.documentSize
			).toBe('a3');
		});

		test('should return undefined if category does not exists', () => {
			const state = {
				db: {
					files: {
						allFiles: {
							id1: {
								id: 'id1',
								options: {
									songFormatting: {
										columnsCount: 3,
										documentSize: 'a2',
									},
								},
							},
						},
					},
				},
			};
			const result = selectors.getCategoryOptions(state, 'id1', 'none');
			expect(result).toBeUndefined();
		});

		test('should return undefined if file does not exists', () => {
			const state = {
				db: {
					files: {
						allFiles: {
							id1: {
								id: 'id1',
								options: {
									songFormatting: {
										columnsCount: 3,
										documentSize: 'a2',
									},
								},
							},
						},
					},
				},
			};
			const result = selectors.getCategoryOptions(
				state,
				'idXXX',
				'songFormatting'
			);
			expect(result).toBeUndefined();
		});

		test('should return undefined if file does not have any saved options', () => {
			const state = {
				db: {
					files: {
						allFiles: {
							id1: {
								id: 'id1',
							},
						},
					},
				},
			};
			const result = selectors.getCategoryOptions(
				state,
				'id1',
				'songFormatting'
			);
			expect(result).toBeUndefined();
		});
	});
});
