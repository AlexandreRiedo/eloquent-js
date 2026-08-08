const fileButton = document.getElementById("file-button");
const fileForm = document.getElementById("file-form");
const fileSelect = document.getElementById("file-select");
const fileTextarea = document.getElementById("file-textarea");

const FILEBUTTON_DEFAULT_TEXT = fileButton.textContent;
const FILEBUTTON_FAILURE_TEXT = "Error! Nothing sent";
const FILEBUTTON_SUCCESS_TEXT = "Sent Successfully";

fileSelect.addEventListener("change", async (event) => {
    try {
        const res = await fetch(fileSelect.value);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        fileTextarea.value = await res.text();
    } catch (e) {
        console.log("fileSelect changeEvent error: " + e);
    }
});

fileForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const res = await fetch(fileSelect.value, {
            method: "PUT",
            body: fileTextarea.value,
        });
        fileButton.textContent = FILEBUTTON_SUCCESS_TEXT;
        setTimeout(
            () => (fileButton.textContent = FILEBUTTON_DEFAULT_TEXT),
            2000,
        );
    } catch (e) {
        console.log("fileForm submitEvent error:" + e);
        fileButton.textContent = FILEBUTTON_FAILURE_TEXT;
        setTimeout(
            () => (fileButton.textContent = FILEBUTTON_DEFAULT_TEXT),
            2000,
        );
    }
});

async function listRecursiveDir() {
    const fileNames = [];

    async function listRecursiveDirSearch(dirPath = "/") {
        try {
            const res = await fetch(dirPath);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const listedFiles = (await res.text())
                .split("\n")
                .map((x) => (dirPath === "/" ? "" : dirPath + "/") + x);
            for (let fileName of listedFiles) {
                if (/(\..+$)|(LICENSE$)/.test(fileName))
                    fileNames.push(fileName);
                else fileNames.concat(await listRecursiveDirSearch(fileName));
            }
        } catch (e) {
            console.log("listRecursiveDirSearch error: " + e);
        }
    }
    await listRecursiveDirSearch();

    return fileNames.sort();
}

async function createSelectOptions() {
    const fileNames = await listRecursiveDir();

    for (let fileName of fileNames) {
        const option = document.createElement("option");
        option.value = fileName;
        option.text = fileName;
        fileSelect.appendChild(option);
    }
    fileSelect.dispatchEvent(new Event("change")); // post-creation, immediately pick one
}
createSelectOptions();
