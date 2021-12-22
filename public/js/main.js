/* eslint-disable import/prefer-default-export */
import { loadAllLevels } from './loaders.js';

Promise.all([
	loadAllLevels('./levels/AllLevels.json'),
]).then(([allLevels]) => {
	const rowTemplate = document.getElementsByTagName('template')[0];
	const columnTemplate = document.getElementsByTagName('template')[1];

	for (let i = 0; i < allLevels.length; i += 3) {
		const rowClone = rowTemplate.content.cloneNode(true);
		for (let j = 0; j < 3; j++) {
			if (i + j < allLevels.length) {
				const columnClone = columnTemplate.content.cloneNode(true);
				columnClone.firstElementChild.innerHTML = columnClone.firstElementChild.innerHTML.replaceAll('{LVL_NAME}', allLevels[i + j].name);
				columnClone.firstElementChild.innerHTML = columnClone.firstElementChild.innerHTML.replaceAll('{IMG_URL}', allLevels[i + j].image);
				rowClone.appendChild(columnClone);
			}
		}
		document.body.appendChild(rowClone);
	}
});
