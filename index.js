import { saveSettingsDebounced } from "../../../../script.js";
import { extension_settings } from "../../../extensions.js";





$(document).ready(function () {
	const addSettings = () => {
		const html = `
		<div class="lsh--settings">
			<div class="inline-drawer">
				<div class="inline-drawer-toggle inline-drawer-header">
					<b>Local Storage Helper</b>
					<div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
				</div>
				<div class="inline-drawer-content">
					<div class="flex-container">
						<button id="lsh--download" class="menu_button">Download localStorage</button>
					</div>
					<div class="flex-container">
						<button id="lsh--upload" class="menu_button">Upload localStorage</button>
						<input type="file" id="lsh--uploadFile">
					</div>
				</div>
			</div>
		</div>
		`;
		$('#extensions_settings').append(html);
		$('#lsh--download').on('click', ()=>{
			console.log('[LSH]', 'download');
			const blob = new Blob([JSON.stringify(localStorage)], {type:'text/json'});
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `SillyTavern-LocalStorage-${new Date().toISOString()}.json`;
			a.click();
		});
		$('#lsh--upload').on('click', ()=>{
			$('#lsh--uploadFile').click();
		});
		$('#lsh--uploadFile').on('change', async()=>{
			console.log('[LSH]', 'upload file');
			const ls = JSON.parse(await document.querySelector('#lsh--uploadFile').files[0].text());
			Object.keys(ls).forEach(key=>{
				localStorage.setItem(key, ls[key]);
			});
			location.reload();
		});
	};

	addSettings();
});