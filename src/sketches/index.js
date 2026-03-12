export const sketchEntries = [
  {
    id: "displaynoise",
    title: "displaynoise",
    summary: "",
  },
  {
    id: "displaynoise2",
    title: "displaynoise2",
    summary: "",
  },
  {
    id: "displaynoise3",
    title: "displaynoise3",
    summary: "",
  },
  {
    id: "displaynoise4",
    title: "displaynoise4",
    summary: "",
  },
  {
    id: "displaynoise5",
    title: "displaynoise5",
    summary: "",
  },
  {
    id: "displaynoise6",
    title: "displaynoise6",
    summary: "",
  },
  {
    id: "displaynoise7",
    title: "displaynoise7",
    summary: "",
  },
  {
    id: "displaynoise8",
    title: "displaynoise8",
    summary: "",
  },
];

export function getSketchEntryById(id) {
  return sketchEntries.find((entry) => entry.id === id);
}

const sketchModules = import.meta.glob("./*/index.js");

async function defaultLoadSketch(entry) {
  const loadModule = sketchModules["./" + entry.id + "/index.js"];

  if (!loadModule) {
    throw new Error(`No sketch module found for "${entry.id}".`);
  }

  const module = await loadModule();
  return module.createSketch();
}

export function getSketchLoader(entry) {
  if (typeof entry.loadSketch === "function") {
    return () => entry.loadSketch(entry);
  }

  return () => defaultLoadSketch(entry);
}

