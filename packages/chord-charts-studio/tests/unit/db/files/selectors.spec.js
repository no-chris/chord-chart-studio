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
		const state = {
			db: {
				files: {
					allFiles: {
						id1: {
							id: 'id1',
							options: {
								songFormatting: {
									columnsCount: 3,
									documentMargins: 2,
								},
							},
						},
					},
				},
			},
		};

		test('should return saved options for a given file/category', () => {
			const expected = {
				columnsCount: 3,
				documentMargins: 2,
			};

			const result = selectors.getCategoryOptions(
				state,
				'id1',
				'songFormatting'
			);

			expect(result).toEqual(expected);
		});

		test('should return a clone of the state', () => {
			const result = selectors.getCategoryOptions(
				state,
				'id1',
				'songFormatting'
			);

			result.columnsCount = 4;
			result.documentMargins = 4;
			expect(
				state.db.files.allFiles.id1.options.songFormatting.columnsCount
			).toBe(3);
			expect(
				state.db.files.allFiles.id1.options.songFormatting
					.documentMargins
			).toBe(2);
		});

		test('should return undefined if category does not exists', () => {
			const result = selectors.getCategoryOptions(state, 'id1', 'none');
			expect(result).toBeUndefined();
		});

		test('should return undefined if category is empty', () => {
			const stateWithNoOptions = {
				db: {
					files: {
						allFiles: {
							id1: {
								options: {
									songFormatting: {},
								},
							},
						},
					},
				},
			};
			const result = selectors.getCategoryOptions(
				stateWithNoOptions,
				'id1',
				'songFormatting'
			);
			expect(result).toBeUndefined();
		});

		test('should return undefined if file does not exists', () => {
			const result = selectors.getCategoryOptions(
				state,
				'idXXX',
				'songFormatting'
			);
			expect(result).toBeUndefined();
		});

		test('should return undefined if file does not have any saved options', () => {
			const stateWithNoOptions = {
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
				stateWithNoOptions,
				'id1',
				'songFormatting'
			);
			expect(result).toBeUndefined();
		});
	});

	describe('getLatestModeOptions()', () => {
		const state = {
			db: {
				files: {
					allFiles: {
						id1: {
							options: {
								edit: {},
								play: {
									updatedAt: 100,
									optionA: 1,
									optionB: 1,
									optionC: 1,
								},
								print: {
									updatedAt: 200,
									optionA: 2,
									optionB: 2,
								},
								export: {
									updatedAt: 300,
									optionA: 3,
								},
							},
						},
					},
				},
			},
		};

		test('should return most recent options for each mode', () => {
			const expected = {
				optionA: 3,
				optionB: 2,
				optionC: 1,
				updatedAt: 300,
			};
			const result = selectors.getLatestModeOptions(state, 'id1');

			expect(result).toEqual(expected);
		});

		test('should return a copy of the state', () => {
			const result = selectors.getLatestModeOptions(state, 'id1');

			result.optionA = 4;
			result.optionB = 4;
			result.optionC = 4;
			result.updatedAt = 400;

			const originalState = {
				options: {
					edit: {},
					play: {
						updatedAt: 100,
						optionA: 1,
						optionB: 1,
						optionC: 1,
					},
					print: {
						updatedAt: 200,
						optionA: 2,
						optionB: 2,
					},
					export: {
						updatedAt: 300,
						optionA: 3,
					},
				},
			};

			expect(state.db.files.allFiles.id1).toEqual(originalState);
		});

		test('should return undefined if file does not exists', () => {
			const result = selectors.getLatestModeOptions(
				state,
				'idXXX',
				'songFormatting'
			);
			expect(result).toBeUndefined();
		});

		test('should return undefined if no options are defined', () => {
			const stateWithNoOptions = {
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
			const result = selectors.getLatestModeOptions(
				stateWithNoOptions,
				'id1'
			);
			expect(result).toBeUndefined();
		});
	});
});
