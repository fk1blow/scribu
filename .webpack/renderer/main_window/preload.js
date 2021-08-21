/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./packages/preload/index.ts":
/*!***********************************!*\
  !*** ./packages/preload/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar electron_1 = __webpack_require__(/*! electron */ \"electron\");\nvar apiKey = 'electron';\nvar api = {\n    versions: process.versions,\n    // signalAppReady: () => ipcRenderer.invoke('app-ready'),\n    // getWorkspace: () => ipcRenderer.invoke('get-workspace'),\n    // listenToMain: (event, listener) => ipcRenderer.on(event, listener),\n    // writeToCurrentFile: (content: string) =>\n    //   ipcRenderer.invoke('write-to-current-file', content),\n};\nif (process.env.MODE !== 'test') {\n    /**\n     * The \"Main World\" is the JavaScript context that your main renderer code runs in.\n     * By default, the page you load in your renderer executes code in this world.\n     *\n     * @see https://www.electronjs.org/docs/api/context-bridge\n     */\n    electron_1.contextBridge.exposeInMainWorld(apiKey, api);\n}\nelse {\n    /**\n     * Recursively Object.freeze() on objects and functions\n     * @see https://github.com/substack/deep-freeze\n     * @param obj Object on which to lock the attributes\n     */\n    var deepFreeze_1 = function (obj) {\n        // eslint-disable-line @typescript-eslint/no-explicit-any\n        if (typeof obj === 'object' && obj !== null) {\n            Object.keys(obj).forEach(function (prop) {\n                var val = obj[prop];\n                if ((typeof val === 'object' || typeof val === 'function') &&\n                    !Object.isFrozen(val)) {\n                    deepFreeze_1(val);\n                }\n            });\n        }\n        return Object.freeze(obj);\n    };\n    deepFreeze_1(api);\n    // window[apiKey] = api\n    // Need for Spectron tests\n    window.electronRequire = __webpack_require__(\"./packages/preload sync recursive\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy9wcmVsb2FkL2luZGV4LnRzLmpzIiwibWFwcGluZ3MiOiI7O0FBQUEsaUVBQXFEO0FBRXJELElBQU0sTUFBTSxHQUFHLFVBQVU7QUFFekIsSUFBTSxHQUFHLEdBQUc7SUFDVixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7SUFDMUIseURBQXlEO0lBQ3pELDJEQUEyRDtJQUMzRCxzRUFBc0U7SUFDdEUsMkNBQTJDO0lBQzNDLDBEQUEwRDtDQUMzRDtBQUVELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO0lBQy9COzs7OztPQUtHO0lBQ0gsd0JBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO0NBQzdDO0tBQU07SUFDTDs7OztPQUlHO0lBQ0gsSUFBTSxZQUFVLEdBQUcsVUFBQyxHQUFRO1FBQzFCLHlEQUF5RDtRQUN6RCxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtnQkFDNUIsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDckIsSUFDRSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxPQUFPLEdBQUcsS0FBSyxVQUFVLENBQUM7b0JBQ3RELENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFDckI7b0JBQ0EsWUFBVSxDQUFDLEdBQUcsQ0FBQztpQkFDaEI7WUFDSCxDQUFDLENBQUM7U0FDSDtRQUVELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDM0IsQ0FBQztJQUVELFlBQVUsQ0FBQyxHQUFHLENBQUM7SUFFZix1QkFBdUI7SUFFdkIsMEJBQTBCO0lBQzFCLE1BQU0sQ0FBQyxlQUFlLEdBQUcsd0RBQU87Q0FDakMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1uZXctYXBwLy4vcGFja2FnZXMvcHJlbG9hZC9pbmRleC50cz82NjYwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbnRleHRCcmlkZ2UsIGlwY1JlbmRlcmVyIH0gZnJvbSAnZWxlY3Ryb24nXG5cbmNvbnN0IGFwaUtleSA9ICdlbGVjdHJvbidcblxuY29uc3QgYXBpID0ge1xuICB2ZXJzaW9uczogcHJvY2Vzcy52ZXJzaW9ucyxcbiAgLy8gc2lnbmFsQXBwUmVhZHk6ICgpID0+IGlwY1JlbmRlcmVyLmludm9rZSgnYXBwLXJlYWR5JyksXG4gIC8vIGdldFdvcmtzcGFjZTogKCkgPT4gaXBjUmVuZGVyZXIuaW52b2tlKCdnZXQtd29ya3NwYWNlJyksXG4gIC8vIGxpc3RlblRvTWFpbjogKGV2ZW50LCBsaXN0ZW5lcikgPT4gaXBjUmVuZGVyZXIub24oZXZlbnQsIGxpc3RlbmVyKSxcbiAgLy8gd3JpdGVUb0N1cnJlbnRGaWxlOiAoY29udGVudDogc3RyaW5nKSA9PlxuICAvLyAgIGlwY1JlbmRlcmVyLmludm9rZSgnd3JpdGUtdG8tY3VycmVudC1maWxlJywgY29udGVudCksXG59XG5cbmlmIChwcm9jZXNzLmVudi5NT0RFICE9PSAndGVzdCcpIHtcbiAgLyoqXG4gICAqIFRoZSBcIk1haW4gV29ybGRcIiBpcyB0aGUgSmF2YVNjcmlwdCBjb250ZXh0IHRoYXQgeW91ciBtYWluIHJlbmRlcmVyIGNvZGUgcnVucyBpbi5cbiAgICogQnkgZGVmYXVsdCwgdGhlIHBhZ2UgeW91IGxvYWQgaW4geW91ciByZW5kZXJlciBleGVjdXRlcyBjb2RlIGluIHRoaXMgd29ybGQuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cuZWxlY3Ryb25qcy5vcmcvZG9jcy9hcGkvY29udGV4dC1icmlkZ2VcbiAgICovXG4gIGNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoYXBpS2V5LCBhcGkpXG59IGVsc2Uge1xuICAvKipcbiAgICogUmVjdXJzaXZlbHkgT2JqZWN0LmZyZWV6ZSgpIG9uIG9iamVjdHMgYW5kIGZ1bmN0aW9uc1xuICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zdWJzdGFjay9kZWVwLWZyZWV6ZVxuICAgKiBAcGFyYW0gb2JqIE9iamVjdCBvbiB3aGljaCB0byBsb2NrIHRoZSBhdHRyaWJ1dGVzXG4gICAqL1xuICBjb25zdCBkZWVwRnJlZXplID0gKG9iajogYW55KSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbCkge1xuICAgICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbCA9IG9ialtwcm9wXVxuICAgICAgICBpZiAoXG4gICAgICAgICAgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpICYmXG4gICAgICAgICAgIU9iamVjdC5pc0Zyb3plbih2YWwpXG4gICAgICAgICkge1xuICAgICAgICAgIGRlZXBGcmVlemUodmFsKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKG9iailcbiAgfVxuXG4gIGRlZXBGcmVlemUoYXBpKVxuXG4gIC8vIHdpbmRvd1thcGlLZXldID0gYXBpXG5cbiAgLy8gTmVlZCBmb3IgU3BlY3Ryb24gdGVzdHNcbiAgd2luZG93LmVsZWN0cm9uUmVxdWlyZSA9IHJlcXVpcmVcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/preload/index.ts\n");

/***/ }),

/***/ "./packages/preload sync recursive":
/*!********************************!*\
  !*** ./packages/preload/ sync ***!
  \********************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./packages/preload sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./packages/preload/index.ts");
/******/ 	
/******/ })()
;