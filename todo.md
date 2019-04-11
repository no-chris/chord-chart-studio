# Tech debt
- unit / integration / functional tests 100%
- what to do with unknown options ? Don't display them if not in allWidgets
- have a clear entry point for each feature module
- add id enricher middleware
- react strict mode
- react error boundaries
- remove handlebars

- CSS: decide what to do with the font size mixin
- CSS: better abstract color variables names (foreground/background, remove systematic theme prefix)

+ icon:    vertical-align: middle;
+ check structure/skin/layout
+ better encapsulation for icons in tests? Well anyway it will break on lib change because icons names are differents...
+ remove old fileManager
+ SCSS individual imports
+ abstract material icons in CSS with an icon class


## Component checklist
- memo ?
- propTypes ?
- defaultProps ?
- visual re-render check
