#### 0.8.1 (2019-06-15)

##### Bug Fixes

*  fix import case ([2b5fb87c](https://github.com/no-chris/chords-charts-studio/commit/2b5fb87c6ef988b259583c97e7a090283d9a6cbb))

### 0.8.0 (2019-06-10)

##### Build System / Dependencies

*  update dependencies and fix unit tests ([f19b9181](https://github.com/no-chris/chords-charts-studio/commit/f19b9181bedd280bf428cfaf8c130513040f53b6))
*  Add changelog generation scripts ([d884d227](https://github.com/no-chris/chords-charts-studio/commit/d884d227c27c505e98f1671421ca5b9a7f760787))
*  build ([ddede306](https://github.com/no-chris/chords-charts-studio/commit/ddede306656b565402f0d4783d45e035fbb1ca2f))

##### New Features

* **chordmark:**
  *  Expose new ChordMark options: Simplify and ShortNamings ([e2bc8561](https://github.com/no-chris/chords-charts-studio/commit/e2bc8561d4f1a29dec00e76ff7b10cc7ef580197))
  *  Expose new ChordMark options: Simplify and ShortNamings ([69340d68](https://github.com/no-chris/chords-charts-studio/commit/69340d68aa80e50672612037e5396a59a3820dce))
* **build:**  Update dependencies ([a38f61e3](https://github.com/no-chris/chords-charts-studio/commit/a38f61e305fbbb89ecdf6b37f7ac21177afe67e1))

##### Bug Fixes

* **print:**  Fix lines height not correctly detected ([98b8bfd6](https://github.com/no-chris/chords-charts-studio/commit/98b8bfd678e79f677196454c9ce2a29a6710400b))

### 0.7.0 (2019-05-10)

##### Build System / Dependencies

*  updated dependencies ([486ce28b](https://github.com/no-chris/chords-charts-studio/commit/486ce28bea84f73ce847cbb4f9a333c5a79c3b38))
* **version:**  Bump versions in footer ([eb40df86](https://github.com/no-chris/chords-charts-studio/commit/eb40df8630bdd6918ce77082335ba898ee9710cd))

##### New Features

* **options:**  Added toggles for expandSectionRepeats and autoRepeatChords rendering options ([cc535634](https://github.com/no-chris/chords-charts-studio/commit/cc535634106c85166aa85249eeb0e3caeddd3d69))
* **editor:**
  *  Improved styling of every view ([dc7196b0](https://github.com/no-chris/chords-charts-studio/commit/dc7196b06b20c3081ddfae3e94860ec38f713e29))
  *  Handling of chordsColors and highlightChords options ([ee9353dc](https://github.com/no-chris/chords-charts-studio/commit/ee9353dc9bff236c489b282c7cb241e5ea1a8d59))
* **play:**
  *  Allow 4 columns display ([67cfb076](https://github.com/no-chris/chords-charts-studio/commit/67cfb076bf5f4c4d5404a686498c01c91f58beb4))
  *  Added handling of formatting options ([1be64c65](https://github.com/no-chris/chords-charts-studio/commit/1be64c65ba295edd3713ea6ec6fd325179cdc4b7))

##### Bug Fixes

* **print:**
  *  Connected new rendering options ([91a75019](https://github.com/no-chris/chords-charts-studio/commit/91a75019502e5986b6227fbd79a3efc5bf6d32a6))
  *  fixed colors in print preview ([0002ba68](https://github.com/no-chris/chords-charts-studio/commit/0002ba68d28981e731c44d44a174cbdf606dc543))
* **editor:**  Fix barSeparator color & disabled extra widgets ([7387f663](https://github.com/no-chris/chords-charts-studio/commit/7387f6635e4efda3a46b92f7930ef6acf9aab29a))

##### Refactors

* **chordmark:**  Renamed ucc to chord-mark ([be533ff7](https://github.com/no-chris/chords-charts-studio/commit/be533ff752fc68b74a74d099a81739fc74c41f33))

##### Tests

*  fix unit tests ([d8d564ad](https://github.com/no-chris/chords-charts-studio/commit/d8d564ad1f5f7f7b66df9232f85676b8d339f437))

### v0.6.0 (28/04/2019)

#### New features:

- Added print preview functionality
- ~adopted new versioning schema as semver does not make sense here~~

### v0.5.0 (14/04/2019)

#### New features:

- Moved to React/Redux
- Changed license
- Changed name

### v0.4.0 (27/03/2019)

#### New features:

- Moved libraries file to own repository
- Implemented architecture fitness functions

### v0.3.0 (24/03/2019)

#### New features:

- Parsing of time signatures
- Song transposing
- Basic files manager (uses browser local storage)
