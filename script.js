const typeInput = document.getElementById("type");
const jiraInput = document.getElementById("jira");
const descInput = document.getElementById("description");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function updateBranchName() {
  const type = typeInput.value;
  const jira = jiraInput.value.trim().toLowerCase();
  const desc = slugify(descInput.value);

  if (!jira || !desc) {
    output.textContent = "";
    return;
  }

  output.textContent = `${type}/${jira}/${desc}`;
}

[typeInput, jiraInput, descInput].forEach(el =>
  el.addEventListener("input", updateBranchName)
);

copyBtn.addEventListener("click", () => {
  const text = output.textContent;
  if (!text) return;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(showCopied);
  } else {
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    showCopied();
  }
});

function showCopied() {
  copyBtn.textContent = "Copied ✅";
  setTimeout(() => {
    copyBtn.textContent = "Copy Branch Name";
  }, 1500);
}

const heart = document.getElementById("heart");

heart.addEventListener("click", () => {
  heart.classList.toggle("active");
});
